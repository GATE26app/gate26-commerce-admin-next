import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { usePostImageMutation } from '@/app/apis/goods/GoodsApi.mutation';
import { GoodsListItemImageProps } from '@/app/apis/goods/GoodsApi.type';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { imgPath } from '@/utils/format';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';

interface Props {
  list: Array<GoodsListItemImageProps>;
  setList: React.Dispatch<React.SetStateAction<GoodsListItemImageProps[]>>;
}
interface ImagetPathProps {
  id: number;
  imagePath: string;
}

function ImageComponent({ list, setList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [open, setOpen] = useState(true);
  // const [firstImagePath, setFirstImagePath] = useState<string>('');
  // const [imageListPath, setImageListPath] = useState<ImagetPathProps[]>([]);
  // const [imagePath, setImagePath] = useState<string[]>([]);
  // const [imageList, setImageList] = useState<string>('');
  // const testimg: string = '';
  // console.log('imagelist', list);

  const [imagePath, setImagePath] = useState<string>('');
  const [imageIndex, setImageIndex] = useState<number>(0);

  const { mutate: ItemCodeMutate, isLoading } = usePostImageMutation({
    options: {
      onSuccess: (resImg) => {
        if (resImg.success == true) {
          handleImageSave(
            resImg.data?.imagePath,
            resImg.data?.thumbnailImagePath,
          );

          // if (list.length == 0 && imageIndex == 0) {
          //   setList([
          //     {
          //       sort: 1,
          //       imagePath: res.data?.imagePath,
          //       thumbnailImagePath: res.data.thumbnailImagePath,
          //     },
          //   ]);
          // } else if (imageIndex !== 0) {
          //   setList([
          //     ...list,
          //     {
          //       sort: list.length + 1,
          //       imagePath: res.data?.imagePath,
          //       thumbnailImagePath: res.data.thumbnailImagePath,
          //     },
          //   ]);
          // }
        } else {
          console.log('error 코드 생성 에러', resImg.code);
        }
      },
    },
  });
  
  const handleImageSave = (imagePath: string, thumbnailImagePath: string) => {
    const obj = {
      sort: imageIndex,
      imagePath: imagePath,
      thumbnailImagePath: thumbnailImagePath,
    };
    setList([...list, obj]);
    setImagePath('');
  };

  const handleUploadImage = (e: any) => {
    //이미지 미리보기 기능
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImagePath(reader.result as string);

      // if (imageIndex == 0)
      // else setImagePath(reader.result as string);
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      ItemCodeMutate(formData);
    };
  };
  // const handleUploadImageList = (e: any) => {
  //   console.log('상품이미지');
  //   //이미지 미리보기 기능
  //   const readerlist = new FileReader();
  //   readerlist.readAsDataURL(e.target.files[0]);
  //   readerlist.onload = () => {
  //     setImagePath((prev) => [...prev, readerlist.result as string]);

  //     const formData = new FormData();
  //     formData.append('image', e.target.files[0]);
  //     ItemCodeMutate(formData);
  //   };
  // };
  // console.log('!!!!imagePath', imagePath);

  const onDeleteImg = (index: number) => {
    const deleteImage = list.filter((item) => item.sort !== index);
    setList(deleteImage);
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
        borderBottomRadius={open ? 0 : '12px'}
        justifyContent={'space-between'}
      >
        <Flex>
          <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
            상품이미지
          </Text>
          <Text
            color={ColorRed}
            fontWeight={800}
            ml={'3px'}
            lineHeight={'12px'}
          >
            *
          </Text>
        </Flex>
        <Flex>
          {open ? (
            <Image
              src={'/images/Page/icon_regist_up.png'}
              width={40}
              height={40}
              alt="카테고리 삭제"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <Image
              src={'/images/Page/icon_regist_down.png'}
              width={40}
              height={40}
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
        >
          <Flex
            flexDirection={'row'}
            borderBottomWidth={1}
            borderBottomColor={ColorGrayBorder}
            pb="20px"
            flexWrap={'wrap'}
          >
            <Flex flexDirection={'column'} w={320}>
              <Flex>
                <Text fontWeight={700} color={ColorBlack} fontSize={'16px'}>
                  대표상품이미지(썸네일)
                </Text>
                <Text
                  color={ColorRed}
                  fontWeight={700}
                  ml={'3px'}
                  lineHeight={'14px'}
                >
                  *
                </Text>
              </Flex>
              <Text fontWeight={700} color={ColorGray700} fontSize={'16px'}>
                ({list.filter((item) => item.sort == 1).length > 0 ? '1' : '0'}
                /1)
              </Text>
            </Flex>
            <Flex flexDirection={'column'} position={'relative'}>
              {list.filter((item) => item.sort == 1).length > 0 && (
                <>
                  {!goodsInfo.LogItemDisable && (
                    <Flex
                      position={'absolute'}
                      top={'10px'}
                      right={'10px'}
                      onClick={() => onDeleteImg(1)}
                    >
                      <Image
                        src={'/images/Page/icon_delete_img.png'}
                        alt="이미지 삭제"
                        width={32}
                        height={32}
                      />
                    </Flex>
                  )}
                </>
              )}
              <label htmlFor="img1" accept=".png, .jpeg, .jpg">
                {list.filter((item) => item.sort == 1).length > 0 ? (
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
                        src={`${imgPath()}${
                          list.filter((item) => item.sort == 1)[0].imagePath
                        }`}
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
                    onClick={() => setImageIndex(1)}
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
              <input
                type="file"
                id="img1"
                onChange={handleUploadImage}
                style={{ display: 'none' }}
                disabled={goodsInfo.LogItemDisable}
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
          <Flex
            flexDirection={'row'}
            borderBottomWidth={1}
            borderBottomColor={ColorGrayBorder}
            py={'20px'}
            // flexWrap={'wrap'}
          >
            <Flex flexDirection={'column'} minWidth={320}>
              <Flex>
                <Text fontWeight={700} color={ColorBlack} fontSize={'16px'}>
                  상품이미지
                </Text>
                <Text
                  color={ColorRed}
                  fontWeight={700}
                  ml={'3px'}
                  lineHeight={'14px'}
                >
                  *
                </Text>
              </Flex>
              <Text fontWeight={700} color={ColorGray700} fontSize={'16px'}>
                ({list.filter((item) => item.sort !== 1).length}/10)
              </Text>
            </Flex>
            <Flex flexDirection={'column'} flexWrap={'wrap'}>
              <Flex
                flexDirection={'row'}
                flexWrap={'wrap'}
                position={'relative'}
                gap={'10px'}
              >
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 2).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(2)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum2" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 2).length > 0 ? (
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
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 2)[0].imagePath
                            }`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(2)}
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
                  <input
                    type="file"
                    id="imageNum2"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 3).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(3)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum3" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 3).length > 0 ? (
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
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 3)[0].imagePath
                            }`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(3)}
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
                  <input
                    type="file"
                    id="imageNum3"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 4).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(4)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum4" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 4).length > 0 ? (
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
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 4)[0].imagePath
                            }`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(4)}
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
                  <input
                    type="file"
                    id="imageNum4"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 5).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(5)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum5" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 5).length > 0 ? (
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
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 5)[0].imagePath
                            }`}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(5)}
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
                  <input
                    type="file"
                    id="imageNum5"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 6).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(6)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum6" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 6).length > 0 ? (
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
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 6)[0].imagePath
                            }`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(6)}
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
                  <input
                    type="file"
                    id="imageNum6"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 7).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(7)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum7" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 7).length > 0 ? (
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
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 7)[0].imagePath
                            }`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(7)}
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
                  <input
                    type="file"
                    id="imageNum7"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 8).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(8)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum8" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 8).length > 0 ? (
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
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 8)[0].imagePath
                            }`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(8)}
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
                  <input
                    type="file"
                    id="imageNum8"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 9).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(9)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum9" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 9).length > 0 ? (
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
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 9)[0].imagePath
                            }`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(9)}
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
                  <input
                    type="file"
                    id="imageNum9"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 10).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(10)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum10" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 10).length > 0 ? (
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
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 10)[0]
                                .imagePath
                            }`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(10)}
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
                  <input
                    type="file"
                    id="imageNum10"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                <Flex position={'relative'}>
                  {list.filter((item) => item.sort == 11).length > 0 && (
                    <>
                      {!goodsInfo.LogItemDisable && (
                        <Flex
                          position={'absolute'}
                          top={'10px'}
                          right={'10px'}
                          onClick={() => onDeleteImg(11)}
                        >
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            alt="이미지 삭제"
                            width={32}
                            height={32}
                          />
                        </Flex>
                      )}
                    </>
                  )}
                  <label htmlFor="imageNum11" accept=".png, .jpeg, .jpg">
                    {list.filter((item) => item.sort == 11).length > 0 ? (
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
                            src={`${imgPath()}${
                              list.filter((item) => item.sort == 11)[0]
                                .imagePath
                            }`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
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
                        onClick={() => setImageIndex(11)}
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
                  <input
                    type="file"
                    id="imageNum11"
                    onChange={handleUploadImage}
                    style={{ display: 'none' }}
                    disabled={goodsInfo.LogItemDisable}
                  ></input>
                </Flex>
                {/* <label htmlFor="img2" accept=".png, .jpeg, .jpg">
                  {imageListPath && (
                    <Flex
                      w={182}
                      h={182}
                      borderWidth={1}
                      borderStyle={'dashed'}
                      borderColor={ColorInputBorder}
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderRadius={'10px'}
                      onClick={() => setImageIndex(1)}
                    >
                      <Image
                        src={'/images/Page/ico_plus.png'}
                        width={'28px'}
                        height={'28px'}
                        alt="이미지 추가"
                      />
                    </Flex>
                  )}
                </label>
                <input
                  type="file"
                  id="img2"
                  onChange={handleUploadImageList}
                  style={{ display: 'none' }}
                ></input>
                {imageListPath.map((item: ImagetPathProps, index: number) => {
                  return (
                    <Flex position={'relative'} key={index}>
                      <Flex
                        position={'absolute'}
                        top={'10px'}
                        right={'10px'}
                        onClick={() => onDeleteImg(0)}
                      >
                        <Image
                          src={'/images/Page/icon_delete_img.png'}
                          alt="이미지 삭제"
                          width={'32px'}
                          height={'32px'}
                        />
                      </Flex>
                      <>
                        <Flex
                          w={'182px'}
                          h={'182px'}
                          justifyContent={'center'}
                          alignItems={'center'}
                          borderRadius={'10px'}
                          overflow={'hidden'}
                          borderWidth={1}
                          borderStyle={'dashed'}
                          borderColor={ColorInputBorder}
                        >
                          <img
                            src={item.imagePath}
                            // src={imagePath[]}
                            // src={`${imgPath()}${
                            //   data[imageIndex].images[0].thumbnailImagePath
                            // }`}
                            alt="이미지 업로드"
                          />
                        </Flex>
                      </>
                    </Flex>
                  );
                })} */}
                {/* <Flex
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
                    alt="이미지 삭제"
                  />
                </Flex>
                {imageListPath.map((item: ImagetPathProps, index: number) => {
                  return (
                    <Flex
                      key={index}
                      w={'182px'}
                      h={'182px'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderRadius={'10px'}
                      overflow={'hidden'}
                      position={'relative'}
                    >
                      <Box>
                        <Image
                          src={item.imagePath}
                          width={182}
                          height={182}
                          alt="이미지"
                          objectFit={'cover'}
                          // fill
                        />
                      </Box>
                      <Box position={'absolute'} top={'10px'} right={'10px'}>
                        <Image
                          src={'/images/Page/icon_delete_img.png'}
                          alt="이미지 삭제"
                          // onClick={() => setOpen(!open)}
                          width={32}
                          height={32}
                        />
                      </Box>
                    </Flex>
                  );
                })} */}
              </Flex>
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
                  * 이미지는 최소 1장 이상 최대 10장 등록 가능합니다.
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
      )}
    </Flex>
  );
}

export default ImageComponent;
