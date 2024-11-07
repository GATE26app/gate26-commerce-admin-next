import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import Pagination from '@/components/common/Pagination';

import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorWhite,
} from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import {
  ReviewListParamsType,
  ReviewListResType,
} from '@/app/apis/review/ReviewApi.type';
import BannerListTable from './BannerListTable';

interface Props {
  list: ReviewListResType;
  request: ReviewListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<ReviewListParamsType>>;
}
function BannerListComponent({ list, request, setRequest }: any) {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
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

      router.push(`/banner?page=${Number(value) + 1}`);
    }
    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }
    setGoodsInfo({
      bannerState: true,
    });
    setRequest(newRequest);
  }

  return (
    <Box mt={'40px'}>
      <LoadingModal
        children={isLoading}
        isOpen={isLoading}
        onClose={() => !isLoading}
      />
      <Flex justifyContent={'space-between'}>
        <Flex flexDirection={'row'} alignItems={'center'} gap={'6px'}>
          <Text
            fontSize={'15px'}
            lineHeight={'15px'}
            fontWeight={500}
            color={ColorGray700}
          >
            총
          </Text>
          <Text
            fontSize={'15px'}
            lineHeight={'15px'}
            fontWeight={800}
            color={ColorBlack}
          >
            {list?.totalCount}건
          </Text>
        </Flex>
      </Flex>
      <BannerListTable data={list} />
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

export default BannerListComponent;
