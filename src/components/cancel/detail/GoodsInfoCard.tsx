import Image from 'next/image';
import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import { Box, Flex, Text } from '@chakra-ui/react';

import { ColorBlack, ColorGray700 } from '@/utils/_Palette';
import { formatDated, formatPhone, imgPath, intComma } from '@/utils/format';
import { OrderDetailItemType } from '@/app/apis/order/OrderApi.type';

interface headerProps {
  id: string;
  name: string;
  width: string;
}
interface Props {
  header: Array<headerProps>;
  item: OrderDetailItemType;
}

function GoodsInfoCard({ header, item }: Props) {
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };
  console.log('item,', item);
  return (
    <Flex
      w={'100%'}
      flexDirection={'row'}
      justifyContent={'center'}
      pt={'20px'}
      // mb={'20px'}
    >
      <Flex
        w={header[0]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.partner?.title}
        </Text>
      </Flex>
      <Flex
        w={header[1]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.orderId}
        </Text>
      </Flex>
      <Flex w={header[2]?.width} gap={'10px'}>
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
            width={80}
            height={80}
            src={
              item?.orderThumbnailImagePath !== null &&
              item?.orderThumbnailImagePath !== undefined
                ? `${imgPath()}${item?.orderThumbnailImagePath}`
                : '/images/no_img.png'
            }
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
              item.orderThumbnailImagePath !== null
                ? `${imgPath()}${item.orderThumbnailImagePath}`
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
              {item.orderCategoryTitle}
            </Text>
            <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
              {item.orderTitle}
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
              {item?.orderOptionTitle} * {item?.orderCnt}
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
              {intComma(item?.orderAmount)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* 결제정보 */}
      <Flex
        w={header[3]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {intComma(item.orderAmount)}원
        </Text>
      </Flex>
      {/* 예약자정보 */}
      <Flex
        w={header[4]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {formatDated(dayjs(item.orderDateTimeOfUse)) == 'Invalid Date'
            ? '-'
            : formatDated(dayjs(item.orderDateTimeOfUse))}
        </Text>
      </Flex>
      <Flex
        w={header[5]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'10px'}
      >
        {item.orderStatusName}
      </Flex>
      <Flex
        w={header[6]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={ColorBlack}
          textAlign={'center'}
        >
          {item.address == null ? '-' : item.address}
        </Text>
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={ColorBlack}
          textAlign={'center'}
        >
          {item.recieverName == null ? '-' : item.recieverName}
        </Text>
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={ColorBlack}
          textAlign={'center'}
        >
          {item.recieverHp == null ? '-' : formatPhone(item.recieverHp)}
        </Text>
      </Flex>
    </Flex>
  );
}

export default GoodsInfoCard;
