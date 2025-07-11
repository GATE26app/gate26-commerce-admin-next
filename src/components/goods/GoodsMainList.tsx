// 'use client';


import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';
import GoodsFilter from '@/components/goods/GoodsrFilter';
import GoodsListComponet from '@/components/goods/GoodsListComponet';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { GoodsListParamGetType } from '@/app/apis/goods/GoodsApi.type';
import { usePostListMutation } from '@/app/apis/goods/GoodsApi.mutation';
import { useGoodsSettingFilterZuInfo , defaultState} from '@/_store/GoodsSetFIlterInfo';
import CheckBox from '../common/CheckBox';

function GoodsMainList() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const { GoodsSettingFilterInfo, deleteGoodsSettingFilterInfo } = useGoodsSettingFilterZuInfo((state) => state);
  const toast = useToast();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState();
  const [onSubmit, setOnSubmit] = useState(true);
  
  // 트립 상품 체크 여부
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const toggleCheckbox = () => setCheckbox(!checkbox);

  const {
    GoodsSettingFilterInfo,
    setGoodsSettingFilterInfo,
    deleteGoodsSettingFilterInfo,
    updatePartialFilter,
  } = useGoodsSettingFilterZuInfo();
  
  // 상품 승인/관리 접속시 검색 초기화
  const [request, setRequest] = useState<GoodsListParamGetType>({
    pageNo: GoodsSettingFilterInfo.pageNo,
    pageSize: GoodsSettingFilterInfo.pageSize,
    status: GoodsSettingFilterInfo.status, //0=>임시저장, 1=>승인, 2=>대기, 3=> 반려
    level: GoodsSettingFilterInfo.level, //0 => 전체 1=>노출, 2=>미노출
    forSale: GoodsSettingFilterInfo.forSale, //0=> 전체 1=>판매, 2=>판매안함 , 10 =>품절
    searchType: GoodsSettingFilterInfo.searchType,
    searchKeyword: GoodsSettingFilterInfo.searchKeyword,
    type: GoodsSettingFilterInfo.type,
    tripCheck: GoodsSettingFilterInfo.tripCheck,
  });
  const { mutate: refreshList, isLoading } = usePostListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          goodState: false,
        });
      },
    },
  });

  const getGoodsMainList = async () => {
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
        goodState: false,
      });
    } else {
      refreshList(request);
    }
  };

  // useEffect(() => {
    
  //   const page = searchParams.get('page'); // 문자열 반환
  //   if(page == null) {
  //     deleteGoodsSettingFilterInfo();
  //     const resetRequest = { ...defaultState };
  //     setRequest(resetRequest)
  //     refreshList(resetRequest);        // ✅ 직접 호출
  //   }
  // }, [searchParams]);

  useEffect(() => {
    refreshList(request);
  }, [request]);

  useEffect(() => {
    setRequest({
      ...request,
      tripCheck : checkbox
    });
  }, [checkbox])

  useEffect(() => {
    if (goodsInfo.goodState) getGoodsMainList();
  }, [goodsInfo.goodState]);
  return (
    <Box w={'100%'} py={'60px'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/ico_goods.png'}
            width={'20px'}
            height={'20px'}
            alt="상품관리"
          />
          <Text
            fontWeight={800}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            상품관리 ?
          </Text>
          <Flex
            pl={'15px'}
            // visibility={'hidden'}
          >
            <CheckBox
              children={'trip.com 제외'}
              onClick={() => toggleCheckbox()}
              checked={checkbox}
            />
          </Flex>
            
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
            alt="상품관리"
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
            alt="상품관리"
          />
        </Flex>
      </Flex>
      {filter && (
        <GoodsFilter
          request={request}
          setRequest={setRequest}
          setOnSubmit={setOnSubmit}
        />
      )}
      <GoodsListComponet
        data={list}
        request={request}
        setRequest={setRequest}
        setOnSubmit={setOnSubmit}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default GoodsMainList;
