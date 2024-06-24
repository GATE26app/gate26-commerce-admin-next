'use client';
import React, { ReactElement, useEffect, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';
import EntriesWinnerFliter from '@/components/entries/winnerInquiry/EntriesWinnerFliter';
import EntriesWinnderinquiryContent from '@/components/entries/winnerInquiry/EntriesWinnderinquiryContent';
import {
  EntriesListReqType,
  EntriesListResType,
} from '@/app/apis/entries/EntriesApi.type';
import { useGetListMutation } from '@/app/apis/entries/EntriesApi.mutation';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import ToastComponent from '@/components/common/Toast/ToastComponent';
import { useSearchParams } from 'next/navigation';
import { useWinnerFilterZuInfo } from '@/_store/WinnerFIlterInfo';

function page() {
  const { winnerFilterInfo, setWinnerFilterInfo } = useWinnerFilterZuInfo(
    (state) => state,
  );
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState<EntriesListReqType>();
  const [request, setRequest] = useState<EntriesListResType>({
    pageNo: winnerFilterInfo.pageNo,
    pageSize: winnerFilterInfo.pageSize,
    status: winnerFilterInfo.status, //0=>오픈예정, 1=>진행중, 2=>종료
    level: winnerFilterInfo.level, //1=>노출, 2=>미노출
    type: winnerFilterInfo.type, //1=>선착순, 2=>추첨 , 0 =>당첨자조회
    searchType: winnerFilterInfo.searchType,
    searchKeyword: winnerFilterInfo.searchKeyword,
    // partnerId: '1d43a226-8432-402a-ab95-313b6b8019d4',
  });

  // useEffect(() => {
  //   if (getPage) {
  //     setRequest({ ...request, pageNo: Number(getPage) - 1 });
  //     setGoodsInfo({
  //       winnerState: true,
  //     });
  //   }
  // }, [getPage]);

  const { mutate: refreshList, isLoading } = useGetListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          winnerState: false,
        });
        // setGoodsInfo({
        //   goodState: false,
        // });
      },
    },
  });

  useEffect(() => {
    if (goodsInfo.winnerState) getWinnerList();
  }, [goodsInfo.winnerState]);

  const getWinnerList = async () => {
    if (request.searchKeyword !== '' && request.searchType == '') {
      ToastComponent('검색분류를 선택해주세요.');
    } else {
      refreshList(request);
    }
  };
  useEffect(() => {
    refreshList(request);
  }, []);

  return (
    <Box w={'100%'} py={'60px'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/subtopicon05.png'}
            width={'20px'}
            height={'20px'}
            alt="당첨자조회"
          />
          <Text
            fontWeight={700}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            당첨자조회
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
            alt="상품관리"
          />
          <Text
            color={ColorGray700}
            fontWeight={700}
            fontSize={'15px'}
            pl={'9px'}
            pr={'5px'}
          >
            검색필터 접기
          </Text>
          <Image
            src={'/images/Page/ico_fillter_up.png'}
            width={'18px'}
            height={'18px'}
            alt="상품관리"
          />
        </Flex>
      </Flex>
      {filter && (
        <EntriesWinnerFliter request={request} setRequest={setRequest} />
      )}
      {/* {list?.totalCount !== undefined && list?.totalCount !== 0 && ( */}
      <EntriesWinnderinquiryContent
        list={list}
        request={request}
        setRequest={setRequest}
      />
      {/* )} */}
    </Box>
  );
}

export default page;
