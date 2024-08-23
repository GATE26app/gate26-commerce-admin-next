import Image from 'next/image';
import { useState } from 'react';

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
  ColorWhite,
} from '@/utils/_Palette';

import ModalOrderInfo from './ModalOrderInfo';
import RadioComponent from '../CustomRadioButton/RadioComponent';
import InputBox from '../Input';
import { intComma } from '@/utils/format';

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
}
interface Props extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  info?: InfoProps;
  onSubmit: (text: string) => void;
}
function CancelApprovalModal({ onClose, onSubmit, info, ...props }: Props) {
  const toast = useToast();
  const [cancelFaultType, setCancelFaultType] = useState(0); //1=>구매자, 2=>판매자, 3=>운영자
  const [cancelAmount, setCancelAmount] = useState(0);
  const [data, setData] = useState({
    orderCancelRequestDetail: '',
  });

  console.log('**info', info);
  const handleClickOK = () => {
    onSubmit(data.orderCancelRequestDetail);
    if (data.orderCancelRequestDetail == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'사유를 작성해주세요.'}
          </Box>
        ),
      });
    } else {
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
          {info?.orderType !== 1 && (
            <>
              <Flex flexDirection={'row'} alignItems={'center'} mb={'25px'}>
                <Text
                  fontSize={'16px'}
                  color={ColorBlack}
                  fontWeight={600}
                  w={'150px'}
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
              <Flex flexDirection={'row'} alignItems={'center'} mb={'25px'}>
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
              </Flex>
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
            placeholder="취소 사유 입력"
            _placeholder={{ color: ColorGray700 }}
            color={ColorBlack}
            borderColor={ColorGrayBorder}
            onChange={(e) => {
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
              취소요청승인
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
            text="저장"
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
