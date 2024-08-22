import Image from 'next/image';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray100,
  ColorGray700,
} from '@/utils/_Palette';
import { imgPath, intComma } from '@/utils/format';
import { SyntheticEvent } from "react";

interface Props {
  info: {
    orderId: string;
    orderThumbnailImagePath: string;
    orderCategoryTitle: string;
    orderCnt: number;
    orderOptionTitle: string;
    discountAmount: number;
    orderAmount: number;
    orderTitle: string;
  };
}
function ModalOrderInfo({ info }: Props) {
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };
  return (
    <>
      <Box>
        <Flex
          bgColor={ColorGray100}
          borderRadius={'10px'}
          p={'15px'}
          mb={'20px'}
        >
          <Text
            color={ColorBlack}
            fontWeight={600}
            fontSize={'14px'}
            pr={'30px'}
          >
            주문정보
          </Text>
          <Text fontWeight={400} fontSize={'14px'} color={ColorBlack}>
            {info?.orderId}
          </Text>
        </Flex>
      </Box>
      <Flex gap={'10px'}>
        <Box
          w={'80px'}
          minWidth={'80px'}
          h={'80px'}
          borderRadius={'10px'}
          position={'relative'}
          overflow={'hidden'}
          ml={'10px'}
        >
          {/* <Image
            height={80}
            width={80}
            src={
              info?.orderThumbnailImagePath !== null &&
              info?.orderThumbnailImagePath !== undefined
                ? `${imgPath()}${info?.orderThumbnailImagePath}`
                : '/images/no_img.png'
            }
            // src={'/images/Page/ex_image_1.jpg'}
            alt="상품이미지"
            objectFit={'cover'}
            // fill
          /> */}
          <img
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
            }}
            src={
              info?.orderThumbnailImagePath !== null &&
              info?.orderThumbnailImagePath !== undefined
                ? `${imgPath()}${info?.orderThumbnailImagePath}`
                : '/images/no_img.png'
            }
            onError={addDefaultImg}
            alt="이미지 업로드"
          />
        </Box>
        {/* 상품정보 */}
        <Flex flexDirection={'column'}>
          <Flex mb={'5px'} gap={'10px'} flexDirection={'row'} flexShrink={0}>
            <Text
              color={ColorBlack}
              fontSize={'14px'}
              fontWeight={600}
              flexShrink={0}
            >
              {info?.orderCategoryTitle}
            </Text>
            <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
              {info?.orderTitle}
            </Text>
          </Flex>
          <Flex gap={'10px'} flexShrink={0}>
            <Text
              flexShrink={0}
              color={ColorGray700}
              fontWeight={600}
              fontSize={'14px'}
              w={'50px'}
            >
              선택옵션
            </Text>
            <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
              {info?.orderOptionTitle} * {info?.orderCnt}
            </Text>
          </Flex>
          <Flex gap={'10px'}>
            <Text
              color={ColorGray700}
              fontWeight={600}
              fontSize={'14px'}
              w={'49px'}
            >
              주문금액
            </Text>
            <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
              {intComma(info?.orderAmount)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* <Flex
        gap={'10px'}
        flexDirection={'row'}
        pb={'27px'}
        borderBottomColor={ColoLineGray}
        borderBottomWidth={1}
      >
        <Box
          minWidth={'80px'}
          borderRadius={'10px'}
          position={'relative'}
          w={'80px'}
          h={'80px'}
          overflow={'hidden'}
        >
          <Image
            width={80}
            height={80}
            src={'/images/Page/ex_image_1.jpg'}
            alt="상품이미지"
            objectFit={'cover'}
          />
        </Box>
        <Flex flexDirection={'column'}>
          <Flex flexDirection={'row'} gap={'5px'} mb={'5px'}>
            <Text fontSize={'14px'} color={ColorBlack} fontWeight={600}>
              액티비티
            </Text>
            <Text fontSize={'14px'} color={ColorBlack} fontWeight={400}>
              오사카이지카드(오사카공항수령)
            </Text>
          </Flex>
          <Text
            fontSize={'12px'}
            color={ColorGray700}
            fontWeight={400}
            textDecoration={'line-through'}
          >
            {intComma(399000)}원
          </Text>
          <Flex flexDirection={'row'}>
            <Text fontSize={'14px'} fontWeight={600} color={ColorRed}>
              10%
            </Text>
            <Text fontSize={'14px'} fontWeight={700} color={ColorBlack}>
              {intComma(299000)}원
            </Text>
          </Flex>
          <Flex gap={'10px'} flexShrink={0}>
            <Text
              flexShrink={0}
              color={ColorGray700}
              fontWeight={600}
              fontSize={'14px'}
              // w={'50px'}
            >
              선택옵션
            </Text>
            <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
              옵션명* 1, 옵션명(+옵션금액) *3
            </Text>
          </Flex>
        </Flex>
      </Flex> */}
    </>
  );
}

export default ModalOrderInfo;
