import React, { useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Text, Textarea } from '@chakra-ui/react';

import { OrderDetailItemType } from '@/app/apis/order/OrderApi.type';

import {
  COlorBlueSucces,
  ColorBlack,
  ColorBlue,
  ColorDataTableBorderTop,
} from '@/utils/_Palette';
import { formatDated } from '@/utils/format';
import CancelInfoCard from './CancelInfoCard';

interface Props {
  info: OrderDetailItemType;
}
function OrderInfo({ info }: Props) {
  const ItemInfo = {
    orderId: info.orderId,
    orderThumbnailImagePath: info.orderThumbnailImagePath,
    orderCategoryTitle: info.orderCategoryTitle,
    orderCnt: info.orderCnt,
    orderOptionTitle: info.orderOptionTitle,
    discountAmount: info.discountAmount,
    orderAmount: info.orderAmount,
    orderTitle: info.orderTitle,
    orderDateTimeOfUse: info.orderDateTimeOfUse,
    orderStatus: info.orderStatus,
    address: info.address,
    addressDetail: info.addressDetail,
    postcode: info.postcode,
    recieverName: info.recieverName,
    recieverHp: info.recieverHp,
    orderConfirmName: info.orderConfirmName,
    orderStatusName: info.orderStatusName,
  };

  return (
    <Box mt={'60px'}>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
        주문정보
      </Text>
      <Flex
        flexDirection={'column'}
        w={'100%'}
        borderTopColor={ColorDataTableBorderTop}
        borderTopWidth={1}
        mt={'15px'}
      >
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            주문번호
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.orderId}
          </Text>
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            주문일자
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {formatDated(dayjs(info.orderDate)) == 'Invalid Date'
              ? '-'
              : formatDated(dayjs(info.orderDate))}
          </Text>
        </Flex>
        {/* <Flex mt={'15px'} flexDirection={'column'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            주문상품
          </Text>
          <CancelInfoCard info={ItemInfo} />
        </Flex> */}
      </Flex>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'} mt={'40px'}>
        주문상품
      </Text>
      <Flex
        borderTopColor={ColorDataTableBorderTop}
        borderTopWidth={1}
        mt={'15px'}
      >
        <CancelInfoCard info={ItemInfo} />
      </Flex>
    </Box>
  );
}

export default OrderInfo;
