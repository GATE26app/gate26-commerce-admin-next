import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import {
  OrderListParamsType,
  OrderListResType,
} from '@/app/apis/order/OrderApi.type';

import Pagination from '@/components/common/Pagination';

import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorWhite,
} from '@/utils/_Palette';

import { useCancelFilterZuInfo } from '@/_store/CancelStateInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import CancelDataTable from './CancelDataTable';
import SelectBox from '@/components/common/SelectBox';
import CustomButton from '@/components/common/CustomButton';

// import OrderDataTable from './OrderDataTable';

// import GoodsDataTable from './GoodsDataTable';
interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

interface Props {
  list: OrderListResType;
  request: OrderListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<OrderListParamsType>>;
}
function CancelComponent({ list, request, setRequest }: Props) {
  const router = useRouter();
  const toast = useToast();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [stateSelect, setStateSelect] = useState('');
  const stateSelectList = ['취소요청', '취소승인', '취소반려', '취소'];
  const [CheckList, setChekcList] = useState<string[]>([]);
  const { cancelFilterInfo, setCancelFilterInfo } = useCancelFilterZuInfo(
    (state) => state,
  );
  const paginationProps = {
    currentPage: request.pageNo,
    limit: request.pageSize,
    total: list?.totalCount == undefined ? 0 : list?.totalCount,
    onPageNumberClicked: (page: number) => handleChangeInput('page', page),
    onPreviousPageClicked: (page: number) => handleChangeInput('page', page),
    onNextPageClicked: (page: number) => handleChangeInput('page', page),
  };

  console.log('request.pageNo', request.pageNo);
  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };
    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      // setPage(value as number);
      newRequest.pageNo = Number(value);
      // setCancelFilterInfo({
      //   ...cancelFilterInfo,
      //   pageNo: Number(value),
      // });
      router.push(`/cancelList?page=${Number(value) + 1}`);
    }
    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }
    setGoodsInfo({
      cancelState: true,
    });
    setRequest(newRequest);
  }
  //상태값 변경
  const onChangeState = () => {
    if (stateSelect == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'상태값을 선택해주세요.'}
          </Box>
        ),
      });
    } else {
      if (stateSelect == '취소요청') {
        CheckList.map((item) => {
          const obj = {
            orderId: item,
          };
          // setIsLoading(true);
          // ConfrimMutate(obj);
        });
      } else if (stateSelect == '취소승인') {
        // setCancelModal(true);
        // setModalInfo({
        //   type: '접수거절',
        //   title: '취소사유 입력',
        // });
      } else if (stateSelect == '취소반려') {
        // setCancelModal(true);
        // setModalInfo({
        //   type: '접수거절',
        //   title: '취소요청사유 입력',
        // });
      } else if (stateSelect == '취소') {
        // setCancelModal(true);
        // setModalInfo({
        //   type: '접수거절',
        //   title: '취소요청사유 입력',
        // });
      }
    }
  };
  return (
    <Box mt={'40px'}>
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
        {/* <Flex gap={'10px'}>
          <SelectBox
            placeholder="상태값 변경처리"
            width={'168px'}
            list={stateSelectList}
            select={stateSelect}
            setSelect={setStateSelect}
          />
          <CustomButton
            text="변경"
            bgColor={ColorWhite}
            borderColor={ColorGrayBorder}
            px="29px"
            py="11px"
            color={ColorGray700}
            fontSize="14px"
            onClick={() => onChangeState()}
          />
          <ImageButton
            img="/images/Page/excel_icon.png"
            backgroundColor={ColorWhite}
            borderColor={ColorGrayBorder}
            text="엑셀 다운로드"
            TextColor={ColorGray700}
            fontSize="14px"
            imgHeight="20px"
            imgWidth="20px"
            px="14px"
            py="10px"
            onClick={() => console.log('엑셀다운로드')}
          />
        </Flex> */}
      </Flex>
      <CancelDataTable
        list={list}
        setChekcList={setChekcList}
        CheckList={CheckList}
      />
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

export default CancelComponent;
