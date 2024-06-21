import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import Pagination from '@/components/common/Pagination';

import EntruesWinnerInquiryTable from './EntruesWinnerInquiryTable';
import {
  EntriesListReqType,
  EntriesListResType,
} from '@/app/apis/entries/EntriesApi.type';
import { useGetListMutation } from '@/app/apis/entries/EntriesApi.mutation';
import { ColorBlack, ColorGray100 } from '@/utils/_Palette';
import Image from 'next/image';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useWinnerFilterZuInfo } from '@/_store/WinnerFIlterInfo';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}
interface Props {
  list: EntriesListReqType;
  request: EntriesListResType;
  setRequest: React.Dispatch<React.SetStateAction<EntriesListResType>>;
}
function EntriesWinnderinquiryContent({ list, request, setRequest }: Props) {
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const { winnerFilterInfo, setWinnerFilterInfo } = useWinnerFilterZuInfo(
    (state) => state,
  );
  const paginationProps = {
    currentPage: request.pageNo,
    limit: request.pageSize,
    total: list?.totalCount == undefined ? 0 : list?.totalCount,
    onPageNumberClicked: (page: number) => handleChangeInput('page', page),
    onPreviousPageClicked: (page: number) => handleChangeInput('page', page),
    onNextPageClicked: (page: number) => handleChangeInput('page', page),
  };
  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };
    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      // setPage(value as number);
      newRequest.pageNo = Number(value);
      router.push(`/entries/winnerInquiry?page=${Number(value) + 1}`);
      setWinnerFilterInfo({
        ...winnerFilterInfo,
        pageNo: Number(value),
      });
    }
    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }
    setGoodsInfo({
      winnerState: true,
    });
    setRequest(newRequest);
  }

  return (
    <Box mt={'40px'}>
      <EntruesWinnerInquiryTable data={list} />

      {list?.totalCount !== undefined &&
        list?.totalCount !== 0 &&
        paginationProps && (
          <Flex justifyContent="center" alignItems="center">
            <Pagination
              currentPage={request.pageNo}
              limit={request.pageSize}
              total={paginationProps.total}
              onPageNumberClicked={paginationProps.onPageNumberClicked}
              onPreviousPageClicked={paginationProps.onPreviousPageClicked}
              onNextPageClicked={paginationProps.onNextPageClicked}
            />
          </Flex>
        )}
    </Box>
  );
}

export default EntriesWinnderinquiryContent;
