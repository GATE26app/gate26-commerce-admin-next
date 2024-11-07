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
import ImageButton from '@/components/common/ImageButton';
import { getToken } from '@/utils/localStorage/token';
import ButtonModal from '@/components/common/Modal/ButtonModal';

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
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'confirm',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };
    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      // setPage(value as number);
      newRequest.pageNo = Number(value) + 1;
      setOrderFilterInfo({
        ...orderFilterInfo,
        pageNo: Number(value),
      });
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

  const onClickExcel = () => {
    if (CheckList.length == 0 && list?.totalCount >= 100) {
      setOpenAlertModal(true);
      setModalState({
        ...ModalState,
        title: '엑셀 다운로드',
        message:
          '100개 이상의 상품을 다운로드하면 시간이 오래 걸립니다. 그래도 하시겠습니까?',
        type: 'confirm',
        okButtonName: '확인',
        cbOk: () => {
          f_excel_down();
          // window.history.back();
        },
      });
    } else {
      f_excel_down();
    }
  };
  const f_excel_down = async () => {
    setIsLoading(true);
    let searchKeyword =
      request.searchKeyword != ''
        ? 'searchType=' +
          request.searchType +
          '&searchKeyword=' +
          request.searchKeyword
        : '';
    let and =
      request.searchKeyword != '' ||
      request.orderType != 0 ||
      request.orderStatus != 0 ||
      request.cancelStatus?.length !== 0 ||
      request.periodType != '' ||
      request.periodStartDate != '' ||
      request.periodEndDate != '' ||
      CheckList.length != 0
        ? '?'
        : '';
    let orderType =
      request.orderType != 0 ? '&orderType=' + request.orderType : '';
    let orderStatus =
      request.orderStatus != 0 ? '&orderStatus=' + request.orderStatus : '';
    let periodType =
      request.periodType != '' ? '&periodType=' + request.periodType : '';
    let periodStartDate =
      request.periodStartDate != ''
        ? '&periodStartDate=' + request.periodStartDate
        : '';
    let periodEndDate =
      request.periodEndDate != ''
        ? '&periodEndDate=' + request.periodEndDate
        : '';
    let orderId = CheckList.length > 0 ? '&orderIds=' + CheckList : '';
    const addUrl = `${searchKeyword}${orderType}${orderStatus}${periodType}${periodStartDate}${periodEndDate}${orderId}`;
    console.log('addUrl', addUrl);
    const url = `/backoffice/admin/download-orders${and}${addUrl.slice(1)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      });
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;

      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = '첨부파일';
      console.log('contentDisposition', contentDisposition);

      if (contentDisposition && contentDisposition.includes('filename*=')) {
        fileName = decodeURIComponent(
          contentDisposition.split("filename*=UTF-8''")[1],
        );
      }

      a.download = decodeURIComponent(fileName); // 다운로드할 파일의 이름

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error downloading the file:', error);
    }
  };
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
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
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
            onClick={() => onClickExcel()}
          />
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