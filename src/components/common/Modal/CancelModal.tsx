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

import { useOrderStateZuInfo } from '@/_store/OrderStateInfo';

interface InfoProps {
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
  type: string;
  onClose: () => void;
  title: string;
  info?: InfoProps;
  onSubmit: (text: string) => void;
}
function CancelModal({
  type,
  onClose,
  onSubmit,
  title,
  info,
  ...props
}: Props) {
  const toast = useToast();
  const { orderStateInfo, setOrderStateInfo } = useOrderStateZuInfo(
    (state) => state,
  );

  const [data, setData] = useState({
    orderCancelRequestDetail: '',
  });
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
      setOrderStateInfo({
        orderCancelRequestDetail: data.orderCancelRequestDetail,
      });
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
            취소 사유
          </Text>
          <Textarea
            placeholder="취소 사유 입력"
            _placeholder={{ color: ColorGray700 }}
            color={ColorBlack}
            borderColor={ColorGrayBorder}
            onChange={(e) => {
              setOrderStateInfo({
                orderCancelRequestDetail: e.target.value,
              });
              setData({ ...data, orderCancelRequestDetail: e.target.value });
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
            <Text>{title}</Text>
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
export default CancelModal;
