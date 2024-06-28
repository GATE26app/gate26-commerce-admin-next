import React, { useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

// import { GoodsListParamGetType } from '../../../../apis/goods/GoodsApi.type';

import CustomButton from '@/components/common/CustomButton';
import ImageButton from '@/components/common/ImageButton';
import SearchInput from '@/components/common/SearchInput';
import SelectBox from '@/components/common/SelectBox/SelectBox';

import {
  ColorBlack,
  ColorGray50,
  ColorGray600,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import FilterBox from './FilterBox';

import { GoodsListParamGetType } from '@/app/apis/goods/GoodsApi.type';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useGoodsSettingFilterZuInfo } from '@/_store/GoodsSetFIlterInfo';

interface Props {
  request: GoodsListParamGetType;
  setRequest: React.Dispatch<React.SetStateAction<GoodsListParamGetType>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
function GoodsFilter({ request, setRequest, setOnSubmit }: Props) {
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [search, setSearch] = useState('');
  const {
    GoodsSettingFilterInfo,
    setGoodsSettingFilterInfo,
    deleteGoodsSettingFilterInfo,
  } = useGoodsSettingFilterZuInfo((state) => state);
  return (
    <Flex
      bgColor={ColorGray50}
      borderRadius={'12px'}
      p={'40px'}
      flexDirection={'column'}
    >
      <Flex>
        <FilterBox request={request} setRequest={setRequest} />
        {/* <LeftBox
          filter_1={filter_1}
          filter_2={filter_2}
          setFilter_1={setFilter_1}
          setFilter_2={setFilter_2}
          search={search}
          setSearch={setSearch}
        />
        <RightBox filter_3={filter_3} setFilter_3={setFilter_3} /> */}
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
              status: null,
              level: 0,
              forSale: 0,
              searchKeyword: '',
              searchType: '',
            });
            deleteGoodsSettingFilterInfo();
            setOnSubmit(true);
            setGoodsInfo({
              goodState: true,
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
            // setOnSubmit(true);
            setGoodsSettingFilterInfo({
              ...GoodsSettingFilterInfo,
              pageNo: request.pageNo !== undefined ? request.pageNo : 0,
              searchType:
                request.searchType !== undefined ? request.searchType : '',
              searchKeyword:
                request.searchKeyword !== undefined
                  ? request.searchKeyword
                  : '',
              status: request.status !== undefined ? request.status : 0,
              level: request.level !== undefined ? request.level : 0,
              forSale: request.forSale !== undefined ? request.forSale : 0,
            });
            setGoodsInfo({
              goodState: true,
            });
          }}
        />
        {/* <Button size="sm" text="검색" width={'160px'} /> */}
      </Flex>
    </Flex>
  );
}

export default GoodsFilter;
