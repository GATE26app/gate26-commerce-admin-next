'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import Pagination from '@/components/common/Pagination';
import SearchInput from '@/components/common/SearchInput';

import {
  ColorBlack,
  ColorGray100,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import EntreisAuctionTable from './EntreisAuctionTable';
import {
  EntriesListReqType,
  EntriesListResType,
} from '@/app/apis/entries/EntriesApi.type';
import CustomButton from '@/components/common/CustomButton';
import { useGetListMutation } from '@/app/apis/entries/EntriesApi.mutation';
import Image from 'next/image';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useAuctionFilterZuInfo } from '@/_store/AuctionFilterInfo';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

function EntriesAuctionContent() {
  const { auctionFilterInfo, setAuctionFilterInfo } = useAuctionFilterZuInfo(
    (state) => state,
  );
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [list, setList] = useState<EntriesListReqType>();
  const [request, setRequest] = useState<EntriesListResType>({
    pageNo: auctionFilterInfo.pageNo,
    pageSize: auctionFilterInfo.pageSize,
    status: auctionFilterInfo.status, //0=>오픈예정, 1=>진행중, 2=>종료
    level: auctionFilterInfo.level, //1=>노출, 2=>미노출
    type: 2, //1=>선착순, 2=>추첨 , 0 =>당첨자조회
    searchType: 'title',
    searchKeyword: auctionFilterInfo.searchKeyword,
    // partnerId: '1d43a226-8432-402a-ab95-313b6b8019d4',
  });

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
      router.push(`/entries/auction?page=${Number(value) + 1}`);
      setAuctionFilterInfo({
        ...auctionFilterInfo,
        pageNo: Number(value),
      });
    }
    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }
    setGoodsInfo({
      entryState: true,
    });
    setRequest(newRequest);
  }

  const { mutate: refreshList, isLoading } = useGetListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          entryState: false,
        });
      },
    },
  });

  useEffect(() => {
    refreshList(request);
  }, []);

  useEffect(() => {
    if (goodsInfo.entryState) refreshList(request);
  }, [goodsInfo.entryState]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      // enter 했을 때의 코드 작성
      // router.push(`/entries/auction?search=${search}`);
      setAuctionFilterInfo({
        ...auctionFilterInfo,
        searchKeyword: search,
      });
      setRequest({
        ...request,
        searchKeyword: search,
      });
      setGoodsInfo({
        entryState: true,
      });
      // if(e.keyCode === 13) 도 사용가능하다.
    }
  };
  return (
    <Box mt={'40px'}>
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
        <Flex flexDirection={'row'} gap={'20px'}>
          <Flex w={'400px'}>
            <SearchInput
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="검색어를 입력해주세요."
            />
          </Flex>
          <CustomButton
            text="검색"
            bgColor={ColorRed}
            borderColor={ColorRed}
            fontSize="14px"
            color={ColorWhite}
            fontWeight={500}
            px="30px"
            onClick={() => {
              setAuctionFilterInfo({
                ...auctionFilterInfo,
                searchKeyword: search,
              });
              setRequest({
                ...request,
                searchKeyword: search,
              });
              // router.push(`/entries/first?search=${search}`);
              setGoodsInfo({
                entryState: true,
              });
              // router.push(`/entries/auction?search=${search}`);
            }}
            // py="14px"
          />
        </Flex>
        <Flex
          w={'150px'}
          bgColor={ColorRed}
          justifyContent={'center'}
          borderRadius={'10px'}
          py={'13px'}
          onClick={() => router.push('/entries/auction/create')}
        >
          <Text color={ColorWhite} fontWeight={400} fontSize={'15px'}>
            신규등록
          </Text>
        </Flex>
      </Flex>
      <EntreisAuctionTable data={list} />
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

export default EntriesAuctionContent;
