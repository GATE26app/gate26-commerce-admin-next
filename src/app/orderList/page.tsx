'use client';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { usePostOrderListMutation } from '@/app/apis/order/OrderApi.mutation';

import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';

// import { useOrderFilterZuInfo } from '@/_store/OrderFilterInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import {
  OrderListParamsType,
  OrderListResType,
} from '../apis/order/OrderApi.type';
import { useOrderFilterZuInfo } from '@/_store/OrderFilterInfo';
import OrderFIlter from '@/components/order/list/OrderFIlter';
import OrderListComponent from '@/components/order/list/OrderListComponent';
import OrderState from '@/components/order/list/OrderState';
// import OrderListComponent from '@/components/Order/List/OrderListComponent';
// import OrderFIlter from '@/components/Order/List/OrderFIlter';

function OrderListPage() {
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState<OrderListResType>({
    count: 0,
    totalCount: 0,
    pageCount: 0,
    pageNo: 1,
    pageSize: 10,
    orders: [],
    status: {
      paymentCnt: 0,
      reservationCnt: 0,
      dateTimeOfUseCnt: 0,
      completeCnt: 0,
      cancelCnt: 0,
    },
  });
  const { orderFilterInfo, setOrderFilterInfo } = useOrderFilterZuInfo(
    (state) => state,
  );
  const [request, setRequest] = useState<OrderListParamsType>({
    pageNo: orderFilterInfo.pageNo,
    // router.query.page !== null && router.query.page !== undefined
    //   ? Number(router.query.page) - 1
    //   : 0,
    pageSize: 10,
    // status: 'ordered', //ordered(주문내역, 기본), cancled(취소내역)
    searchType: orderFilterInfo.searchType,
    searchKeyword: orderFilterInfo.searchKeyword,
    orderType: orderFilterInfo.orderType, //주문 상품 유형, 1=>일반형, 2=>바우처형, 3=>예약형
    orderStatus: orderFilterInfo.orderStatus, //주문 상품 상태 1=>결제완료, 2=>예약확정, 3=>이용일, 10=>이용완료,(결제)취소 =>100
    cancelStatus: orderFilterInfo.cancelStatus, //취소 상태, 1=>취소요청, 2=>취소거절, 3=>취소완료
    periodType: orderFilterInfo.periodType, //기간 유형, 'paymentDate'=>결제일, 'orderDateTimeOfUse'=>이용일, 'cancelRequestDate'=>취소요청일, 'cancelConfirmDate'=>취소승인일, 'cancelDeniedDate'=>취소반려일
    periodStartDate: orderFilterInfo.periodStartDate,
    periodEndDate: orderFilterInfo.periodEndDate,
  });

  useEffect(() => {
    if (orderFilterInfo.pageNo) {
      setRequest({ ...request, pageNo: Number(orderFilterInfo.pageNo) - 1 });
      setGoodsInfo({
        orderState: true,
      });
    }
  }, [orderFilterInfo.pageNo]);
  const { mutate: refreshList, isLoading } = usePostOrderListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          orderState: false,
        });
      },
    },
  });

  useEffect(() => {
    refreshList(request);
  }, []);
  useEffect(() => {
    if (goodsInfo.orderState) refreshList(request);
  }, [goodsInfo.orderState]);

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={'26px'} pt={'60px'}>
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
            주문관리
          </Text>
        </Flex>
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          borderWidth={1}
          borderColor={ColorGrayBorder}
          borderRadius={'10px'}
          px={'15px'}
          py={'10px'}
          cursor={'pointer'}
          onClick={() => setFilter(!filter)}
        >
          <Image
            src={'/images/Page/icon_filter.png'}
            width={'16px'}
            height={'16px'}
            alt="주문관리"
          />
          <Text
            color={ColorGray700}
            fontWeight={700}
            fontSize={'15px'}
            pl={'9px'}
            pr={'5px'}
          >
            {filter ? '검색필터 접기' : '검색필터 열기'}
          </Text>
          <Image
            src={
              filter
                ? '/images/Page/ico_fillter_up.png'
                : '/images/Page/ico_fillter_down.png'
            }
            width={'18px'}
            height={'18px'}
            alt="취소관리"
          />
        </Flex>
      </Flex>
      {filter && <OrderFIlter request={request} setRequest={setRequest} />}
      <OrderState list={list.status} />
      <OrderListComponent
        list={list}
        request={request}
        setRequest={setRequest}
      />
    </Box>
  );
}

export default OrderListPage;
