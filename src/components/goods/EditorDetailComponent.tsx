import dynamic from 'next/dynamic';
import React, { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { Box, Flex, Image, Text, Textarea } from '@chakra-ui/react';

import { usePostImageMutation } from '@/app/apis/goods/GoodsApi.mutation';
import { GoodsBasicProps } from '@/app/apis/goods/GoodsApi.type';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { imgPath } from '@/utils/format';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
}
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({
      forwardedRef,
      ...props
    }: {
      forwardedRef: any;
      [key: string]: any;
    }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false },
);

function EditorDetailComponent({ list, setList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [open, setOpen] = useState(true);
  const [data, setData] = useState('');
  const [term, setTerm] = useState<string>(''); //이용약관
  const quillTermRef = useRef(null);
  // const quillRef = React.useRef(false);
  const quillRef = useRef<any>(null);
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      try {
        var file: any = input && input.files ? input.files[0] : null;
        var formData = new FormData();
        formData.append('image', file);
        ItemCodeMutate(formData);
        // formData.append('debug_jwt', debugKey);
        // formData.append('image', file);
        // formData.append('timestamp', stamp);
        // formData.append('mt_idx', userInfo?.mt_idx);
        // const res = await axios.post('/v1/post_image_upload.php', formData, config);

        // if (res.data.result == 'true') {
        //     // set_image(res.data.data.url);
        //     const imgUrl = res.data.data.link;
        //     const range = quillRef.current.getEditorSelection();
        //     quillRef.current.getEditor().insertEmbed(range.index, 'image', imgUrl);
        //     quillRef.current.getEditor().setSelection(range.index + 1);
        // } else {
        //     // setError(res.data.msg);
        // }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const { mutate: ItemCodeMutate, isLoading } = usePostImageMutation({
    options: {
      onSuccess: (resImg) => {
        if (resImg.success == true) {
          const imgUrl = resImg.data.imagePath;
          const range = quillRef.current.getEditorSelection();
          quillRef.current
            .getEditor()
            .insertEmbed(range.index, 'image', `${imgPath()}${imgUrl}`);
          quillRef.current.getEditor().setSelection(range.index + 1);
        } else {
          console.log('error 코드 생성 에러', resImg.code);
        }
      },
    },
  });

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
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
              value={list?.detailInfo}
              onChange={(e: any) =>
                goodsInfo.LogItemDisable
                  ? undefined
                  : setList({ ...list, detailInfo: e })
              }
              readOnly={goodsInfo.LogItemDisable}
              style={{ height: '480px' }}

              // onBlur={(e) => console.log('onblur', e)}
              // register={..}
            />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default EditorDetailComponent;
