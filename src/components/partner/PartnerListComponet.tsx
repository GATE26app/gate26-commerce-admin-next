import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

// import { GoodsListParamGetType } from '@/apis/goods/GoodsApi.type';

import CustomButton from '@/components/common/CustomButton';
import ImageButton from '@/components/common/ImageButton';
import Pagination from '@/components/common/Pagination';

import {
  ColorBlack,
  ColorGray100,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGoodsSettingFilterZuInfo } from '@/_store/GoodsSetFIlterInfo';
import { usePartnerSettingFilterZuInfo } from '@/_store/PartnerSetFilterInfo';
import PartnerDataTable from './list/PartnerDataTable';
import { PartnerListDataType } from '@/app/apis/partners/PartnersApi.type';


interface Props {
  data: PartnerListDataType | any;
  request: any;
  setRequest: React.Dispatch<React.SetStateAction<any>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
}
function PartnerListComponet({
  data,
  request,
  setRequest,
  setOnSubmit,
  isLoading,
}: Props) {
  
  const router = useRouter();
  const { PartnersSettingFilterInfo, setPartnersSettingFilterInfo } =
    usePartnerSettingFilterZuInfo((state) => state);
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);

  const paginationProps = {
    currentPage: request.pageNo,
    limit: request.pageSize,
    total: data?.totalCount,
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
      router.push(`/partner?page=${Number(value) + 1}`);
      setPartnersSettingFilterInfo({
        ...PartnersSettingFilterInfo,
        pageNo: Number(value),
      });
      // router.push(`/entries/first?page=${Number(value)}`);
    }

    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }

    //페이지가 마지막 페이지보다 큰 경우 마지막 페이지로 세팅
    // if (newRequest.page >= lastPage - 1) {
    //   newRequest.page = lastPage - 1;
    //   console.log('444444');
    // }
    // setOnSubmit(true);
    setGoodsInfo({
      partnerState: true,
    });
    setRequest(newRequest);
  }
  return (
    <Box mt={'5px'}>
      <PartnerDataTable data={data} setOnSubmit={setOnSubmit} />
      {data?.totalCount !== undefined &&
        data?.totalCount !== 0 &&
        paginationProps && (
          <Flex justifyContent="space-between" alignItems="center">
            <Pagination
              currentPage={request.pageNo}
              limit={request.pageSize}
              total={paginationProps.total}
              onPageNumberClicked={paginationProps.onPageNumberClicked}
              onPreviousPageClicked={paginationProps.onPreviousPageClicked}
              onNextPageClicked={paginationProps.onNextPageClicked}
              setOnSubmit={setOnSubmit}
            />
          </Flex>
        )}
    </Box>
  );
}

export default PartnerListComponet;
