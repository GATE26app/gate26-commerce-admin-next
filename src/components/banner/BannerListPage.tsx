'use client';
import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import {
  ColorBlack00,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useBannerFilterZuInfo } from '@/_store/BannerFilterInfo';
import {
  BannerListParamsType,
  BannerListResType,
} from '@/app/apis/banner/BannerApi.type';
import { useRouter } from '../../../node_modules/next/navigation';
import BannerFilter from './BannerFilter';
import BannerListComponent from './BannerListComponent';
import { useGetListMutation } from '@/app/apis/banner/BannerApi.mutation';

function BannerListPage() {
  const { bannerFilterInfo, setBannerFilterInfo } = useBannerFilterZuInfo(
    (state) => state,
  );
  const router = useRouter();
  const toast = useToast();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState<BannerListResType>();
  const [onSubmit, setOnSubmit] = useState(true);
  const [request, setRequest] = useState<BannerListParamsType>({
    pageNo: bannerFilterInfo.pageNo,
    pageSize: bannerFilterInfo.pageSize,
    searchType: 'title',
    searchKeyword: bannerFilterInfo.searchKeyword,
    level: bannerFilterInfo.level,
  });

  const { mutate: refreshList, isLoading } = useGetListMutation({
    options: {
      onSuccess: (res) => {
        console.log('banner list :: ', res);
        setList(res.data);
        setGoodsInfo({
          bannerState: false,
        });
      },
    },
  });

  const getBannerMainList = async () => {
    refreshList(request);
  };

  useEffect(() => {
    refreshList(request);
  }, [request]);

  useEffect(() => {
    if (goodsInfo.bannerState) getBannerMainList();
  }, [goodsInfo.bannerState]);

  return (
    <Box w={'100%'} py={'60px'}>
      <Flex justifyContent={'space-between'} mb={'12px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/subtopicon07.png'}
            width={'20px'}
            height={'20px'}
            alt="배너"
          />
          <Text
            fontWeight={800}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            배너관리
          </Text>
        </Flex>
      </Flex>
      <Text color={'#757983'} fontSize={'15px'}>
        *커머스 홈페이지에 최대 10개까지 노출 가능합니다.
      </Text>
      <BannerFilter
        request={request}
        setRequest={setRequest}
        setOnSubmit={setOnSubmit}
      />
      <BannerListComponent
        list={list}
        request={request}
        setRequest={setRequest}
      />
    </Box>
  );
}

export default BannerListPage;
