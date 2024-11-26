import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Text, Textarea, useToast } from '@chakra-ui/react';

import {
  usePostCancelDeniedMutation,
  usePutOrderMemoMutation,
} from '@/app/apis/order/OrderApi.mutation';
import {
  OrderDetailItemType,
  OrderRequestCancelType,
} from '@/app/apis/order/OrderApi.type';

import CustomButton from '@/components/common/CustomButton';

import {
  COlorBlueSucces,
  ColorBlack,
  ColorBlue,
  ColorDataTableBorderTop,
  ColorGray50,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorRed50,
  ColorWhite,
} from '@/utils/_Palette';
import { PaymentMethod, formatDated, intComma } from '@/utils/format';
import CancelInfoCard from './CancelInfoCard';
import RadioComponent from '@/components/common/CustomRadioButton/RadioComponent';
import InputBox from '@/components/common/Input';
import DatePicker from '@/components/common/DatePicker';
import CancelApprovalModal from '@/components/common/Modal/CancelApprovalModal';
import CancelCompaionModal from '@/components/common/Modal/CancelCompaionModal';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';

interface Props {
  info: OrderDetailItemType;
}
function CancelInfo({ info }: Props) {
  const [state, setState] = useState(1); //1=>취소요청, 2=>취소거절, 3=>취소완료
  const router = useRouter();
  const searchParams = useSearchParams();
  const getOrderId = searchParams.get('orderId');
  const toast = useToast();
  const [deniedReason, setDeniedReason] = useState('');
  const [day, setDay] = useState<dayjs.Dayjs>(dayjs(new Date())); //환불기준일

  const [memo, setMemo] = useState<string>(
    info.partnerMemo == null ? '' : info.partnerMemo,
  );
  const [cancelApproModal, setCancelApproModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);

  useEffect(() => {
    if (info.partnerMemo) {
      setMemo(info.partnerMemo);
    }
    if (info.cancelStatus) {
      setState(info.cancelStatus);
    }
  }, [info]);
  const { mutate: InputMemoMutate, isLoading: isLoading } =
    usePutOrderMemoMutation({
      options: {
        onSuccess: (res: any) => {
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
                  {'메모를 저장하였습니다.'}
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
                  {res.message}
                </Box>
              ),
            });
          }
        },
      },
    });

  const onSubmitMemo = () => {
    if (memo == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'메모를 입력해주세요.'}
          </Box>
        ),
      });
      // ToastComponent('메모를 입력해주세요.');
    } else {
      const obj = {
        orderId: String(getOrderId),
        body: {
          memo: memo,
        },
      };
      InputMemoMutate(obj);
    }
  };

  const ItemInfo = {
    orderId: info.orderId,
    orderThumbnailImagePath: info.orderThumbnailImagePath,
    orderCategoryTitle: info.orderCategoryTitle,
    orderCnt: info.orderCnt,
    orderOptionTitle: info.orderOptionTitle,
    discountAmount: info.discountAmount,
    orderAmount: info.orderAmount,
    orderTitle: info.orderTitle,
    orderDateTimeOfUse: info.orderDateTimeOfUse,
    orderStatus: info.orderStatus,
    address: info.address,
    addressDetail: info.addressDetail,
    postcode: info.postcode,
    recieverName: info.recieverName,
    recieverHp: info.recieverHp,
  };
  const onSubmitCancel = (text: string) => {
    const obj: OrderRequestCancelType = {
      orderId: info?.orderId,
      body: {
        cancelDeniedDetail: text,
      },
    };
    CancelDeniedMutate(obj);
    // }
  };
  //주문 취소 반려
  const { mutate: CancelDeniedMutate, isLoading: isCancelLoading } =
    usePostCancelDeniedMutation({
      options: {
        onSuccess: (res, req) => {
          setCancelModal(false);
          if (res.success) {
            setGoodsInfo({
              cancelState: false,
            });
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
                  {`취소 반려가 되었습니다.`}
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
                  {`${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  console.log('info', info);
  return (
    <>
      {cancelApproModal && (
        <CancelApprovalModal
          isOpen={cancelApproModal}
          onClose={() => setCancelApproModal(false)}
          onSubmit={onSubmitCancel}
          info={info}
        />
      )}
      {cancelModal && (
        <CancelCompaionModal
          isOpen={cancelModal}
          onClose={() => setCancelModal(false)}
          onSubmit={onSubmitCancel}
          info={info}
        />
      )}

      <Box mt={'60px'} p={'40px'} bgColor={'#FAFAFA'} borderRadius={'10px'}>
        <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
          취소 정보
        </Text>
        <Flex
          flexDirection={'column'}
          w={'100%'}
          borderTopColor={ColorDataTableBorderTop}
          borderTopWidth={1}
          mt={'15px'}
        >
          <Flex mt={'15px'} alignItems={'center'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              결제일
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {formatDated(dayjs(info.paymentDate)) == 'Invalid Date'
                ? '-'
                : formatDated(dayjs(info.paymentDate))}
            </Text>
          </Flex>
          <Flex mt={'15px'} flexDirection={'column'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              취소요청상품
            </Text>
            <CancelInfoCard info={info} />
          </Flex>
          <Flex mt={'15px'} alignItems={'center'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              구매확정여부
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {info.orderConfirmName}
            </Text>
          </Flex>
          <Flex mt={'15px'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              취소상태
            </Text>
            <Flex gap={'10px'} flexDirection={'column'} w={'100%'}>
              <Flex flexDirection={'row'} gap={'40px'}>
                <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                  {info.cancelStatusName}
                </Text>
                {info?.requiredPartnerCancelConfirm == 1 ? (
                  <>
                    {info?.partnerCancelConfirm == 1 ? (
                      <Text
                        fontSize={'15px'}
                        fontWeight={500}
                        color={ColorBlack}
                      >
                        파트너취소승인 필요한 취소요청건입니다.
                      </Text>
                    ) : (
                      <>
                        {info?.cancelStatus == 1 &&
                        info?.partnerCancelConfirm == 3 ? (
                          <>
                            <RadioComponent
                              text="승인"
                              // disabled={info.cancelStatus}
                              checked={state == 3 ? true : false}
                              onClick={() => {
                                setState(3);
                                setCancelApproModal(true);
                              }}
                            />
                            <RadioComponent
                              text="반려"
                              // disabled={info.cancelStatus}
                              checked={state == 2 ? true : false}
                              onClick={() => {
                                setState(2);
                                setCancelModal(true);
                              }}
                            />
                          </>
                        ) : info?.cancelStatus == 1 &&
                          info?.partnerCancelConfirm == 2 ? (
                          <Text
                            fontSize={'15px'}
                            fontWeight={500}
                            color={ColorBlack}
                          >
                            파트너가 반려한 취소요청건입니다.
                          </Text>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <RadioComponent
                      text="승인"
                      // disabled={info.cancelStatus}
                      checked={state == 3 ? true : false}
                      onClick={() => {
                        setState(3);
                        setCancelApproModal(true);
                      }}
                    />
                    <RadioComponent
                      text="반려"
                      // disabled={info.cancelStatus}
                      checked={state == 2 ? true : false}
                      onClick={() => {
                        setState(2);
                        setCancelModal(true);
                      }}
                    />
                  </>
                )}
              </Flex>
              {state == 2 && deniedReason && (
                <InputBox
                  w={'100%'}
                  mt={'10px'}
                  value={deniedReason}
                  placeholder="반려 사유를 입력해주세요."
                  // value={list?.title}
                  onChange={(e) => setDeniedReason(e.target.value)}
                  // disabled={goodsInfo.LogItemDisable}
                  // register={register('title')}
                />
              )}
              {/* <Flex
              bgColor={state == 1 ? ColorRed50 : COlorBlueSucces}
              px={'6px'}
              pt={'4px'}
              pb={'3px'}
              // py={'4px'}
              borderRadius={'5px'}
            >
              <Text
                color={state == 1 ? ColorRed : ColorBlue}
                fontWeight={600}
                fontSize={'12px'}
              >
                {info.cancelFaultTypeName}
              </Text>
            </Flex> */}
            </Flex>
          </Flex>
          <Flex mt={'15px'} alignItems={'center'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              취소요청일
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {formatDated(dayjs(info.cancelRequestDate)) == 'Invalid Date'
                ? '-'
                : formatDated(dayjs(info.cancelRequestDate))}
            </Text>
          </Flex>
          <Flex mt={'15px'} alignItems={'center'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              취소요청 사유
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {info?.cancelRequestDetail}
            </Text>
          </Flex>
          <Flex mt={'15px'} alignItems={'center'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              // flexShrink={0}
              color={ColorBlack}
              whiteSpace={'pre-wrap'}
            >
              취소승인일
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {formatDated(dayjs(info.cancelConfirmDate)) == 'Invalid Date'
                ? '-'
                : formatDated(dayjs(info.cancelConfirmDate))}
            </Text>
          </Flex>

          {/* <Flex mt={'15px'} alignItems={'flex-start'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              취소정책
            </Text>
            {info.policies?.length > 0 ? (
              <Flex flexDirection={'column'}>
                {info.policies.map((item) => {
                  return (
                    <Flex>
                      <Text
                        color={ColorBlack}
                        fontWeight={400}
                        fontSize={'15px'}
                        mb={'5px'}
                      >
                        {item.title}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            ) : (
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                -
              </Text>
            )}
          </Flex> */}
          {info?.cancelStatus == 3 && (
            <Flex mt={'15px'} alignItems={'center'}>
              <Text
                w={'160px'}
                fontSize={'15px'}
                fontWeight={700}
                flexShrink={0}
                color={ColorBlack}
              >
                환불 금액
              </Text>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {intComma(info.cancelAmount)}원
              </Text>
            </Flex>
          )}

          <Flex mt={'15px'} alignItems={'flex-start'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              결제정보
            </Text>
            <Flex flexDirection={'column'}>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {intComma(info.paymentAmount)}원
              </Text>
              <Text color={ColorGray700} fontWeight={400} fontSize={'15px'}>
                {/* {info.paymentMethod == 'card' ? '카드취소' : '무통장'} */}
                {PaymentMethod(info.paymentMethod)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDirection={'row'} pt={'20px'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            관리자메모
          </Text>
          <Textarea
            value={memo}
            placeholder="내용을 입력해주세요."
            _placeholder={{ color: ColorGray700 }}
            color={ColorBlack}
            borderColor={ColorGrayBorder}
            onChange={(e) => setMemo(e.target.value)}
            maxLength={500}
            height={'96px'}
            borderRadius={'10px'}
            bgColor={ColorWhite}
          />
        </Flex>
        <Flex
          flexDirection={'column'}
          bgColor={ColorGray50}
          // p={'20px'}
          px={'20px'}
          py={'30px'}
          borderRadius={'12px'}
          mt={'40px'}
          // justifyContent={'center'}
        >
          <Flex
            flexDirection={'row'}
            alignItems={'center'}
            gap={'10px'}
            mt={'40px'}
            justifyContent={'center'}
          >
            <CustomButton
              text="목록"
              fontSize="15px"
              color={ColorBlack}
              bgColor={ColorWhite}
              borderColor={ColorGrayBorder}
              py="14px"
              px="67px"
              onClick={() => router.back()}
            />

            <CustomButton
              text="저장"
              borderColor={ColorRed}
              color={ColorWhite}
              py="14px"
              px="67px"
              bgColor={ColorRed}
              fontSize="15px"
              onClick={() => onSubmitMemo()}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default CancelInfo;
