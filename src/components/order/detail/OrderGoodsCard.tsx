import Image from 'next/image';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import {
  usePostOrderContfrimMutation,
  usePutOrderCancelMutation,
  usePutOrderCancelRequestMutation,
} from '@/app/apis/order/OrderApi.mutation';
import { OrderDetailItemType } from '@/app/apis/order/OrderApi.type';

import {
  ColoLineGray,
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
} from '@/utils/_Palette';

import { formatDated, getImagePath, imgPath, intComma } from '@/utils/format';

import CancelModal from '../../common/Modal/CancelModal';
import OrderStateSelectBox from './OrderStateSelectBox';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import DeliveryModal from '@/components/common/Modal/DeliveryModal';
import CancelApprovalModal from '@/components/common/Modal/CancelApprovalModal';
import { useRouter } from 'next/navigation';
interface headerProps {
  id: string;
  name: string;
  width: string;
}
interface Props {
  header: Array<headerProps>;
  item: OrderDetailItemType;
}
function OrderGoodsCard({ header, item }: Props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();
  const [StateList, setStateList] = useState<string[]>([]);
  const [selectState, setSelectState] = useState(item.orderStatusName);
  const [cancelApproModal, setCancelApproModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [deliveryModal, setDelieveryModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    type: '',
    title: '',
  });
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };

  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    type: '',
    title: '',
    okButtonName: '',
    message: '',
    cbOk: () => {},
    cbCancel: () => {},
  });

  useEffect(() => {
    if (item.cancelStatusName == '' || item.cancelStatusName == null) {
      if (item.orderStatus !== 0 && item.orderStatus !== 100) {
        setStateList([item.orderStatusName, '주문 취소']);
        // if()
      }
    } else {
      if (item.cancelStatusName == '취소요청') {
        setSelectState(item.cancelStatusName);
        if (
          item.requiredPartnerCancelConfirm == 1 &&
          item.partnerCancelConfirm == 2
        ) {
          setStateList(['주문 취소']);
        } else if (item.requiredPartnerCancelConfirm == 0) {
          setStateList(['주문 취소']);
        } else {
          setStateList([item.cancelStatusName]);
        }
      }
    }
    // if()
    // if (item.cancelStatusName == '' || item.cancelStatusName == null) {
    //   if (
    //     (item.orderStatusName == '결제완료' && item.orderType == 1) ||
    //     (item.orderStatusName == '결제완료' && item.orderType == 2)
    //   ) {
    //     setStateList(['결제완료', '취소요청']);
    //     // StateList = dataList;
    //   } else if (item.orderStatusName == '결제완료' && item.orderType == 3) {
    //     setStateList(['결제완료', '예약확정', '취소']);
    //   } else if (item.orderStatusName == '이용일') {
    //     setStateList([item.orderStatusName, '취소요청']);
    //   } else if (item.orderStatusName == '예약확정') {
    //     setStateList([item.orderStatusName, '취소요청']);
    //   } else {
    //     setStateList([item.orderStatusName]);
    //   }
    // } else {
    //   setSelectState(item.cancelStatusName);
    //   setStateList([item.cancelStatusName]);
    // }
  }, [item.orderStatusName, item.cancelStatusName]);

  const [itemData, setItemData] = useState({
    orderId: item.orderId,
    orderThumbnailImagePath: item.orderThumbnailImagePath,
    orderCategoryTitle: item.orderCategoryTitle,
    orderCnt: item.orderCnt,
    orderOptionTitle: item.orderOptionTitle,
    discountAmount: item.discountAmount,
    orderAmount: item.orderAmount,
    orderTitle: item.orderTitle,
    shippingCompany: item.shippingCompany,
    shippingInvoice: item.shippingInvoice,
    shippingMemo: item.shippingMemo,
    orderCancelRequestDetail: '',
  });

  const onClickSelect = (type: string) => {
    if (type == '주문 취소') {
      setCancelApproModal(true);
      // setOpenAlertModal(true);
      //   setModalState({
      //     ...ModalState,
      //     title: '상태값 변경',
      //     message: `${type}으로 변경하시겠습니까?`,
      //     type: 'confirm',
      //     okButtonName: '변경',
      //     cbOk: () => {
      //       setSelectState(type);
      //     },
      //   });
    }
    // if (type !== selectState) {
    //   if (
    //     type == '접수거절' ||
    //     (type == '취소요청' && item.cancelStatusName == '')
    //   ) {
    //     setModalInfo({
    //       type: type,
    //       title: type == '접수거절' ? '취소사유 입력' : '취소요청사유 입력',
    //     });
    //     setCancelModal(true);
    //   } else if (type == '취소요청' && item.cancelStatusName !== '') {
    //     setOpenAlertModal(true);
    //     setModalState({
    //       ...ModalState,
    //       title: '상태값 변경',
    //       message: `이미 취소요청이 되어 있습니다.`,
    //       type: 'confirm',
    //       okButtonName: '확인',
    //       cbOk: () => {},
    //     });
    //   } else if (type == '예약확정') {
    //     setOpenAlertModal(true);
    //     setModalState({
    //       ...ModalState,
    //       title: '상태값 변경',
    //       message: `${type}으로 변경하시겠습니까?`,
    //       type: 'confirm',
    //       okButtonName: '변경',
    //       cbOk: () => {
    //         setSelectState(type);
    //         let obj = {
    //           orderId: item.orderId,
    //         };
    //         ConfrimMutate(obj);
    //       },
    //     });
    //   } else {
    //     setOpenAlertModal(true);
    //     setModalState({
    //       ...ModalState,
    //       title: '상태값 변경',
    //       message: `${type}으로 변경하시겠습니까?`,
    //       type: 'confirm',
    //       okButtonName: '변경',
    //       cbOk: () => {
    //         setSelectState(type);
    //       },
    //     });
    //   }
    // }
  };

  const onSubmitCancel = (text: string) => {
    if (modalInfo.type == '취소요청') {
      const obj = {
        orderId: item.orderId,
        type: '취소요청',
        body: {
          orderCancelRequestDetail: text,
        },
      };
      CancelRequestMutate(obj);
    } else if (modalInfo.type == '접수거절') {
      const obj = {
        orderId: item.orderId,
        type: '접수거절',
        body: {
          orderCancelRequestDetail: text,
        },
      };
      CancelMutate(obj);
    }
  };
  const onClickDelivery = () => {
    setDelieveryModal(true);
    // dispatch(
    //   orderModalSliceAction.setMessage({
    //     title: '배송정보 입력',
    //     message: `변경하시겠습니까?`,
    //     type: 'delivery',
    //     okButtonName: '변경',
    //     info: itemData,
    //     cbOk: () => {
    //       // setSelectState(type);
    //       // removeAdminInfo(row.userId as string);
    //     },
    //   }),
    // );
    // openOrderModal();
  };
  //예약 확정
  const { mutate: ConfrimMutate, isLoading: isConfrimLoading } =
    usePostOrderContfrimMutation({
      options: {
        onSuccess: (res, req) => {
          if (res.success) {
            // setIsLoading(false);
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
                  {'예약 확정 요청되었습니다.'}
                </Box>
              ),
            });
          } else {
            // setIsLoading(false);
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
                  {`${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  //주문 취소 요청
  const { mutate: CancelRequestMutate, isLoading: isCancelRequestLoading } =
    usePutOrderCancelRequestMutation({
      options: {
        onSuccess: (res, req) => {
          if (res.success) {
            setCancelModal(false);
            setSelectState(req.type);
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
                  {'주문 취소 요청이 되었습니다.'}
                </Box>
              ),
            });
          } else {
            setCancelModal(false);
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
                  {`${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  //주문 취소
  const { mutate: CancelMutate, isLoading: isCancelLoading } =
    usePutOrderCancelMutation({
      options: {
        onSuccess: (res) => {
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
                  {'주문 취소가 되었습니다.'}
                </Box>
              ),
            });
            // setSelectState(type);
            //  if (cbOk) {
            //    cbOk();
            //    onClose();
            //  }
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
                  {`${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  return (
    <>
      {cancelApproModal && (
        <CancelApprovalModal
          isOpen={cancelApproModal}
          onClose={() => {
            setCancelApproModal(false);
          }}
          onSubmit={onSubmitCancel}
          info={item}
        />
      )}
      {cancelModal && (
        <CancelModal
          isOpen={cancelModal}
          onClose={() => setCancelModal(false)}
          onSubmit={onSubmitCancel}
          info={itemData}
          title={modalInfo.title}
          type={modalInfo.type}
        />
      )}
      {deliveryModal && (
        <DeliveryModal
          isOpen={deliveryModal}
          onClose={() => setDelieveryModal(false)}
          // onSubmit={onSubmitCancel}
          info={itemData}
          title={modalInfo.title}
        />
      )}
      {isOpenAlertModal && (
        <ButtonModal
          isOpen={isOpenAlertModal}
          ModalState={ModalState}
          onClose={() => setOpenAlertModal(false)}
        />
      )}

      <Flex
        minW={'1550px'}
        flexDirection={'row'}
        justifyContent={'center'}
        py={'20px'}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
      >
        <Flex
          w={header[0]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={'5px'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.orderId}
          </Text>
        </Flex>
        <Flex w={header[1]?.width} gap={'10px'}>
          <Box
            w={'80px'}
            minWidth={'80px'}
            h={'80px'}
            borderRadius={'10px'}
            position={'relative'}
            overflow={'hidden'}
            ml={'10px'}
          >
            <img
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
              }}
              src={
                item.orderThumbnailImagePath !== null
                  ? `${getImagePath(item.orderThumbnailImagePath)}`
                  : '/images/no_img.png'
              }
              onError={addDefaultImg}
              alt="이미지 업로드"
            />
          </Box>
          {/* 상품정보 */}
          <Flex flexDirection={'column'}>
            <Flex mb={'5px'} gap={'10px'} flexDirection={'row'} flexShrink={0}>
              <Text
                color={ColorBlack}
                fontSize={'14px'}
                fontWeight={600}
                flexShrink={0}
              >
                {item.orderCategoryTitle}
              </Text>
              <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
                {item.orderTitle}
              </Text>
            </Flex>
            <Flex gap={'10px'} flexShrink={0}>
              <Text
                flexShrink={0}
                color={ColorGray700}
                fontWeight={600}
                fontSize={'14px'}
                w={'50px'}
              >
                선택옵션
              </Text>
              <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
                {item.orderOptionTitle} * {item.orderCnt}
              </Text>
            </Flex>
            <Flex gap={'10px'}>
              <Text
                color={ColorGray700}
                fontWeight={600}
                fontSize={'14px'}
                w={'49px'}
              >
                주문금액
              </Text>
              <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
                {intComma(item.orderAmount)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* 결제정보 */}
        <Flex
          w={header[2]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
            {intComma(item.orderAmount)}원
          </Text>
        </Flex>
        {/* 예약자정보 */}
        <Flex
          w={header[3]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {formatDated(dayjs(item.orderDateTimeOfUse)) == 'Invalid Date'
              ? '-'
              : formatDated(dayjs(item.orderDateTimeOfUse))}
          </Text>
        </Flex>
        <Flex
          w={header[4]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'10px'}
        >
          <OrderStateSelectBox
            placeholder="결제완료"
            width={'120px'}
            list={StateList}
            select={selectState}
            setSelect={setSelectState}
            onClick={onClickSelect}
          />
        </Flex>
        {/* 주문 상품 유형, 1=>일반형, 2=>바우처형, 3=>예약형, 4=>이륙살롱 */}
        {item.orderType === 1 && (
          <Flex
            w={header[5]?.width}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Flex
              px={'11px'}
              py={'7px'}
              borderWidth={1}
              borderColor={ColoLineGray}
              borderRadius={'6px'}
              onClick={onClickDelivery}
              cursor={'pointer'}
            >
              <Text color={ColorGray700} fontWeight={500} fontSize={'12px'}>
                배송정보입력
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default OrderGoodsCard;
