'use client';
import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { usePostListMutation } from '@/app/apis/goods/GoodsApi.mutation';
import ReviewFilter from './ReviewFilter';
import ReviewListComponent from './ReviewListComponent';
import { useReviewFilterZuInfo } from '@/_store/ReviewFilterInfo';
import {
  ReviewListParamsType,
  ReviewListResType,
} from '@/app/apis/review/ReviewApi.type';
import { usePostReviewListMutation } from '@/app/apis/review/ReviewApi.mutation';
import { PaymentMethod } from '@/utils/format';

function ReviewListPage() {
  const { reviewFilterInfo, setReviewFilterInfo } = useReviewFilterZuInfo(
    (state) => state,
  );
  const toast = useToast();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState<ReviewListResType>();
  const [onSubmit, setOnSubmit] = useState(true);
  const [request, setRequest] = useState<ReviewListParamsType>({
    pageNo: reviewFilterInfo.pageNo,
    pageSize: reviewFilterInfo.pageSize,
    searchType: reviewFilterInfo.searchType,
    searchKeyword: reviewFilterInfo.searchKeyword,
    reply: reviewFilterInfo.reply,
    level: reviewFilterInfo.level,
  });

  const { mutate: refreshList, isLoading } = usePostReviewListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          reviewState: false,
        });
      },
    },
  });
  const getReveiwMainList = async () => {
    console.log('request', request);
    if (request.searchKeyword !== '' && request.searchType == '') {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            검색분류를 선택해주세요.
          </Box>
        ),
      });
      setGoodsInfo({
        reviewState: false,
      });
    } else {
      refreshList(request);
    }
  };

  useEffect(() => {
    refreshList(request);
  }, []);
  useEffect(() => {
    if (goodsInfo.reviewState) getReveiwMainList();
  }, [goodsInfo.reviewState]);
  return (
    <Box w={'100%'} py={'60px'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/ico_review.png'}
            width={'20px'}
            height={'20px'}
            alt="리뷰"
          />
          <Text
            fontWeight={800}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            리뷰내역
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
            alt="리뷰"
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
            alt="리뷰"
          />
        </Flex>
      </Flex>
      {filter && (
        <ReviewFilter
          request={request}
          setRequest={setRequest}
          setOnSubmit={setOnSubmit}
        />
      )}
      <ReviewListComponent
        list={list}
        request={request}
        setRequest={setRequest}
      />
    </Box>
  );
}

export default ReviewListPage;
