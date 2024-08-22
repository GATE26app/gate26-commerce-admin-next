import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderListParamsType } from '@/apis/order/OrderApi.type';

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

import { useOrderFilterZuInfo } from '@/_store/OrderFilterInfo';

interface Props {
  request: OrderListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<OrderListParamsType>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
function FilterInputBox({ request, setRequest, search, setSearch }: Props) {
  const [searchSelect, setSearchSelect] = useState('');
  const [dateSelect, setDateSelect] = useState('');
  const searchSelectList = ['상품코드', '상품명', '상품카테고리'];
  const SelectList = ['결제일', '예약일'];
  const { orderFilterInfo, setOrderFilterInfo } = useOrderFilterZuInfo(
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
    if (request.periodType == '') {
      setDateSelect('');
    }
  }, [request]);
  useEffect(() => {
    if (sState) {
      setRequest({
        ...request,
        periodStartDate: `${dayjs(startDay).format('YYYY-MM-DD')} 00:00:00`,
      });
      setOrderFilterInfo({
        ...orderFilterInfo,
        periodStartDate: `${dayjs(startDay).format('YYYY-MM-DD')} 00:00:00`,
      });
      setSState(false);
    }
    if (eState) {
      setRequest({
        ...request,
        periodEndDate: `${dayjs(endDay).format('YYYY-MM-DD')} 23:59:59`,
      });
      setOrderFilterInfo({
        ...orderFilterInfo,
        periodEndDate: `${dayjs(endDay).format('YYYY-MM-DD')} 23:59:59`,
      });
      setEState(false);
    }
  }, [sState, eState]);

  useEffect(() => {
    if (request.searchType == '') {
      setSearchSelect('');
    }
  }, [request]);
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
  useEffect(() => {
    if (dateSelect != '') {
      setRequest({
        ...request,
        periodType:
          dateSelect == '결제일' ? 'paymentDate' : 'orderDateTimeOfUse',
      });
    }
  }, [dateSelect]);
  return (
    <Box w={'50%'} mr={'15px'}>
      <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
        기간조회
      </Text>
      <Flex mb={'30px'}>
        <Flex alignItems={'center'} gap={'5px'}>
          <SelectBox
            placeholder="검색분류선택"
            width={'190px'}
            list={SelectList}
            select={dateSelect}
            setSelect={setDateSelect}
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
            width={'190px'}
            minDateTime={
              request.periodStartDate == ''
                ? ''
                : dayjs(request.periodStartDate).format('YYYY-MM-DD')
            }
            onApply={(date) => {
              setEndDay(date);
              setEState(true);
            }}
          />
          {/* </Flex> */}
        </Flex>
      </Flex>

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
        {/* <SearchInput
          text={request.searchKeyword == undefined ? '' : request.searchKeyword}
          onChange={(e: any) =>
            setRequest({ ...request, searchKeyword: e.target.value })
          }
          placeholder="검색어를 입력해주세요."
        /> */}
        <SearchInput
          text={String(request.searchKeyword)}
          onChange={(e) => setRequest({ ...request, searchKeyword: e })}
          placeholder="검색어를 입력해주세요."
        />
      </Flex>
    </Box>
  );
}

export default FilterInputBox;
