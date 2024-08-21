'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import orderApi from '@/app/apis/order/OrderApi';

import CustomButton from '@/components/common/CustomButton';

import {
  ColorBlack,
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorWhite,
} from '@/utils/_Palette';
// import OrderInfo from '@/components/Cancel/Detail/OrderInfo';
import OrderGoods from '@/components/order/detail/OrderGoods';
import OrderBuyerInfo from '@/components/order/detail/OrderBuyerInfo';
import OrderResevationInfo from '@/components/order/detail/OrderResevationInfo';
import OrderDelivery from '@/components/order/detail/OrderDelivery';
import OrderPayment from '@/components/order/detail/OrderPayment';
import OrderInfo from './OrderInfo';
import PartnerInfo from './PartnerInfo';
import OrderWithGoods from './OrderWithGoods';
import OrderAmount from './OrderAmount';

function OrderDetailComponentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getOrderId = searchParams.get('orderId');

  const {
    data: OrderData,
    isLoading,
    error,
  } = useQuery(
    ['orderItem', String(getOrderId)],
    () => orderApi.getOrderItem(String(getOrderId)),
    {
      staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!getOrderId,
    },
  );

  // useEffect(() => {
  //   if (router.query.orderId) {
  //     detail(String(router.query.orderId));
  //   }
  // }, [router.query.orderId]);
  // const { mutate: detail, isLoading: detailLoading } =
  //   useGetOrderDetailMutation({
  //     options: {
  //       onSuccess: (res) => {
  //         // setDetailData(res);
  //         if (res.data !== undefined) {
  //           setInfoData(res.data);
  //         }

  //         // setGetEntriesData(detailData.data);
  //         // setEntriesData({
  //         //   type: res.data.type,
  //         //   level: res.data.level,
  //         //   title: res.data.title,
  //         //   content: res.data.content,
  //         //   winnerCnt: res.data.winnerCnt,
  //         //   openDate: res.data.openDate,
  //         //   startDate: res.data.startDate,
  //         //   endDate: res.data.endDate,
  //         //   images: res.data.images,
  //         //   limitCnt: res.data.limitCnt,
  //         //   point: res.data.point,
  //         // });
  //         // setList(res.data);
  //         // setGoodsInfo({
  //         //   winnerState: false,
  //         // });
  //         // setGoodsInfo({
  //         //   goodState: false,
  //         // });
  //       },
  //     },
  //   });
  return (
    <>
      <Box w={'100%'}>
        <Flex
          justifyContent={'space-between'}
          pt={'60px'}
          pb={'15px'}
          position={'sticky'}
          top={'72px'}
          bgColor={ColorWhite}
          zIndex={999}
          // mb={'26px'}
        >
          <Flex alignItems={'center'}>
            <Image
              src={'/images/Page/ico_order.png'}
              width={'20px'}
              height={'20px'}
              alt="주문관리"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              주문상세
            </Text>
          </Flex>
        </Flex>
        {OrderData?.data !== undefined && (
          <>
            {OrderData?.data?.partner !== undefined && (
              <PartnerInfo info={OrderData?.data?.partner} />
            )}
            <OrderInfo info={OrderData?.data} />
            {/* <OrderInfo info={OrderData?.data} /> */}
            <OrderGoods info={OrderData?.data} />
            {OrderData?.data?.groupOrders !== undefined &&
              OrderData?.data?.groupOrders.length > 0 && (
                <OrderWithGoods info={OrderData?.data} />
              )}
            <OrderBuyerInfo info={OrderData?.data} />
            <OrderResevationInfo info={OrderData?.data} />
            {OrderData?.data.orderType == 1 && (
              <OrderDelivery info={OrderData?.data} />
            )}

            <OrderAmount info={OrderData?.data} />
            <OrderPayment info={OrderData?.data} />
          </>
        )}

        {/* <OrderState />
      <OrderListComponent /> */}
      </Box>
      <Flex justifyContent={'center'} mt={'20px'}>
        <CustomButton
          text="목록"
          bgColor={ColorWhite}
          fontSize="15px"
          borderColor={ColorGray400}
          borderRadius="10px"
          py="13px"
          px="117px"
          color={ColorBlack}
          onClick={() => router.back()}
        />
      </Flex>
    </>
  );
}

export default OrderDetailComponentPage;
