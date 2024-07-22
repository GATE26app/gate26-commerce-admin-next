import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';
import ImageButton from '@/components/common/ImageButton';

import {
  ColorGray50,
  ColorGray600,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import { useGoodsSettingFilterZuInfo } from '@/_store/GoodsSetFIlterInfo';
import { GoodsListParamGetType } from '@/app/apis/goods/GoodsApi.type';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import ReviewFiterSelect from './ReviewSelectFilter';
import { ReviewListParamsType } from '@/app/apis/review/ReviewApi.type';
import { useReviewFilterZuInfo } from '@/_store/ReviewFilterInfo';

interface Props {
  request: ReviewListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<ReviewListParamsType>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewFilter({ request, setRequest, setOnSubmit }: Props) {
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [search, setSearch] = useState('');

  const { reviewFilterInfo, setReviewFilterInfo, deleteReviewFilterInfo } =
    useReviewFilterZuInfo((state) => state);

  return (
    <Flex
      bgColor={ColorGray50}
      borderRadius={'12px'}
      p={'40px'}
      flexDirection={'column'}
    >
      <Flex flexDirection={'column'}>
        <ReviewFiterSelect
          request={request}
          setRequest={setRequest}
          search={search}
          setSearch={setSearch}
        />
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
              reply: '',
              searchKeyword: '',
              searchType: '',
            });
            deleteReviewFilterInfo();
            setOnSubmit(true);
            setGoodsInfo({
              reviewState: true,
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
            setReviewFilterInfo({
              ...reviewFilterInfo,
              pageNo: request.pageNo !== undefined ? request.pageNo : 0,
              searchType:
                request.searchType !== undefined ? request.searchType : '',
              searchKeyword:
                request.searchKeyword !== undefined
                  ? request.searchKeyword
                  : '',
              reply: request.reply !== undefined ? request.reply : '',
            });
            setGoodsInfo({
              reviewState: true,
            });
          }}
        />
        {/* <Button size="sm" text="검색" width={'160px'} /> */}
      </Flex>
    </Flex>
  );
}

export default ReviewFilter;
