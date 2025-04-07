import dynamic from 'next/dynamic';
import React, { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { Box, Flex, Image, Text, Textarea } from '@chakra-ui/react';
import he from 'he';
import DOMPurify from 'isomorphic-dompurify';

import { ColorBlack, ColorGray50, ColorGray400 } from '@/utils/_Palette';
import { EntriesResType } from '@/app/apis/entries/EntriesApi.type';
import { usePostEntriesImageMutation } from '@/app/apis/entries/EntriesApi.mutation';
import { getImagePath, imgPath } from '@/utils/format';
interface Props {
  EntriesData: EntriesResType;
  setEntriesData: React.Dispatch<React.SetStateAction<EntriesResType>>;
}
// const ReactQuill = dynamic(
//   async () => {
//     const { default: RQ } = await import('react-quill');
//     return function comp({ forwardedRef, ...props }) {
//       return <RQ ref={forwardedRef} {...props} />;
//     };
//   },
//   { ssr: false },
// );
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    return ({
      forwardedRef,
      ...props
    }: {
      forwardedRef: any;
      [key: string]: any;
    }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  },
);

function EditorDetailComponent({ EntriesData, setEntriesData }: Props) {
  const [open, setOpen] = useState(true);
  // const quillRef = React.useRef(false);
  const quillRef = useRef<any>(null);
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    document.body.appendChild(input);
    input.click();

    input.addEventListener('change', async () => {
      try {
        var file: any = input && input.files ? input.files[0] : null;
        var formData = new FormData();
        formData.append('image', file);
        ItemCodeMutate(formData);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image'],
        ],
        handlers: { image: imageHandler },
      },

      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
  ];

  const { mutate: ItemCodeMutate, isLoading } = usePostEntriesImageMutation({
    options: {
      onSuccess: (resImg) => {
        if (resImg.success == true) {
          const imgUrl = resImg.data.imagePath;
          if (quillRef.current !== null) {
            const range = quillRef.current.getEditorSelection();
            quillRef.current
              .getEditor()
              .insertEmbed(range.index, 'image', getImagePath(imgUrl));
            quillRef.current.getEditor().setSelection(range.index + 1);
          }
        } else {
          console.log('error 코드 생성 에러', resImg.code);
        }
      },
    },
  });

  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
        alignItems={'center'}
        borderBottomRadius={open ? 0 : '12px'}
        justifyContent={'space-between'}
      >
        <Flex>
          <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
            상세설명
          </Text>
        </Flex>
        <Flex>
          {open ? (
            <Image
              src={'/images/Page/icon_regist_up.png'}
              width={'40px'}
              height={'40px'}
              alt="카테고리 삭제"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <Image
              src={'/images/Page/icon_regist_down.png'}
              width={'40px'}
              height={'40px'}
              alt="카테고리 삭제"
              onClick={() => setOpen(!open)}
            />
          )}
        </Flex>
      </Flex>
      {open && (
        <Flex
          px={'30px'}
          py={'20px'}
          w={'100%'}
          borderWidth={1}
          borderTopWidth={0}
          borderColor={ColorGray400}
          flexDirection={'column'}
          borderBottomRadius={'12px'}
          h={'570px'}
        >
          <Flex flexDirection={'column'}>
            <ReactQuill
              forwardedRef={quillRef}
              theme="snow"
              modules={modules}
              formats={formats}
              // value={EntriesData.content}
              value={DOMPurify.sanitize(he.decode(EntriesData.content))} // 디코딩 → XSS 제거 → 표시
              onChange={(e: any) =>
                setEntriesData({ ...EntriesData, content: e })
              }
              style={{ height: '480px' }}
            />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default EditorDetailComponent;
