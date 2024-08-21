import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Box, Flex, useToast } from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';
import ImageButton from '@/components/common/ImageButton';

import {
  ColorGray50,
  ColorGray600,
  ColorGrayBorder,
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
  const router = useRouter();
  const toast = useToast();
  const {
    GoodsSettingFilterInfo,
    setGoodsSettingFilterInfo,
    deleteGoodsSettingFilterInfo,
  } = useGoodsSettingFilterZuInfo((state) => state);
  const onClickSubmit = () => {
    if (request.searchType == '' && request.searchKeyword !== '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            검색분류를 선택해주세요.
          </Box>
        ),
      });
      // ToastComponent('기간조회 유형을 선택해주세요.');
    } else {
      router.push(`/goodsSetting?page=1`);
      setGoodsSettingFilterInfo({
        ...GoodsSettingFilterInfo,
        pageNo: 0,
        searchType: request.searchType !== undefined ? request.searchType : '',
        searchKeyword:
          request.searchKeyword !== undefined ? request.searchKeyword : '',
        level: request.level !== undefined ? request.level : 0,
        forSale: request.forSale !== undefined ? request.forSale : 0,
        status: request.status !== undefined ? request.status : null,
      });
      setRequest({
        ...request,
        pageNo: 0,
        searchType: request.searchType !== undefined ? request.searchType : '',
        searchKeyword:
          request.searchKeyword !== undefined ? request.searchKeyword : '',
        level: request.level !== undefined ? request.level : 0,
        forSale: request.forSale !== undefined ? request.forSale : 0,
        status: request.status !== undefined ? request.status : null,
      });
      setGoodsInfo({
        goodState: true,
      });
    }
  };
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
            onClickSubmit();
          }}
        />
        {/* <Button size="sm" text="검색" width={'160px'} /> */}
      </Flex>
    </Flex>
  );
}

export default GoodsFilter;
