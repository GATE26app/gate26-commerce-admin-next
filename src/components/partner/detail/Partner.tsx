import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import goodsApi from '@/app/apis/goods/GoodsApi';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import RadioComponent from '@/components/common/RadioBox/RadioComponent';
import moment from 'moment';
import {
  ColorBlack,
  ColorGray50,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  DeniedPartnerType,
  PartnersParamsType,
} from '@/app/apis/partners/PartnersApi.type';
import {
  useApprovePartner,
  useRejectPartner,
} from '@/app/apis/partners/PartnersApi.mutation';

interface Props {
  itemCode: string;
  itemId: string;
  info: PartnersParamsType;
}
function Partner({ itemCode, itemId, info }: Props) {
  const toast = useToast();
  const router = useRouter();
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [isCheck, setIsCheck] = useState(1);
  const [deniedReason, setDeniedReason] = useState('');
  const [isLoadingModal, setLoadingModal] = useState(false);
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
    if (info?.level) {
      setIsCheck(info?.level);
    }
    if (info?.deniedReason) {
      setDeniedReason(info?.deniedReason);
    }
  }, [info]);

  // console.log
  //파트너사 승인
  const { mutate: ApproveMutate } = useApprovePartner({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          // setLogDisable(true);'
          // <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
          //   {`${res.message}`}
          // </Box>;
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: `파트너사 승인`,
            message: `파트너사 승인되었습니다.`,
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              router.back();
              // DeniedMutate(obj);
              // window.history.back();
            },
          });
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {`${res.message}`}
              </Box>
            ),
          });
        }
      },
    },
  });
  //파트너사 반려
  const { mutate: DeniedMutate } = useRejectPartner({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: `파트너사 반려`,
            message: `파트너사 반려되었습니다.`,
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              router.back();
              // DeniedMutate(obj);
              // window.history.back();
            },
          });
          // setLogDisable(true);
          // <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
          //   {`${res.message}`}
          // </Box>;
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {`${res.message}`}
              </Box>
            ),
          });
        }
      },
    },
  });

  const handleSubmit = () => {
    if (isCheck == 1) {
      setOpenAlertModal(true);
      setModalState({
        ...ModalState,
        title: `파트너사 승인`,
        message: `파트너사 승인하시겠습니까?`,
        type: 'confirm',
        okButtonName: '확인',
        cbOk: () => {
          ApproveMutate(info.partnerId);
          // window.history.back();
        },
      });
    } else {
      if (deniedReason == '') {
        toast({
          position: 'top',
          duration: 1000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              반려 사유를 입력해주세요.
            </Box>
          ),
        });
      } else {
        const obj: DeniedPartnerType = {
          partnerId: info?.partnerId,
          deniedReason: deniedReason,
        };
        setOpenAlertModal(true);
        setModalState({
          ...ModalState,
          title: `파트너사 반려`,
          message: `파트너사 반려하시겠습니까?`,
          type: 'confirm',
          okButtonName: '확인',
          cbOk: () => {
            DeniedMutate(obj);
            // window.history.back();
          },
        });
      }
    }
  };

  return (
    <>
      {info && (
        <>
          <ButtonModal
            isOpen={isOpenAlertModal}
            ModalState={ModalState}
            onClose={() => setOpenAlertModal(false)}
          />

          <LoadingModal
            children={isLoadingModal}
            isOpen={isLoadingModal}
            onClose={() => setLoadingModal(false)}
          />
          <Flex
            w={'100%'}
            borderRadius={'12px'}
            bgColor={ColorGray50}
            p={'40px'}
            flexDirection={'column'}
          >
            <Flex flexDirection={'column'}>
              <Flex flexDirection={'row'}>
                <Text
                  w={'165px'}
                  flexShrink={0}
                  color={ColorBlack}
                  fontWeight={600}
                  fontSize={'18px'}
                >
                  상세내용
                </Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection={'column'}
              borderTopColor={ColorGrayBorder}
              pt={'10px'}
              mt={'10px'}
              borderTopWidth={1}
            >
              <Flex flexDirection={'row'} pb={'20px'}>
                <Text
                  w={'165px'}
                  flexShrink={0}
                  color={ColorBlack}
                  fontWeight={600}
                  fontSize={'15px'}
                >
                  승인요청일
                </Text>
                <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                  {info.requestDate
                    ? moment(info.requestDate).format('YYYY-MM-DD')
                    : '-'}
                </Text>
              </Flex>
              <Flex flexDirection={'row'} pb={'20px'}>
                <Text
                  w={'165px'}
                  flexShrink={0}
                  color={ColorBlack}
                  fontWeight={600}
                  fontSize={'15px'}
                >
                  {info?.level == 3 ? '반려완료일' : '승인완료일'}
                </Text>
                <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                  {info?.level == 3
                    ? info.deniedDate
                      ? moment(info.deniedDate).format('YYYY-MM-DD')
                      : '-'
                    : info.processDate
                    ? moment(info.processDate).format('YYYY-MM-DD')
                    : '-'}
                </Text>
              </Flex>
              <Flex flexDirection={'row'} pb={'20px'}>
                <Text
                  w={'165px'}
                  flexShrink={0}
                  color={ColorBlack}
                  fontWeight={600}
                  fontSize={'15px'}
                >
                  승인상태
                </Text>
                {info.level == 1 && <Text>승인</Text>}
                {info.level != 1 && (
                  <Flex flexDirection={'column'} w={'100%'}>
                    <Flex flexDirection={'row'} gap={'20px'}>
                      <RadioComponent
                        text="승인"
                        disabled={goodsInfo.LogItemDisable}
                        checked={isCheck == 1 ? true : false}
                        onClick={() => {
                          setIsCheck(1);
                        }}
                      />
                      <RadioComponent
                        text="반려"
                        disabled={goodsInfo.LogItemDisable}
                        checked={isCheck == 3 ? true : false}
                        onClick={() => {
                          setIsCheck(3);
                        }}
                      />
                    </Flex>
                    {isCheck == 3 && (
                      <InputBox
                        w={'100%'}
                        mt={'10px'}
                        value={deniedReason}
                        placeholder="반려 사유를 입력해주세요."
                        // value={list?.title}
                        onChange={(e) => setDeniedReason(e.target.value)}
                        disabled={goodsInfo.LogItemDisable}
                        // register={register('title')}
                      />
                    )}
                  </Flex>
                )}
              </Flex>
              {/* <Flex flexDirection={'row'} pb={'20px'} alignItems={'center'}>
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
              >
                서비스 수수료
              </Text>
              <Flex flexDirection={'row'} alignItems={'center'}>
              <InputBox
                w={'183px'}
                value={deniedReason}
                placeholder="서비스 수수료"
                // value={list?.title}
                onChange={(e) => setDeniedReason(e.target.value)}
                disabled={goodsInfo.LogItemDisable}
                // register={register('title')}
              />
                  <Text ml={'10px'} fontSize={'15px'} color={ColorBlack}>%</Text>
              </Flex>
            </Flex> */}
            </Flex>
            {info.level != 1 && (
              <Flex justifyContent={'center'} pt={'20px'}>
                <CustomButton
                  text="저장"
                  bgColor={ColorRed}
                  borderColor={ColorRed}
                  color={ColorWhite}
                  fontSize={ColorWhite}
                  fontWeight={500}
                  py="12px"
                  px="67px"
                  onClick={() => handleSubmit()}
                />
              </Flex>
            )}
          </Flex>
        </>
      )}
    </>
  );
}

export default Partner;
