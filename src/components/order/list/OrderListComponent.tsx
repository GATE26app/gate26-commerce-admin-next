import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import {
  usePostOrderContfrimMutation,
  usePostOrderGroupMutation,
  usePutOrderCancelMutation,
  usePutOrderCancelRequestMutation,
} from '@/app/apis/order/OrderApi.mutation';
import {
  OrderListParamsType,
  OrderListResType,
} from '@/app/apis/order/OrderApi.type';

import CustomButton from '@/components/common/CustomButton';
import CancelModal from '@/components/common/Modal/CancelModal';
import Pagination from '@/components/common/Pagination';
import SelectBox from '@/components/common/SelectBox';

import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorWhite,
} from '@/utils/_Palette';

import OrderDataTable from './OrderDataTable';

import { useOrderFilterZuInfo } from '@/_store/OrderFilterInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import LoadingModal from '@/components/common/Modal/LoadingModal';

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
function OrderListComponent({ list, request, setRequest }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [stateSelect, setStateSelect] = useState('');
  const stateSelectList = ['접수거절'];
  const [cancelModal, setCancelModal] = useState(false);
  const { orderFilterInfo, setOrderFilterInfo } = useOrderFilterZuInfo(
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
  const [modalInfo, setModalInfo] = useState({
    type: '',
    title: '',
  });
  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };
    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      // setPage(value as number);
      newRequest.pageNo = Number(value);

      router.push(`/orderList?page=${Number(value) + 1}`);
    }
    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }
    setGoodsInfo({
      orderState: true,
    });
    setRequest(newRequest);
  }

  const [CheckList, setChekcList] = useState<string[]>([]);
  const [newCheckList, setNewChekcList] = useState<string[]>([]);

  //주문번호 그룹화
  const { mutate: OrderGroupMutate } = usePostOrderGroupMutation({
    options: {
      onSuccess: (res, req) => {
        if (res.success) {
          console.log('res', res);
          setNewChekcList(res.data.orderIds);
          // setIsLoading(false);
          if (stateSelect == '접수거절') {
            setCancelModal(true);

            setModalInfo({
              type: '접수거절',
              title: '취소사유 입력',
            });
          }
        }
      },
    },
  });
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
      OrderGroupMutate({
        orderIds: CheckList,
      });
    }
  };

  const onSubmitCancel = (text: string) => {
    if (modalInfo.type == '접수거절') {
      newCheckList.map((item) => {
        // CancelRequestMutate(obj);
        const obj = {
          orderId: item,
          type: '접수거절',
          body: {
            orderCancelRequestDetail: text,
          },
        };
        setIsLoading(true);
        CancelMutate(obj);
      });
    }
  };

  //주문 취소
  const { mutate: CancelMutate, isLoading: isCancelLoading } =
    usePutOrderCancelMutation({
      options: {
        onSuccess: (res, req) => {
          setCancelModal(false);
          setIsLoading(false);
          if (res.success) {
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`주문번호 [${req?.orderId}] : 주문 취소가 되었습니다.`}
                </Box>
              ),
            });
          } else {
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`주문번호 [${req?.orderId}] : ${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });

  return (
    <Box mt={'40px'}>
      {cancelModal && (
        <CancelModal
          isOpen={cancelModal}
          onClose={() => setCancelModal(false)}
          onSubmit={onSubmitCancel}
          info={undefined}
          title={modalInfo.title}
          type={modalInfo.type}
        />
      )}
      <LoadingModal
        children={isLoading}
        isOpen={isLoading}
        onClose={() => !isLoading}
      />
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
        <Flex gap={'10px'}>
          {/* <SelectBox
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
          /> */}
          {/* <ImageButton
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
          /> */}
        </Flex>
      </Flex>
      <OrderDataTable
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

export default OrderListComponent;
