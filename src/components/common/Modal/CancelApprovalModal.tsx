import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';

import styled from '@emotion/styled';
import {
  ColorBlack,
  ColorGray700,
  ColorGray900,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import ModalOrderInfo from './ModalOrderInfo';
import RadioComponent from '../CustomRadioButton/RadioComponent';
import InputBox from '../Input';
import {
  formatDateDash,
  formatDateMinTimeDash,
  intComma,
} from '@/utils/format';
import {
  usePostOrderCancelMutation,
  usePutOrderCancelMutation,
} from '@/app/apis/order/OrderApi.mutation';
import {
  CancelFeeType,
  OrderCancelParamsType,
} from '@/app/apis/order/OrderApi.type';
import DatePicker from '../DatePicker';
import dayjs from 'dayjs';
import ToastComponent from '../Toast/ToastComponent';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { usePosteDecideMeetingMemberMutation } from '@/app/apis/rest/RestApi.mutation';

interface InfoProps {
  orderType: number;
  orderId: string;
  orderThumbnailImagePath: string;
  orderCategoryTitle: string;
  orderCnt: number;
  orderOptionTitle: string;
  discountAmount: number;
  orderAmount: number;
  orderTitle: string;
  shippingCompany: string;
  shippingInvoice: string;
  shippingMemo: string;
  paymentAmount: number;
  orderDateTimeOfUse: string;
  cancelRequestDate: string;
  meetingId?: string;
  cancelFaultId?: string;
}

interface Props extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  info?: InfoProps;
  onSubmit: (text: string) => void;
}
function CancelApprovalModal({ onClose, onSubmit, info, ...props }: Props) {
  const toast = useToast();
  const [cancelFaultType, setCancelFaultType] = useState(0); //1=>구매자, 2=>판매자, 3=>운영자
  const [cancelAmount, setCancelAmount] = useState(
    info?.orderAmount ? info?.orderAmount : 0,
  );
  const [cancelReason, setCancelReason] = useState('');
  const [data, setData] = useState({
    orderCancelRequestDetail: '',
  });
  const [cancelFee, setCancelFee] = useState<CancelFeeType>();
  const [openDay, setOpenDay] = useState<dayjs.Dayjs>(() =>
    dayjs(info?.cancelRequestDate ? info?.cancelRequestDate : ''),
  );
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);

  //주문 취소 수수료
  const { mutate: OrderCancelFeeMutate, isLoading: isConfrimLoading } =
    usePostOrderCancelMutation({
      options: {
        onSuccess: (res, req) => {
          if (res.success) {
            if (res.data) {
              setCancelFee(res.data);
              setCancelAmount(res.data?.atSpecificDate?.cancelAmount);
            } else {
              // setCancelFee();
            }

            // setIsLoading(false);
          } else {
          }
        },
      },
    });
  useEffect(() => {
    if (cancelFaultType !== 0) {
      if (openDay.format('YYYY-MM-DD HH:mm:ss') !== 'Invalid Date') {
        let obj = {
          orderId: info?.orderId,
          body: {
            cancelFaultType: cancelFaultType,
            specificDate: formatDateMinTimeDash(openDay) + ':00',
          },
        };
        OrderCancelFeeMutate(obj);
      } else {
        let obj = {
          orderId: info?.orderId,
          body: {
            cancelFaultType: cancelFaultType,
          },
        };
        OrderCancelFeeMutate(obj);
      }
    }
  }, [cancelFaultType, openDay]);

  //주문 취소
  const { mutate: CancelMutate, isLoading: isCancelLoading } =
    usePutOrderCancelMutation({
      options: {
        onSuccess: (res, req) => {
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
                  {`주문 취소가 되었습니다.`}
                </Box>
              ),
            });
            // if (info?.orderType === 4) {
            //   const body = {
            //     userId: info?.cancelFaultId,
            //     meetingId: info?.meetingId,
            //   };
            //   memberDecideMutate(body);
            // }
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

  const { mutate: memberDecideMutate } = usePosteDecideMeetingMemberMutation({
    options: {
      onSuccess: (res) => {
        if (res.success === true) {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {`살롱 퇴장 완료 되었습니다. `}
              </Box>
            ),
          });
        }
      },
      onError: () => {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {`살롱 퇴장 실패 되었습니다. `}
            </Box>
          ),
        });
      },
    },
  });

  const handleClickOK = () => {
    // onSubmit(data.orderCancelRequestDetail);
    if (cancelFaultType == 0) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'취소 귀책자를 선택해주세요.'}
          </Box>
        ),
      });
    } else if (cancelReason == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'사유를 작성해주세요.'}
          </Box>
        ),
      });
    } else if (info?.orderType !== 1 && cancelAmount == 0) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'취소금액을 입력해주세요.'}
          </Box>
        ),
      });
    } else {
      if (info?.orderType == 1) {
        // 전체취소
        let obj: OrderCancelParamsType = {
          orderId: info?.orderId,
          body: {
            cancelFaultType: cancelFaultType,
            cancelReason: cancelReason,
          },
        };
        CancelMutate(obj);
      } else {
        let obj: OrderCancelParamsType = {
          orderId: info?.orderId !== undefined ? info?.orderId : '',
          body: {
            cancelFaultType: cancelFaultType,
            cancelReason: cancelReason,
            cancelAmount: cancelAmount,
          },
        };

        // if (info?.orderType === 4) {
        //   alert('살롱');
        //   const body = {
        //     userId: info?.cancelFaultId,
        //     meetingId: info?.meetingId,
        //   };
        //   console.log(body);
        //   memberDecideMutate(body);
        // }
        CancelMutate(obj);
      }
      // setOrderStateInfo({
      //   orderCancelRequestDetail: data.orderCancelRequestDetail,
      // });
      onClose();
    }
  };

  const renderContent = () => {
    return (
      <Flex flexDirection={'column'}>
        <Flex mt={'25px'} flexDirection={'column'} pb={'25px'}>
          <Text
            fontSize={'16px'}
            color={ColorBlack}
            fontWeight={600}
            mb={'5px'}
          >
            취소 귀책자
          </Text>
          <Flex gap={'20px'} mb={'20px'}>
            <RadioComponent
              text="구매자"
              checked={cancelFaultType == 1 ? true : false}
              onClick={() => {
                setCancelFaultType(1);
              }}
            />
            <RadioComponent
              text="판매자"
              checked={cancelFaultType == 2 ? true : false}
              onClick={() => {
                setCancelFaultType(2);
              }}
            />
            <RadioComponent
              text="운영자"
              checked={cancelFaultType == 3 ? true : false}
              onClick={() => {
                setCancelFaultType(3);
              }}
            />
          </Flex>
          <Flex mb={'20px'} alignItems={'center'}>
            <Text
              fontSize={'16px'}
              color={ColorBlack}
              fontWeight={600}
              w={'180px'}
            >
              취소요청일(취소기준일자)
            </Text>
            <DatePicker
              type={'datetime'}
              curDate={openDay}
              width={'50%'}
              onApply={(date) => {
                setOpenDay(date);
                console.log(date);
              }}
            />
          </Flex>
          {cancelFee?.atSpecificDate && (
            <Flex flexDirection={'row'} wrap={'wrap'} mb={'10px'}>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={600}
                mr={'5px'}
              >
                [{cancelFee?.cancelFaultTypeName}]
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={400}
                mr={'5px'}
              >
                귀책으로 인한
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={600}
                mr={'5px'}
              >
                [{cancelFee?.atSpecificDate?.cancelBaseDate}
                (취소요청일시)]
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={400}
                mr={'5px'}
              >
                기준 환불수수료는
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorRed}
                fontWeight={600}
                mr={'5px'}
              >
                [{intComma(cancelFee?.atSpecificDate?.cancelFee)}원(
                {cancelFee?.atSpecificDate?.cancelFeePer}%)]
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={400}
                mr={'5px'}
              >
                이며 취소예상금액은
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorRed}
                fontWeight={600}
                mr={'5px'}
              >
                [{intComma(cancelFee?.atSpecificDate?.cancelAmount)}원]
              </Text>
              <Text fontSize={'15px'} color={ColorBlack} fontWeight={400}>
                입니다.
              </Text>
            </Flex>
          )}
          {cancelFee?.atNow && (
            <Flex flexDirection={'row'} wrap={'wrap'} mb={'10px'}>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={600}
                mr={'5px'}
              >
                [{cancelFee?.cancelFaultTypeName}]
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={400}
                mr={'5px'}
              >
                귀책으로 인한
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={600}
                mr={'5px'}
              >
                [{cancelFee?.atNow?.cancelBaseDate}
                (현재시간)]
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={400}
                mr={'5px'}
              >
                기준 환불수수료는
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={600}
                mr={'5px'}
              >
                [{intComma(cancelFee?.atNow?.cancelFee)}원(
                {cancelFee?.atNow?.cancelFeePer}%)]
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={400}
                mr={'5px'}
              >
                이며 취소예상금액은
              </Text>
              <Text
                fontSize={'15px'}
                color={ColorBlack}
                fontWeight={600}
                mr={'5px'}
              >
                [{intComma(cancelFee?.atNow?.cancelAmount)}원]
              </Text>
              <Text fontSize={'15px'} color={ColorBlack} fontWeight={400}>
                입니다.
              </Text>
            </Flex>
          )}
          {info?.orderType !== 1 && (
            <>
              <Flex flexDirection={'row'} alignItems={'center'} mb={'25px'}>
                <Text
                  fontSize={'16px'}
                  color={ColorBlack}
                  fontWeight={600}
                  w={'180px'}
                >
                  상품 결제금액
                </Text>
                <InputBox
                  w={'50%'}
                  placeholder="숫자로만 입력"
                  type="text"
                  maxLength={15}
                  value={
                    info?.paymentAmount == 0
                      ? ''
                      : intComma(info?.paymentAmount)
                  }
                  disable={false}
                />
                <Text
                  fontSize={'16px'}
                  color={ColorBlack}
                  fontWeight={600}
                  ml={'10px'}
                >
                  원
                </Text>
              </Flex>
              <Flex flexDirection={'row'} alignItems={'center'} mb={'25px'}>
                <Text
                  fontSize={'16px'}
                  color={ColorBlack}
                  fontWeight={600}
                  w={'180px'}
                >
                  취소할(환불)금액
                </Text>
                <InputBox
                  w={'50%'}
                  placeholder="숫자로만 입력"
                  type="text"
                  maxLength={15}
                  value={cancelAmount == 0 ? '' : intComma(cancelAmount)}
                  onChange={(e: any) =>
                    setCancelAmount(
                      Number(e.target.value.replace(/[^0-9]/g, '')),
                    )
                  }
                />
                <Text
                  fontSize={'16px'}
                  color={ColorBlack}
                  fontWeight={600}
                  ml={'10px'}
                >
                  원
                </Text>
              </Flex>
              {/* <Flex flexDirection={'row'} alignItems={'center'} mb={'25px'}>
                <Text
                  fontSize={'16px'}
                  color={ColorBlack}
                  fontWeight={600}
                  w={'150px'}
                >
                  기취소금액
                </Text>
                <InputBox
                  w={'50%'}
                  placeholder="숫자로만 입력"
                  type="text"
                  maxLength={15}
                  value={cancelAmount == 0 ? '' : intComma(cancelAmount)}
                  onChange={(e: any) =>
                    setCancelAmount(
                      Number(e.target.value.replace(/[^0-9]/g, '')),
                    )
                  }
                />
                <Text
                  fontSize={'16px'}
                  color={ColorBlack}
                  fontWeight={600}
                  ml={'10px'}
                >
                  원
                </Text>
              </Flex> */}
            </>
          )}

          <Text
            fontSize={'16px'}
            color={ColorBlack}
            fontWeight={600}
            mb={'5px'}
          >
            취소
          </Text>
          <Textarea
            value={cancelReason}
            placeholder="취소 사유 입력"
            _placeholder={{ color: ColorGray700 }}
            color={ColorBlack}
            borderColor={ColorGrayBorder}
            onChange={(e) => {
              setCancelReason(e.target.value);
              // setOrderStateInfo({
              //   orderCancelRequestDetail: e.target.value,
              // });
              // setData({ ...data, orderCancelRequestDetail: e.target.value });
            }}
            maxLength={500}
            height={'96px'}
            borderRadius={'10px'}
          />
        </Flex>
        {info?.orderType == 1 && (
          <Text fontSize={'15px'} color={ColorRed} fontWeight={400} mb={'10px'}>
            * 해당 상품은 판매자 직배송 상품으로, 취소 시 함께 주문한 동일한
            판매자의 배송 상품도 일괄 취소 처리됩니다.
          </Text>
        )}
      </Flex>
    );
  };
  return (
    <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
      <ModalOverlay />
      <Content maxW={536}>
        <Header>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={'17px'}
          >
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              취소
            </Text>
            <Image
              src={'/images/Page/ico_modal_close.png'}
              width={20}
              height={20}
              alt="모달 close"
              onClick={onClose}
            />
          </Flex>
        </Header>

        <ModalBody>
          {info && <ModalOrderInfo info={info} />}
          {renderContent()}
        </ModalBody>
        <Flex mx={'30px'} flexDirection={'column'}>
          <CustomButton
            text="취소하기"
            bgColor={ColorGray900}
            borderColor={ColorGray900}
            fontSize="16px"
            color={ColorWhite}
            py="15px"
            fontWeight={700}
            onClick={handleClickOK}
          />
        </Flex>
      </Content>
    </Modal>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 30px 0px;
    border-radius: 10px;
    .chakra-modal {
      &__header {
        padding: 0px 30px;
        text-align: center;
        /* color: #ff5942; */
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        letter-spacing: -0.02em;
      }

      &__footer {
        padding: 0;
        display: flex;
        background-color: '#292A2E';
        /* justify-content: space-between; */
        .button {
          cursor: pointer;

          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: '10px';
          color: #292a2e;
          border: 1px solid '#292A2E';
          font-family: 'Pretendard';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 27px;
          letter-spacing: -0.02em;
        }
      }
    }
  }
`;
const Header = styled(ModalHeader)``;
export default CancelApprovalModal;
