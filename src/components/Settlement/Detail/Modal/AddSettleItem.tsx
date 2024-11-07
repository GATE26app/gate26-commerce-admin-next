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
import { useQueryClient } from 'react-query';
import styled from '@emotion/styled';
import {
  ColorBlack,
  ColorGray700,
  ColorGray900,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import InputBox from '@/components/common/Input';
import { intComma } from '@/utils/format';
import SelectBox from '@/components/common/SelectBox';
import { usePostAddEctMutation } from '@/app/apis/settlement/SettlementApi.mutation';
import { useSearchParams } from '../../../../../node_modules/next/navigation';
import LoadingModal from '@/components/common/Modal/LoadingModal';

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
  siteOrigin?: string;
}

interface SettlementModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
}
function AddSettleItem({
  onClose,
  // onSubmit,
  ...props
}: SettlementModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const getSettleId = searchParams.get('getSettleId');
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string | any>();
  const [type, setType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ClickAddSettle = async () => {
    setIsLoading(true);
    if(name == ''){
        toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'정산 내용을 입력해주세요.'}
              </Box>
            ),
          });
          setIsLoading(false);
    } else if(type == ''){
        toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'정산 유형을 선택해주세요.'}
              </Box>
            ),
          });
          setIsLoading(false);
    } else if(price == ''){
        toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'정산 금액을 입력해주세요.'}
              </Box>
            ),
          });
          setIsLoading(false);
    } else {
        let isPrice:number = price;
        if(type == '차감(-)'){
            isPrice = -Math.abs(isPrice);
        }
        OrderCancelFeeMutate({
            settlementId: Number(getSettleId),
            amount: isPrice,
            title: name,
        });
    }
  };

  //주문 취소 수수료
    const { mutate: OrderCancelFeeMutate, isLoading: isConfrimLoading } =
      usePostAddEctMutation({
        options: {
          onSuccess: (res, req) => {
            console.log(res);
            if (res.success) {
                toast({
                    position: 'top',
                    duration: 2000,
                    render: () => (
                      <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                        {'정산 항목이 추가되었습니다.'}
                      </Box>
                    ),
                  });
                onClose();
              setIsLoading(false);
              queryClient.refetchQueries(`settleItem`);
            } else {
                toast({
                    position: 'top',
                    duration: 2000,
                    render: () => (
                        <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                        {'정산 항목 추가에 실패했습니다.'}
                        </Box>
                    ),
                });
                setIsLoading(false);
            }
          },
        },
      });

  const renderContent = () => {
    return (
      <Flex flexDirection={'column'}>
        <Flex mt={'25px'} flexDirection={'column'} pb={'25px'}>
          <Flex flexDirection={'row'} alignItems={'center'} mb={'25px'}>
            <Text
              fontSize={'16px'}
              color={ColorBlack}
              fontWeight={600}
              w={'180px'}
            >
              정산 내용
            </Text>
            <InputBox
              w={'50%'}
              placeholder="정산 내용 입력"
              type="text"
              //   maxLength={15}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Flex>
          <Flex flexDirection={'row'} alignItems={'center'} mb={'25px'}>
            <Text
              fontSize={'16px'}
              color={ColorBlack}
              fontWeight={600}
              w={'180px'}
            >
              정산 유형
            </Text>
            <SelectBox
                placeholder="추가/차감 선택"
                width={'244px'}
                list={['추가(+)', '차감(-)']}
                select={type}
                setSelect={setType}
                // onClick={(data: string) =>
                //     setType(data);
                // }
              />
          </Flex>
          <Flex flexDirection={'row'} alignItems={'center'} mb={'25px'}>
            <Text
              fontSize={'16px'}
              color={ColorBlack}
              fontWeight={600}
              w={'180px'}
            >
              정산 금액
            </Text>
            <InputBox
              w={'50%'}
              placeholder="숫자로만 입력"
              type="text"
              maxLength={9}
              value={intComma(price)}
              onChange={(e: any) =>
                setPrice(Number(e.target.value.replace(/[^0-9]/g, '')))
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
        </Flex>
      </Flex>
    );
  };
  return (
    <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
      <ModalOverlay />
      <LoadingModal
        children={isLoading}
        isOpen={isLoading}
        onClose={() => !isLoading}
      />
      <Content maxW={536}>
        <Header>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={'17px'}
          >
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              항목 추가
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
          {/* {info && <ModalOrderInfo info={info} />} */}
          {renderContent()}
        </ModalBody>
        <Flex mx={'30px'} flexDirection={'column'}>
          <CustomButton
            text={'추가하기'}
            bgColor={ColorGray900}
            borderColor={ColorGray900}
            fontSize="16px"
            color={ColorWhite}
            py="15px"
            fontWeight={700}
            onClick={ClickAddSettle}
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
export default AddSettleItem;
