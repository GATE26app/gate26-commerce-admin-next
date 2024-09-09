'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import Pagination from '@/components/common/Pagination';
import SearchInput from '@/components/common/SearchInput';

import { ColorRed, ColorWhite } from '@/utils/_Palette';
import CustomButton from '@/components/common/CustomButton';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useGetCouponListMutation } from '@/app/apis/coupon/CouponApi.mutation';
import { useGate26FilterZuInfo } from '@/_store/Gate26CouponFilterInfo';
import {
  CouponListReqType,
  CouponListResType,
} from '@/app/apis/coupon/CouponApi.type';
import CouponGate26Table from '../gate26/CouponGate26Table';
import CouponGoodsTable from './CouponGoodsTable';
function CouponGoodsContent() {
  const { gate26FilterInfo, setGate26FilterInfo } = useGate26FilterZuInfo(
    (state) => state,
  );
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [list, setList] = useState<CouponListReqType>({
    count: 0,
    totalCount: 0,
    pageCount: 0,
    pageNo: 0,
    pageSize: 0,
    coupons: [],
  });
  const [request, setRequest] = useState<CouponListResType>({
    pageNo: gate26FilterInfo.pageNo,
    pageSize: gate26FilterInfo.pageSize,
    searchType: 'title',
    searchKeyword: gate26FilterInfo.searchKeyword,
    level: 1, //파트너 레벨, 1=>정상, 2=>승인대기중, 3=>반려
    type: 3, //1=>전체상품(gate26전체상품), 2=>특정상점(파트너사쿠폰), 3=>특정상품(단일상품)
    access: 0,
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
      router.push(`/coupon/goods?page=${Number(value) + 1}`);
      setGate26FilterInfo({
        ...gate26FilterInfo,
        pageNo: Number(value),
      });
    }
    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }
    setGoodsInfo({
      goodsCouponState: true,
    });
    setRequest(newRequest);
  }

  const { mutate: refreshList, isLoading } = useGetCouponListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          goodsCouponState: false,
        });
      },
    },
  });
  useEffect(() => {
    refreshList(request);
  }, []);
  useEffect(() => {
    if (goodsInfo.goodsCouponState) refreshList(request);
  }, [goodsInfo.goodsCouponState]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      // enter 했을 때의 코드 작성
      // router.push(`/entries/first?search=${search}`);
      setGate26FilterInfo({
        ...gate26FilterInfo,
        searchKeyword: search,
      });
      setRequest({
        ...request,
        searchKeyword: search,
      });
      setGoodsInfo({
        goodsCouponState: true,
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
              setGate26FilterInfo({
                ...gate26FilterInfo,
                searchKeyword: search,
              });
              setRequest({
                ...request,
                searchKeyword: search,
              });
              // router.push(`/entries/first?search=${search}`);
              setGoodsInfo({
                goodsCouponState: true,
              });
            }}
            // py="14px"
          />
        </Flex>
        <Flex
          w={'150px'}
          bgColor={ColorRed}
          justifyContent={'center'}
          borderRadius={'10px'}
          py={'12px'}
          onClick={() => router.push('/coupon/goods/create')}
        >
          <Text color={ColorWhite} fontWeight={400} fontSize={'15px'}>
            신규등록
          </Text>
        </Flex>
      </Flex>
      <CouponGoodsTable data={list} />

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

export default CouponGoodsContent;
