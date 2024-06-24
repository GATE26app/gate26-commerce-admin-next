import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';
import GoodsFilter from '@/components/goods/GoodsrFilter';
import GoodsListComponet from '@/components/goods/GoodsListComponet';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { getToken } from '@/utils/localStorage/token';
import { useSearchParams } from 'next/navigation';
import { GoodsListParamGetType } from '@/app/apis/goods/GoodsApi.type';
import { usePostListMutation } from '@/app/apis/goods/GoodsApi.mutation';
function GoodsMainList() {
  const toast = useToast();
  const searchParams = useSearchParams();
  const getPage = searchParams.get('page');
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState();
  const [onSubmit, setOnSubmit] = useState(true);
  const [request, setRequest] = useState<GoodsListParamGetType>({
    pageNo: getPage !== null ? Number(getPage) - 1 : 0,
    pageSize: 10,
    status: null,
    level: 0,
    forSale: 0,
    searchKeyword: '',
    searchType: '',
    partnerId: '',
    // partnerId: '1d43a226-8432-402a-ab95-313b6b8019d4',
  });
  const { mutate: refreshList, isLoading } = usePostListMutation({
    options: {
      onSuccess: (res) => {
        console.log('res.', res);
        console.log('data.', res.data);
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
    } else {
      console.log('vvvv');
      refreshList(request);
    }
  };

  useEffect(() => {
    refreshList(request);
  }, []);
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
