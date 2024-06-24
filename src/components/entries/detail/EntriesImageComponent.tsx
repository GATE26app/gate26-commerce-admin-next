import Image from 'next/image';
import React, { useState } from 'react';
import { Box, CircularProgress, Flex, Text } from '@chakra-ui/react';
import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorBlue,
} from '@/utils/_Palette';
import { imgPath } from '@/utils/format';

import { EntriesResType } from '@/app/apis/entries/EntriesApi.type';
import { usePostEntriesImageMutation } from '@/app/apis/entries/EntriesApi.mutation';

interface Props {
  EntriesData: EntriesResType;
  setEntriesData: React.Dispatch<React.SetStateAction<EntriesResType>>;
}
function EntriesImageComponent({ EntriesData, setEntriesData }: Props) {
  const { mutate: ItemCodeMutate, isLoading } = usePostEntriesImageMutation({
    options: {
      onSuccess: (resImg) => {
        if (resImg.success == true) {
          handleImageSave(
            resImg.data?.imagePath,
            resImg.data?.thumbnailImagePath,
          );
        } else {
          console.log('error 코드 생성 에러', resImg.code);
        }
      },
    },
  });

  const handleImageSave = (imagePath: string, thumbnailImagePath: string) => {
    const obj = {
      imagePath: imagePath,
      thumbnailImagePath: thumbnailImagePath,
    };
    setEntriesData({ ...EntriesData, images: [obj] });
  };

  const handleUploadImage = (e: any) => {
    //이미지 미리보기 기능
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      ItemCodeMutate(formData);
    };
  };

  const onDeleteImg = () => {
    setEntriesData({ ...EntriesData, images: [] });
  };

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
        // borderBottomRadius={'12px'}
        justifyContent={'space-between'}
      >
        <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
          이미지
        </Text>
      </Flex>
      <Flex
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderTopWidth={0}
        borderColor={ColorGray400}
        flexDirection={'column'}
        borderBottomRadius={'12px'}
      >
        <Flex flexDirection={'row'} pb="20px" flexWrap={'wrap'}>
          <Flex flexDirection={'column'} w={320}>
            <Flex>
              <Text fontWeight={700} color={ColorBlack} fontSize={'16px'}>
                이미지(썸네일)
              </Text>
            </Flex>
            <Text fontWeight={700} color={ColorGray700} fontSize={'16px'}>
              ({EntriesData.images.length > 0 ? '1' : '0'}
              /1)
            </Text>
          </Flex>
          <Flex flexDirection={'column'} position={'relative'}>
            {EntriesData.images.length > 0 && (
              <>
                <Flex
                  position={'absolute'}
                  top={'10px'}
                  right={'10px'}
                  onClick={() => onDeleteImg()}
                >
                  <Image
                    src={'/images/Page/icon_delete_img.png'}
                    alt="이미지 삭제"
                    width={32}
                    height={32}
                  />
                </Flex>
              </>
            )}
            {isLoading ? (
              <Flex
                w={'182px'}
                h={'182px'}
                borderWidth={1}
                borderStyle={'dashed'}
                borderColor={ColorInputBorder}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'10px'}
                overflow={'hidden'}
              >
                <CircularProgress isIndeterminate color={ColorBlue} />
              </Flex>
            ) : (
              <label htmlFor="img1">
                {EntriesData.images.length > 0 ? (
                  <>
                    <Flex
                      w={'182px'}
                      h={'182px'}
                      borderWidth={1}
                      borderStyle={'dashed'}
                      borderColor={ColorInputBorder}
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderRadius={'10px'}
                      overflow={'hidden'}
                    >
                      <img
                        src={`${imgPath()}${EntriesData.images[0].imagePath}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                        alt="이미지 업로드"
                      />
                    </Flex>
                  </>
                ) : (
                  <Flex
                    w={182}
                    h={182}
                    borderWidth={1}
                    borderStyle={'dashed'}
                    borderColor={ColorInputBorder}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={'10px'}
                  >
                    <Image
                      src={'/images/Page/ico_plus.png'}
                      width={28}
                      height={28}
                      alt="이미지 추가"
                    />
                  </Flex>
                )}
              </label>
            )}
            <input
              type="file"
              id="img1"
              onChange={handleUploadImage}
              style={{ display: 'none' }}
            ></input>

            <Box>
              <Text
                color={ColorGray700}
                fontSize={'14px'}
                fontWeight={400}
                pt={'10px'}
              >
                * 1300px*1300px 사이즈
              </Text>
              <Text color={ColorGray700} fontSize={'14px'} fontWeight={400}>
                * 이미지는 1장 등록 가능 합니다.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default EntriesImageComponent;
