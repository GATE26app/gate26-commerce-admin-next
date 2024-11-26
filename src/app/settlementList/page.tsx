'use client';
import React, { useEffect, useState } from 'react';
import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import SettleMentFilter from '@/components/Settlement/List/SettleMentFilter';
import SettleMentDivision from '@/components/Settlement/List/SettleMentDivision';
import SettleMentList from '@/components/Settlement/List/SettleMentList';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useReviewFilterZuInfo } from '@/_store/ReviewFilterInfo';
import { useGetSettleListMutation } from '../apis/settlement/SettlementApi.mutation';
import { SettleListResType } from '../apis/settlement/SettlementApi.type';
import { useSettleFilterZuInfo } from '@/_store/SettleFilterInfo';
const data = {
  totalCount: 1,
  data: [
    {
      name: 'test',
    },
  ],
};
function page() {
  const [filter, setFilter] = useState(true);
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [onSubmit, setOnSubmit] = useState(true);
  const { settleFilterInfo, setSettleFilterInfo } = useSettleFilterZuInfo(
    (state) => state,
  );
  const [request, setRequest] = useState<any>({
    pageNo: settleFilterInfo.pageNo,
    pageSize: 10,
    searchKeyword: settleFilterInfo.searchKeyword,
    searchType: settleFilterInfo.searchType,
    fromDate: settleFilterInfo.fromDate,
    toDate: settleFilterInfo.toDate,
    status: settleFilterInfo.status
  });
  const [list, setList] = useState<SettleListResType>({
    count: 0,
    totalCount: 0,
    pageCount: 0,
    pageNo: 1,
    pageSize: 10,
    settlements: [],
  });

  // useEffect(() => {
  //   if (settleFilterInfo.pageNo) {
  //     setRequest({ ...request, pageNo: Number(settleFilterInfo.pageNo) - 1 });
  //     setGoodsInfo({
  //       settlementState: true,
  //     });
  //   }
  // }, [settleFilterInfo.pageNo]);
  
  const { mutate: refreshList, isLoading } = useGetSettleListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          settlementState: false,
        });
      },
    },
  });

  useEffect(() => {
    refreshList(request);
  }, []);
  
  useEffect(() => {
    if (goodsInfo.settlementState) refreshList(request);
  }, [goodsInfo.settlementState]);

  useEffect(() => {
    if (settleFilterInfo.pageNo) {
      setRequest({ ...request, pageNo: Number(settleFilterInfo.pageNo) - 1 });
      setGoodsInfo({
        settlementState: true,
      });
    }
  }, [settleFilterInfo.pageNo]);
  
  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={'26px'} pt={'60px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/ico_calculate.png'}
            width={'20px'}
            height={'20px'}
            alt="정산내역"
          />
          <Text
            fontWeight={800}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            정산내역
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
            alt="정산내역"
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
      {filter && <SettleMentFilter request={request} setRequest={setRequest} setOnSubmit={setOnSubmit} />}
      <SettleMentDivision request={request} setRequest={setRequest} setOnSubmit={setOnSubmit}/>
      <SettleMentList data={list} request={request} setRequest={setRequest} />
      {/* <GoodsListComponet
    data={list}
    request={request}
    setRequest={setRequest}
    setOnSubmit={setOnSubmit}
    isLoading={isLoading}
  /> */}
    </Box>
  );
}

export default page;
