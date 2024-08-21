import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import { OrderListParamsType } from '@/app/apis/order/OrderApi.type';

import CustomButton from '@/components/common/CustomButton';
import ImageButton from '@/components/common/ImageButton';

import {
  ColorGray50,
  ColorGray600,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import FilterInputBox from './FilterInputBox';
import FilterSelectBox from './FilterSelectBox';

import { useOrderFilterZuInfo } from '@/_store/OrderFilterInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';

// import LeftBox from './LeftBox';
// import RightBox from './RightBox';

interface Props {
  request: OrderListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<OrderListParamsType>>;
}
function OrderFIlter({ request, setRequest }: Props) {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const { orderFilterInfo, setOrderFilterInfo } = useOrderFilterZuInfo(
    (state) => state,
  );
  const onClickSubmit = () => {
    if (
      (request.periodType == '' && request.periodStartDate !== '') ||
      (request.periodType == '' && request.periodEndDate !== '')
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'기간조회 유형을 선택해주세요.'}
          </Box>
        ),
      });
      // ToastComponent('기간조회 유형을 선택해주세요.');
    } else {
      router.push(`/orderList?page=1`);
      setRequest({
        ...request,
        searchType: request.searchType !== undefined ? request.searchType : '',
        searchKeyword:
          request.searchKeyword !== undefined ? request.searchKeyword : '',
        orderType: request.orderType !== undefined ? request.orderType : 0,
        orderStatus:
          request.orderStatus !== undefined ? request.orderStatus : 0,
        cancelStatus:
          request.cancelStatus !== undefined ? request.cancelStatus : [],
        periodType: request.periodType !== undefined ? request.periodType : '',
        periodStartDate:
          request.periodStartDate !== undefined ? request.periodStartDate : '',
        periodEndDate:
          request.periodEndDate !== undefined ? request.periodEndDate : '',
      });
      setOrderFilterInfo({
        ...orderFilterInfo,
        searchType: request.searchType !== undefined ? request.searchType : '',
        searchKeyword:
          request.searchKeyword !== undefined ? request.searchKeyword : '',
        orderType: request.orderType !== undefined ? request.orderType : 0,
        orderStatus:
          request.orderStatus !== undefined ? request.orderStatus : 0,
        cancelStatus:
          request.cancelStatus !== undefined ? request.cancelStatus : [],
        periodType: request.periodType !== undefined ? request.periodType : '',
        periodStartDate:
          request.periodStartDate !== undefined ? request.periodStartDate : '',
        periodEndDate:
          request.periodEndDate !== undefined ? request.periodEndDate : '',
      });
      setGoodsInfo({
        orderState: true,
      });
    }
  };
  return (
    <Flex
      bgColor={ColorGray50}
      borderRadius={'12px'}
      p={'40px'}
      flexDirection={'column'}
    >
      <Flex flexDirection={'column'}>
        <FilterInputBox
          request={request}
          setRequest={setRequest}
          search={search}
          setSearch={setSearch}
        />
        <FilterSelectBox request={request} setRequest={setRequest} />
      </Flex>
      <Flex justifyContent={'center'} mt={'45px'} gap={'10px'}>
        <ImageButton
          img="/images/Page/icon_reload.png"
          backgroundColor={ColorWhite}
          px={'48px'}
          text="초기화"
          onClick={() => {
            setRequest({
              ...request,
              pageNo: 0,
              orderStatus: 0,
              orderType: 0,
              periodEndDate: '',
              periodStartDate: '',
              periodType: '',
              searchKeyword: '',
              searchType: '',
            });
            setOrderFilterInfo({
              ...request,
              pageNo: 0,
              orderStatus: 0,
              orderType: 0,
              periodEndDate: '',
              periodStartDate: '',
              periodType: '',
              searchKeyword: '',
              searchType: '',
              cancelStatus: [],
            });
            setGoodsInfo({
              orderState: true,
            });
          }}
          borderColor={ColorGrayBorder}
          TextColor={ColorGray600}
          imgWidth={'15px'}
          imgHeight={'15px'}
          fontSize={'15px'}
          py="13px"
        />
        <CustomButton
          text="검색"
          fontSize="15px"
          color={ColorWhite}
          bgColor={ColorRed}
          borderColor={ColorRed}
          py="14px"
          px="67px"
          onClick={() => {
            onClickSubmit();
          }}
        />
        {/* <Button size="sm" text="검색" width={'160px'} /> */}
      </Flex>
    </Flex>
  );
}

export default OrderFIlter;
