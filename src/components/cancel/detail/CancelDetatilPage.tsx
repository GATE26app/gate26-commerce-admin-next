'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactElement, use, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import orderApi from '@/app/apis/order/OrderApi';

import {
  ColorBlack,
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorWhite,
} from '@/utils/_Palette';
import OrderInfo from '@/components/cancel/detail/OrderInfo';
import CancelInfo from '@/components/cancel/detail/CancelInfo';
import OrderResevationInfo from '@/components/order/detail/OrderResevationInfo';
import OrderDelivery from '@/components/order/detail/OrderDelivery';
import OrderPayment from '@/components/order/detail/OrderPayment';
import CustomButton from '@/components/common/CustomButton';
import PartnerInfo from '@/components/order/detail/PartnerInfo';
import OrderAmount from '@/components/order/detail/OrderAmount';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import LoadingModal from '@/components/common/Modal/LoadingModal';

function CancelDetailComponentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getOrderId = searchParams.get('orderId');
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);

  const [isLoadingModal, setLoadingModal] = useState(false);
  const {
    data: CancelData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ['orderItem', String(getOrderId)],
    () => orderApi.getOrderItem(String(getOrderId)),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!getOrderId,
    },
  );

  const refreshCancelInfo = () => {
    refetch();
  }

  useEffect(() => {
    if (goodsInfo.cancelState) {
      refetch();
    }
  }, [goodsInfo.cancelState]);

  return (
    <>
      <LoadingModal
        children={isLoadingModal}
        isOpen={isLoadingModal}
        onClose={() => setLoadingModal(false)}
      />
      <Box w={'100%'} pt={'60px'}>
        <Flex justifyContent={'space-between'} mb={'26px'}>
          <Flex alignItems={'center'}>
            <Image
              src={'/images/Page/ico_order.png'}
              width={'20px'}
              height={'20px'}
              alt="취소상세"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              취소상세
            </Text>
          </Flex>
        </Flex>
        {CancelData?.data !== undefined && (
          <>
            {CancelData?.data?.orderType !== 4 && (
              <PartnerInfo info={CancelData?.data?.partner} />
            )}

            <CancelInfo info={CancelData?.data} refresh={refreshCancelInfo} />
            <OrderInfo info={CancelData?.data} />
            {/* <OrderGoods /> */}
            {CancelData?.data?.orderType !== 1 && (
              <OrderResevationInfo info={CancelData?.data} />
            )}
            {CancelData?.data?.orderType == 1 && (
              <OrderDelivery info={CancelData?.data} />
            )}
            <OrderAmount info={CancelData?.data} />
            <OrderPayment info={CancelData?.data} />
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

export default CancelDetailComponentPage;
