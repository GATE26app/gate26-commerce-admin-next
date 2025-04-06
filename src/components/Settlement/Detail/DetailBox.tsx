import CustomButton from '@/components/common/CustomButton';
import DatePicker from '@/components/common/DatePicker';
import InputBox from '@/components/common/Input';
import SettlementModal from '@/components/common/Modal/SettlementModal';
import SelectBox from '@/components/common/SelectBox';
import { useQueryClient } from 'react-query';
import {
  COlorBlueSucces,
  ColorBlack,
  ColorBlue,
  ColorGray50,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { formatDated, intComma } from '@/utils/format';
import { Box, Flex, Text, Textarea, useToast } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  SettleDetailDtoType,
  SettleDetailItemType,
} from '@/app/apis/settlement/SettlementApi.type';
import { useGetUnSettleListMutation, usePostSettleCompleteMutation, usePutSettleMemoMutation } from '@/app/apis/settlement/SettlementApi.mutation';
import { useSearchParams } from '../../../../node_modules/next/navigation';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import { crypto } from '@/utils/crypto';

interface Props {
  data: SettleDetailItemType;
}
function DetailBox({ data }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const selectList = ['미정산', '정산완료'];
  const [memo, setMemo] = useState<string | null>('');
  const [select, setSelect] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const getSettleId = searchParams.get('getSettleId');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });

  useEffect(() => {
    if (data) {
      setSelect(data.statusName);
      setMemo(data.adminMemo);
    }
  }, [data]);

  const onSubmitMemo = () => {
    const obj = {
      settlementId: String(getSettleId),
      body: {
        adminMemo: memo,
      },
    };
    InputMemoMutate(obj);
  };

  const { mutate: InputMemoMutate, isLoading: isLoadingMemo } =
    usePutSettleMemoMutation({
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
            setIsLoading(false);
            queryClient.refetchQueries(`settleItem`);
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
            setIsLoading(false);
          }
        },
      },
    });

    const { mutate: InputCompeleteMutate, isLoading: isLoadingCom } =
    usePostSettleCompleteMutation({
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
                  {'정산이 완료되었습니다'}
                </Box>
              ),
            });
            setIsLoading(false);
            queryClient.refetchQueries(`settleItem`);
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
            setIsLoading(false);
          }
        },
      },
    });

  return (
    <>
      {openModal && (
        <SettlementModal
          isOpen={openModal}
          partner={data}
          onClose={() => setOpenModal(false)}
        />
      )}
      <LoadingModal
        children={isLoading}
        isOpen={isLoading}
        onClose={() => !isLoading}
      />
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      <Flex
        bgColor={ColorGray50}
        p={'40px'}
        borderRadius={'12px'}
        flexDirection={'column'}
      >
        <Flex w={'100%'} pb={'30px'} alignItems={'center'}>
          <Flex w={'50%'}>
            <Text
              fontWeight={600}
              color={ColorBlack}
              fontSize={'15px'}
              w={'150px'}
            >
              파트너사
            </Text>
            <Flex flexDirection={'row'} gap={'5px'}>
              <Text fontWeight={600} fontSize={'15px'} color={ColorBlack}>
                {data.partner.title}
              </Text>
              <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
                /
              </Text>
              <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
                {data.partner.businessRegistrationNumber
                  ? crypto.decrypt(data.partner.businessRegistrationNumber)
                  : '-'}
              </Text>
            </Flex>
          </Flex>
          {data.status == 0 && (
            <Flex w={'50%'} alignItems={'center'}>
            <Text
              fontWeight={600}
              color={ColorBlack}
              fontSize={'15px'}
              w={'150px'}
            >
              정산미확정
            </Text>
            <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
              {/* <Text fontWeight={600} fontSize={'15px'} color={ColorBlack}>
              {intComma(data.settlementAmount)}원
            </Text> */}
              <Box
                borderRadius={'6px'}
                borderWidth={1}
                borderColor={ColorInputBorder}
                px={'8px'}
                py={'4px'}
                bgColor={ColorWhite}
                cursor={'pointer'}
                onClick={() => setOpenModal(true)}
              >
                <Text
                  fontSize={'12px'}
                  fontWeight={400}
                  color={ColorGray700}
                  textAlign={'center'}
                >
                  조회하기
                </Text>
              </Box>
            </Flex>
          </Flex>
          )}
        </Flex>
        <hr />
        <Flex w={'100%'} pb={'30px'} mt={'30px'}>
          <Flex w={'50%'}>
            <Text
              fontWeight={600}
              color={ColorBlack}
              fontSize={'15px'}
              w={'150px'}
            >
              정산번호
            </Text>
            <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
              {data.settlementNumber}
            </Text>
          </Flex>
          <Flex w={'50%'}>
            <Text
              fontWeight={600}
              color={ColorBlack}
              fontSize={'15px'}
              w={'150px'}
            >
              정산계좌정보
            </Text>
            <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
              {/* 신한은행 012345678901 (계좌주) */}
              {data.bank != null
                ? `${crypto.decrypt(data.bank)} ${crypto.decrypt(data.accountNumber)} (${crypto.decrypt(data.accountHolder)})`
                : '-'}
            </Text>
          </Flex>
        </Flex>
        <Flex w={'100%'} pb={'30px'} alignItems={'center'}>
          <Flex w={'50%'} alignItems={'center'}>
            <Text
              fontWeight={600}
              color={ColorBlack}
              fontSize={'15px'}
              w={'150px'}
            >
              정산기준일
            </Text>
            <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
              <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
                {formatDated(dayjs(data.fromDate)) == 'Invalid Date'
                  ? '-'
                  : formatDated(dayjs(data.fromDate))}
              </Text>
              <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
                {formatDated(dayjs(data.toDate)) == 'Invalid Date'
                  ? '-'
                  : formatDated(dayjs(data.toDate))}
              </Text>
            </Text>
          </Flex>
          {/*  정산완료일 때 노출 되게 */}
          <Flex w={'50%'} alignItems={'center'}>
            <Text
              fontWeight={600}
              color={ColorBlack}
              fontSize={'15px'}
              w={'150px'}
            >
              정산완료일
            </Text>
            <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
              {formatDated(dayjs(data.settlementDate)) == 'Invalid Date'
                ? '-'
                : formatDated(dayjs(data.settlementDate))}
            </Text>
            {/* <DatePicker
              type={'date'}
              curDate={startDay}
              width={'235px'}
              onApply={(date) => {
                setStartDay(date);
                setSState(true);
              }}
            /> */}
          </Flex>
        </Flex>
        <Flex w={'100%'} pb={'30px'} alignItems={'center'}>
          <Flex w={'50%'} alignItems={'center'}>
            <Text
              fontWeight={600}
              color={ColorBlack}
              fontSize={'15px'}
              w={'150px'}
            >
              정산상태
            </Text>
            {data.status == 0 ? <SelectBox
              placeholder="상태값 변경처리"
              width={'168px'}
              list={selectList}
              select={select}
              setSelect={(e) => {
                if(e === '정산완료'){
                  setOpenAlertModal(true);
                  setModalState({
                    ...ModalState,
                    title: '정산완료',
                    message: `정산을 완료 처리하시겠습니까?`,
                    type: 'confirm',
                    okButtonName: '확인',
                    cbOk: () => {
                      if(data.partner.bank == null || data.partner.accountNumber == null || data.partner.accountHolder == null){
                        console.log(data.partner.bank, data.partner.accountNumber, data.partner.accountHolder);
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
                              {'은행 정보가 없습니다.'}
                            </Box>
                          ),
                        });
                      } else {
                        InputCompeleteMutate({
                          settlementId: Number(getSettleId),
                        });
                        setIsLoading(true);
                      }
                    },
                  });
                  
                }
                // setSelect
              }}
            /> : <Text>정산완료</Text>}
          </Flex>
          <Flex alignItems={'center'}>
            <Text
              fontWeight={600}
              color={ColorBlack}
              fontSize={'15px'}
              w={'150px'}
            >
              {/* 미정산 -> 정산 예정 금액, 정산완료 -> 정산 금액 */}
              {data.status == 0 ? '정산 예정 금액' : '정산 금액'}
            </Text>
            <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
              <Text fontWeight={600} fontSize={'15px'} color={ColorBlack}>
                {intComma(data.settlementAmount)}원
              </Text>
              {/* <Box
              borderRadius={'6px'}
              borderWidth={1}
              borderColor={ColorInputBorder}
              px={'8px'}
              py={'4px'}
              bgColor={ColorWhite}
              cursor={'pointer'}
              onClick={() => setOpenModal(true)}
            >
              <Text
                fontSize={'12px'}
                fontWeight={400}
                color={ColorGray700}
                textAlign={'center'}
              >
                상세보기
              </Text>
            </Box> */}
            </Flex>
          </Flex>
        </Flex>
        <hr />
        <Flex pt={'40px'} pb={'20px'}>
          <Text
            fontWeight={600}
            color={ColorBlack}
            fontSize={'15px'}
            w={'150px'}
          >
            관리자메모
          </Text>
          <Textarea
            value={memo}
            placeholder="내용을 입력해주세요."
            _placeholder={{ color: ColorGray700 }}
            color={ColorBlack}
            borderColor={ColorGrayBorder}
            onChange={(e) => {
              setMemo(e.target.value);
              console.log(e.target.value);
            }}
            maxLength={500}
            height={'96px'}
            borderRadius={'10px'}
            bgColor={ColorWhite}
          />
        </Flex>
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
            onClick={() => {
              onSubmitMemo();
              setIsLoading(true);
            }}
          />
          {/* </Flex> */}
        </Flex>
      </Flex>
    </>
  );
}

export default DetailBox;
