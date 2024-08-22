import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderListParamsType } from '@/apis/order/OrderApi.type';

import CustomButton from '@/components/common/CustomButton';
import DatePicker from '@/components/common/DatePicker';
import SearchInput from '@/components/common/SearchInput';
import SelectBox from '@/components/common/SelectBox';

import {
  ColorBlack,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import { useCancelFilterZuInfo } from '@/_store/CancelStateInfo';

interface Props {
  request: OrderListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<OrderListParamsType>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
function CancelFilterBox({ request, setRequest, search, setSearch }: Props) {
  const [searchSelect, setSearchSelect] = useState('');
  const [select, setSelect] = useState('');
  const SelectList = ['취소요청일', '취소승인일', '결제일', '예약일'];
  const searchSelectList = ['상품코드', '상품명', '상품카테고리'];
  const { cancelFilterInfo, setCancelFilterInfo } = useCancelFilterZuInfo(
    (state) => state,
  );
  const [startDay, setStartDay] = useState<dayjs.Dayjs>(() =>
    dayjs(request.periodStartDate),
  );
  const [endDay, setEndDay] = useState<dayjs.Dayjs>(() =>
    dayjs(request.periodEndDate),
  );

  const [sState, setSState] = useState(false);
  const [eState, setEState] = useState(false);
  //초기화버튼 클릭시
  useEffect(() => {
    if (request.periodStartDate == '' || request.periodStartDate == null) {
      setStartDay(dayjs(''));
    }
    if (request.periodEndDate == '' || request.periodEndDate == null) {
      setEndDay(dayjs(''));
    }
    if (request.searchType == '') {
      setSearchSelect('');
    }
    if (request.periodType == '') {
      setSelect('');
    }
  }, [request]);

  useEffect(() => {
    if (sState) {
      setRequest({
        ...request,
        periodStartDate: `${dayjs(startDay).format('YYYY-MM-DD')} 00:00:00`,
      });
      setCancelFilterInfo({
        ...cancelFilterInfo,
        periodStartDate: `${dayjs(startDay).format('YYYY-MM-DD')} 00:00:00`,
      });
      setSState(false);
    }
    if (eState) {
      setRequest({
        ...request,
        periodEndDate: `${dayjs(endDay).format('YYYY-MM-DD')} 23:59:59`,
      });
      setCancelFilterInfo({
        ...cancelFilterInfo,
        periodEndDate: `${dayjs(endDay).format('YYYY-MM-DD')} 23:59:59`,
      });
      setEState(false);
    }
  }, [sState, eState]);

  useEffect(() => {
    if (select !== '') {
      setRequest({
        ...request,
        periodType:
          select == '취소요청일'
            ? 'cancelRequestDate'
            : select == '취소승인일'
              ? 'cancelConfirmDate'
              : select == '취소반려일'
                ? 'cancelDeniedDate'
                : '',
      });
    }
  }, [select]);
  useEffect(() => {
    if (searchSelect != '') {
      setRequest({
        ...request,
        searchType:
          searchSelect == '상품코드'
            ? 'itemCode'
            : searchSelect == '카테고리명'
              ? 'category'
              : 'title',
      });
    }
  }, [searchSelect]);
  return (
    <Flex flexDirection={'column'} w={'100%'}>
      <Flex flexDirection={'row'} flexWrap={'wrap'}>
        <Flex flexDirection={'column'} w={'50%'}>
          <Text
            fontSize={'16px'}
            fontWeight={700}
            color={ColorBlack}
            mb={'10px'}
          >
            상태값
          </Text>
          <Flex mb={'30px'} gap={'10px'}>
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={
                request.cancelStatus?.includes(1) &&
                request.cancelStatus?.includes(2) &&
                request.cancelStatus?.includes(3)
                  ? ColorRed
                  : ColorInputBorder
              }
              bgColor={
                request.cancelStatus?.includes(1) &&
                request.cancelStatus?.includes(2) &&
                request.cancelStatus?.includes(3)
                  ? ColorRed
                  : ColorWhite
              }
              borderRadius={'10px'}
              text="전체"
              fontSize={'15px'}
              color={
                request.cancelStatus?.includes(1) &&
                request.cancelStatus?.includes(2) &&
                request.cancelStatus?.includes(3)
                  ? ColorWhite
                  : ColorGray700
              }
              onClick={() =>
                setRequest({
                  ...request,
                  cancelStatus: [1, 2, 3],
                  orderStatus: 0,
                })
              }
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={
                request.cancelStatus?.length == 1 &&
                request.cancelStatus?.includes(1)
                  ? ColorRed
                  : ColorInputBorder
              }
              bgColor={
                request.cancelStatus?.length == 1 &&
                request.cancelStatus?.includes(1)
                  ? ColorRed
                  : ColorWhite
              }
              borderRadius={'10px'}
              text="취소요청"
              fontSize={'15px'}
              color={
                request.cancelStatus?.length == 1 &&
                request.cancelStatus?.includes(1)
                  ? ColorWhite
                  : ColorGray700
              }
              onClick={() => {
                setRequest({
                  ...request,
                  cancelStatus: [1],
                  orderStatus: 0,
                });
              }}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={
                request.cancelStatus?.length == 1 &&
                request.cancelStatus?.includes(2)
                  ? ColorRed
                  : ColorInputBorder
              }
              bgColor={
                request.cancelStatus?.length == 1 &&
                request.cancelStatus?.includes(2)
                  ? ColorRed
                  : ColorWhite
              }
              borderRadius={'10px'}
              text="취소승인"
              fontSize={'15px'}
              color={
                request.cancelStatus?.length == 1 &&
                request.cancelStatus?.includes(2)
                  ? ColorWhite
                  : ColorGray700
              }
              onClick={() => {
                setRequest({
                  ...request,
                  cancelStatus: [2],
                  orderStatus: 0,
                });
              }}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={
                request.cancelStatus?.length == 1 &&
                request.cancelStatus?.includes(3)
                  ? ColorRed
                  : ColorInputBorder
              }
              bgColor={
                request.cancelStatus?.length == 1 &&
                request.cancelStatus?.includes(3)
                  ? ColorRed
                  : ColorWhite
              }
              borderRadius={'10px'}
              text="취소반려"
              fontSize={'15px'}
              color={
                request.cancelStatus?.length == 1 &&
                request.cancelStatus?.includes(3)
                  ? ColorWhite
                  : ColorGray700
              }
              onClick={() => {
                setRequest({
                  ...request,
                  cancelStatus: [3],
                  orderStatus: 0,
                });
              }}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={
                request.orderStatus == 4 ? ColorRed : ColorInputBorder
              }
              bgColor={request.orderStatus == 4 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="취소"
              fontSize={'15px'}
              color={request.orderStatus == 4 ? ColorWhite : ColorGray700}
              onClick={() => {
                setRequest({
                  ...request,
                  cancelStatus: [],
                  orderStatus: 4,
                });
              }}
            />
          </Flex>
        </Flex>
      </Flex>
      <Box w={'50%'}>
        <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
          기간조회
        </Text>
        <Flex>
          <Flex alignItems={'center'} gap={'5px'}>
            <SelectBox
              placeholder="검색분류선택"
              width={'190px'}
              list={SelectList}
              select={select}
              setSelect={setSelect}
            />
            {/* <Flex gap={'5px'} alignItems={'center'}> */}
            <DatePicker
              type={'date'}
              curDate={startDay}
              width={'190px'}
              maxDateTime={
                request.periodEndDate == ''
                  ? ''
                  : dayjs(request.periodEndDate).format('YYYY-MM-DD')
              }
              onApply={(date) => {
                setStartDay(date);
                setSState(true);
              }}
            />
            <Text color={ColorBlack} fontSize={'15px'} fontWeight={500}>
              ~
            </Text>
            <DatePicker
              type={'date'}
              curDate={endDay}
              minDateTime={
                request.periodStartDate == ''
                  ? ''
                  : dayjs(request.periodStartDate).format('YYYY-MM-DD')
              }
              width={'190px'}
              onApply={(date) => {
                setEndDay(date);
                setEState(true);
              }}
            />
            {/* </Flex> */}
          </Flex>
        </Flex>
      </Box>
      <Box w={'50%'} mr={'15px'} mt={'30px'}>
        <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
          통합검색
        </Text>
        <Flex gap={'10px'}>
          <Box width={'190px'}>
            <SelectBox
              placeholder="검색분류선택"
              width={'190px'}
              list={searchSelectList}
              select={searchSelect}
              setSelect={setSearchSelect}
            />
          </Box>
          <SearchInput
            text={String(request.searchKeyword)}
            onChange={(e) => setRequest({ ...request, searchKeyword: e })}
            placeholder="검색어를 입력해주세요."
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default CancelFilterBox;
