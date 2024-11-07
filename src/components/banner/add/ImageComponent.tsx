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
import { getImagePath, imgPath } from '@/utils/format';

import { BannerResType } from '@/app/apis/banner/BannerApi.type';
import { usePostBannersImageMutation } from '@/app/apis/banner/BannerApi.mutation';

interface Props {
  BannerInfo: BannerResType;
  setBannerInfo: React.Dispatch<React.SetStateAction<BannerResType>>;
}
function ImageComponent({ BannerInfo, setBannerInfo }: Props) {
  const { mutate: ItemCodeMutate, isLoading } = usePostBannersImageMutation({
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
    setBannerInfo({ ...BannerInfo, images: [obj] });
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
    setBannerInfo({ ...BannerInfo, images: [] });
  };

  console.log('BannerInfo.images', BannerInfo.images);
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
          배너이미지
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
              ({BannerInfo.images.length > 0 ? '1' : '0'}
              /1)
            </Text>
          </Flex>
          <Flex flexDirection={'column'} position={'relative'}>
            {BannerInfo.images.length > 0 && (
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
                w={'427px'}
                h={'135px'}
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
                {BannerInfo.images.length > 0 ? (
                  <>
                    <Flex
                      w={'427px'}
                      h={'135px'}
                      borderWidth={1}
                      borderStyle={'dashed'}
                      borderColor={ColorInputBorder}
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderRadius={'10px'}
                      overflow={'hidden'}
                    >
                      <img
                        src={getImagePath(BannerInfo.images[0].imagePath)}
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
                    w={427}
                    h={135}
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
                * 1140px*360px사이즈
              </Text>
              <Text color={ColorGray700} fontSize={'14px'} fontWeight={400}>
                * 비율이 맞지 않는 이미지를 올리시면 이미지가 일부 잘릴 수
                있습니다.
              </Text>
              <Text color={ColorGray700} fontSize={'14px'} fontWeight={400}>
                * 이미지는 5MB이하 / gif, png, jpg(jpeg)로만 등록 가능합니다.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ImageComponent;
