import { useEffect, useState } from 'react';

import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useToast,
  Box
} from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';

import styled from '@emotion/styled';
import {
  ColorBlack,
  ColorGray50,
  ColorGray900,
  ColorWhite,
} from '@/utils/_Palette';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import UnSettleDataTable from '@/components/Settlement/Detail/Modal/UnSettleDataTable';
import { intComma } from '@/utils/format';
import { useGetUnSettleListMutation } from '@/app/apis/settlement/SettlementApi.mutation';
import { SettleDetailItemType, SettleUnListResType } from '@/app/apis/settlement/SettlementApi.type';
import Pagination from '../Pagination/Pagination';

interface SettlementModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  partner: SettleDetailItemType,
}
function SettlementModal({
  onClose,
  partner,
  // onSubmit,
  ...props
}: SettlementModalProps) {
  const toast = useToast();
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [list, setList] = useState<SettleUnListResType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [request, setRequest] = useState<any>({
    pageNo: 0,
    pageSize: 10,
    partnerId: '',
  });

  const { mutate: UnListMutate, isLoading: isLoadingUnList} = useGetUnSettleListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        console.log(res.data);
        // setGoodsInfo({
        //   settlementState: false,
        // });
      },
    },
  });

  useEffect(() => {
    UnListMutate({
      ...request,
      partnerId: partner.partner.partnerId
    });
  }, [props.isOpen]);

  useEffect(() => {
    UnListMutate({
      ...request,
      partnerId: partner.partner.partnerId
    });
  }, [request]);

  // const [data, setData] = useState<UnSettlementListResType>();
  // const data = {
  //   totalCount: 1,
  //   data: [
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //     {
  //       name: 'test',
  //     },
  //   ],
  // };

  const paginationProps = {
    currentPage: request.pageNo,
    limit: request.pageSize,
    total: list?.totalCount,
    onPageNumberClicked: (page: number) => handleChangeInput('page', page),
    onPreviousPageClicked: (page: number) => handleChangeInput('page', page),
    onNextPageClicked: (page: number) => handleChangeInput('page', page),
  };
  console.log(paginationProps, 'paginationProps');

  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };

    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      newRequest.pageNo = Number(value);
    }

    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }

    setGoodsInfo({
      unSettlementState: true,
    });
    setRequest(newRequest);
  }

  return (
    <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
      <ModalOverlay />
      <Content maxW={1132} h={760} overflowX={'auto'}>
        <Header>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={'17px'}
            mt={'30px'}
          >
            <Text fontWeight={600} fontSize={'18px'} color={ColorBlack}>
              미확정 내역
            </Text>
            <Image
              src={'/images/Page/ico_modal_close.png'}
              width={'20px'}
              height={'20px'}
              alt="모달 close"
              onClick={onClose}
            />
          </Flex>
        </Header>
        <ModalBody>
          {list && (
            <Flex gap={'10px'} alignItems={'center'} justifyContent={'space-between'}>
            <Flex
              bgColor={ColorGray50}
              px={'20px'}
              py={'11px'}
              borderRadius={'5px'}
              mb={'20px'}
              flexDirection={'column'}
              w={'20%'}
              minH={'94px'}
            >
              <Text
                fontWeight={400}
                fontSize={'16px'}
                color={ColorBlack}
                w={'110px'}
              >
                주문금액
              </Text>
              <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
                {/* orderAmount */}
                {intComma(list.orderAmount)}원
              </Text>
            </Flex>
            <Flex
              bgColor={ColorGray50}
              px={'20px'}
              py={'11px'}
              borderRadius={'5px'}
              mb={'20px'}
              flexDirection={'column'}
              w={'20%'}
              minH={'94px'}
            >
              <Text
                fontWeight={400}
                fontSize={'16px'}
                color={ColorBlack}
                w={'110px'}
              >
                결제금액
              </Text>
              <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
                {intComma(list.paymentAmount)}원
                {/* paymentAmount */}
              </Text>
            </Flex>
            <Flex
              bgColor={ColorGray50}
              px={'20px'}
              py={'11px'}
              borderRadius={'5px'}
              mb={'20px'}
              flexDirection={'column'}
              w={'20%'}
              minH={'94px'}
            >
              <Text
                fontWeight={400}
                fontSize={'16px'}
                color={ColorBlack}
                w={'110px'}
              >
                결제수수료/서비스수수료
              </Text>
              <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
              {`${intComma(list.paymentChargeAmount)}원 / ${intComma(list.serviceChargeAmount)}원`}
              </Text>
            </Flex>
            <Flex
              bgColor={ColorGray50}
              px={'20px'}
              py={'11px'}
              borderRadius={'5px'}
              mb={'20px'}
              flexDirection={'column'}
              w={'20%'}
              minH={'94px'}
            >
              <Text
                fontWeight={400}
                fontSize={'16px'}
                color={ColorBlack}
                w={'110px'}
              >
                할인부담금/할인부담금(본사)
              </Text>
              <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
                {/* discountChargeAmount/ discountSettlementAmount */}
                {`${intComma(list.discountChargeAmount)}원 / ${intComma(list.discountSettlementAmount)}원`}
              </Text>
            </Flex>
            <Flex
              bgColor={ColorGray50}
              px={'20px'}
              py={'11px'}
              borderRadius={'5px'}
              mb={'20px'}
              flexDirection={'column'}
              w={'20%'}
              minH={'94px'}
            >
              <Text
                fontWeight={400}
                fontSize={'16px'}
                color={ColorBlack}
                w={'110px'}
              >
                미확정 정산금액
              </Text>
              <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
                {intComma(list.settlementAmount)}원
                {/* settlementAmount */}
              </Text>
            </Flex>
            </Flex>
          )}
          {/* 미정산 리스트 */}
          <UnSettleDataTable data={list} />
        </ModalBody>
        <Flex
          pb={'20px'}
          // pt={'20px'}
          position={'sticky'}
          bottom={0}
          justifyContent={'center'}
          backgroundColor={ColorWhite}
        >
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
                  // setOnSubmit={setOnSubmit}
                />
              </Flex>
            )}
        </Flex>
      </Content>
    </Modal>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 0px 30px 0px;
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
      &__body {
        /* padding: 10px 20px 20px 20px; */
        /* text-align: center; */
        /* white-space: break-spaces; */
        /* color: #757983; */

        /* font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 27px;
    letter-spacing: -0.02em; */
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
const Header = styled(ModalHeader)`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 99;
  /* padding-top: 30px; */
  /* height: 95px; */
`;

export default SettlementModal;
