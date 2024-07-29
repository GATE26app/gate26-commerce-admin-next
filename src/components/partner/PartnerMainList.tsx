import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { ColorBlack00, ColorGray700, ColorGrayBorder, ColorRed, ColorWhite } from '@/utils/_Palette';
import GoodsFilter from '@/components/goods/GoodsrFilter';
import GoodsListComponet from '@/components/goods/GoodsListComponet';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { getToken } from '@/utils/localStorage/token';
import { useSearchParams } from 'next/navigation';
import { GoodsListParamGetType } from '@/app/apis/goods/GoodsApi.type';
import PartnerFilter from './PartnerFilter';
import { PartnerSettingFilterInfoType, usePartnerSettingFilterZuInfo } from '@/_store/PartnerSetFilterInfo';
import { PartnerListDataType, PartnerListParamGetType } from '@/app/apis/partners/PartnersApi.type';
import PartnerListComponet from './PartnerListComponet';
import CustomButton from '../common/CustomButton';
import { useRouter } from '../../../node_modules/next/navigation';
import { usePostListMutation, usePostPartnersListMutation } from '@/app/apis/partners/PartnersApi.mutation';
function GoodsMainList() {
  const { PartnersSettingFilterInfo, setPartnersSettingFilterInfo } =
    usePartnerSettingFilterZuInfo((state) => state);
  const toast = useToast();
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState<Array<PartnerListDataType>>();
  const [onSubmit, setOnSubmit] = useState(true);

  const [request, setRequest] = useState<PartnerListParamGetType>({
    pageNo: PartnersSettingFilterInfo.pageNo,
    pageSize: PartnersSettingFilterInfo.pageSize,
    searchType: PartnersSettingFilterInfo.searchType,
    searchKeyword: PartnersSettingFilterInfo.searchKeyword,
    level: PartnersSettingFilterInfo.level,
    status: PartnersSettingFilterInfo.status,
    // type: PartnersSettingFilterInfo.pay_type,
  });

  const { mutate: PartnersList, isLoading } = usePostPartnersListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          partnerState: false,
        });
      },
    },
  });

  const getGoodsMainList = async () => {
    // console.log(request);
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
        partnerState: false,
      });
    } else {
      PartnersList(request);
    }
  };

  useEffect(() => {
    PartnersList(request);
  }, []);

  useEffect(() => {
    if (goodsInfo.partnerState) getGoodsMainList();
  }, [goodsInfo.partnerState]);

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
            상품관리
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
        <PartnerFilter
          request={request}
          setRequest={setRequest}
          setOnSubmit={setOnSubmit}
        />
      )}
      <Flex mt={'40px'} justifyContent={'flex-end'}>
      <CustomButton
          text="등록하기"
          fontSize="15px"
          color={ColorWhite}
          bgColor={ColorRed}
          borderColor={ColorRed}
          py="14px"
          px="48px"
          onClick={() => router.push('/partner/add')}
        />
      </Flex>
      <PartnerListComponet
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
