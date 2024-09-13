import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderListItemType } from '@/app/apis/order/OrderApi.type';

import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorclickBlue,
} from '@/utils/_Palette';
import {
  PaymentMethod,
  formatDated,
  formatPhone,
  imgPath,
  intComma,
  getImagePath,
} from '@/utils/format';

interface headerProps {
  id: string;
  name: string;
  width: string;
}
interface Props {
  header: Array<headerProps>;
  item: OrderListItemType;
  CheckList: string[];
  setChekcList: React.Dispatch<React.SetStateAction<string[]>>;
}
function OrderCard({ header, item, CheckList, setChekcList }: Props) {
  const router = useRouter();
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };
  const onCheckClick = (item: string) => {
    setChekcList((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((i) => i !== item);
      } else {
        return [...prevItems, item];
      }
    });
  };
  return (
    <Flex
      minW={'1550px'}
      flexDirection={'row'}
      justifyContent={'center'}
      py={'20px'}
      borderBottomColor={ColorGrayBorder}
      borderBottomWidth={1}
    >
      <Flex
        w={header[0]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {formatDated(dayjs(item.orderDate)) == 'Invalid Date'
            ? '-'
            : formatDated(dayjs(item.orderDate))}
        </Text>
        <Text fontSize={'14px'} fontWeight={400} color={ColorGray700}>
          ({item.merchantUid})
        </Text>
      </Flex>
      <Flex
        w={header[1]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
        cursor={'pointer'}
        onClick={() => router.push(`/orderDetail?orderId=${item.orderId}`)}
      >
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={ColorclickBlue}
          textDecoration={'underline'}
        >
          {item.orderId}
        </Text>
      </Flex>
      <Flex
        w={header[2]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.partner?.title ? item.partner?.title : '-'}
        </Text>
      </Flex>
      <Flex w={header[3]?.width} gap={'10px'}>
        <Box
          w={'80px'}
          minWidth={'80px'}
          h={'80px'}
          borderRadius={'10px'}
          position={'relative'}
          overflow={'hidden'}
          ml={'10px'}
        >
          <img
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
            }}
            src={
              item.orderThumbnailImagePath !== null
                ? `${getImagePath(item.orderThumbnailImagePath)}`
                : '/images/no_img.png'
            }
            onError={addDefaultImg}
            alt="이미지 업로드"
          />
          {/* <Image
            width={80}
            height={80}
            src={
              item.orderThumbnailImagePath !== null ||
              item.orderThumbnailImagePath !== ''
                ? `${imgPath()}${item.orderThumbnailImagePath}`
                : '/images/no_img.png'
            }
            // src={'/images/Page/ex_image_1.jpg'}
            alt="상품이미지"
            objectFit={'cover'}
            onError={addDefaultImg}
            // fill
          /> */}
        </Box>
        {/* 상품정보 */}
        <Flex flexDirection={'column'}>
          <Flex mb={'5px'} flexDirection={'row'} flexShrink={0}>
            <Text
              color={ColorBlack}
              fontSize={'14px'}
              fontWeight={600}
              flexShrink={0}
              mr={'10px'}
            >
              {item.orderCategoryTitle}
            </Text>
            <Text
              color={ColorBlack}
              fontSize={'14px'}
              fontWeight={400}
              overflow="hidden"
              textOverflow={'ellipsis'}
              display="-webkit-box"
              style={{
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              }}
            >
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
              {item.orderOptionTitle} * {item.orderCnt}
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
              {intComma(item.orderAmount)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* 결제정보 */}
      <Flex
        w={header[4]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {/* {item.paymentMethod == 'card' ? '카드결제' : '결제'} */}
          {PaymentMethod(item.paymentMethod)}
        </Text>
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {intComma(item.paymentAmount)}
        </Text>
      </Flex>
      {/* 예약자정보 */}
      <Flex
        w={header[5]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.orderEmail == null
              ? item.buyerEmail === null
                ? '-'
                : item.buyerEmail
              : item.orderEmail}
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.orderName == null
              ? item.buyerName === null
                ? '-'
                : item.buyerName
              : item.orderName}
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.orderHp == null
              ? item.buyerHp === null
                ? '-'
                : item.buyerHp
              : formatPhone(item.orderHp)}
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={header[6]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'10px'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {formatDated(dayjs(item.orderDateTimeOfUse)) == 'Invalid Date'
            ? formatDated(dayjs(item.orderDate)) == 'Invalid Date'
              ? '-'
              : formatDated(dayjs(item.orderDate))
            : formatDated(dayjs(item.orderDateTimeOfUse))}
        </Text>
      </Flex>
      <Flex
        w={header[7]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.orderStatusName}
        </Text>
        {item.cancelStatusName !== null && item.cancelStatusName !== '' && (
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {`(${item.cancelStatusName})`}
          </Text>
        )}
      </Flex>
      <Flex
        w={header[8]?.width}
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

export default OrderCard;
