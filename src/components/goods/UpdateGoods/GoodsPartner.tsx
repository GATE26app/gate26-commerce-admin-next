import goodsApi from '@/app/apis/goods/GoodsApi';
import {
  useItemApprovemutation,
  useItemDeniedmutation,
} from '@/app/apis/goods/GoodsApi.mutation';
import {
  GoodsBasicProps,
  GoodsDetailBasicProps,
  GoodsSelectLogItemType,
  ItemApproveReqType,
  ItemDeniedReqType,
  PartnerType,
} from '@/app/apis/goods/GoodsApi.type';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import RadioComponent from '@/components/common/RadioBox/RadioComponent';
import LogSelectBox from '@/components/common/SelectBox/LogSelectBox';
import {
  ColorBlack,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { imgPath } from '@/utils/format';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
interface Props {
  itemCode: string;
  itemId: string;
  BasicInfo: GoodsBasicProps;
  partnerInfo: PartnerType;
  setSelectLog: React.Dispatch<React.SetStateAction<GoodsSelectLogItemType>>;
}
function GoodsPartner({
  itemCode,
  itemId,
  BasicInfo,
  partnerInfo,
  setSelectLog,
}: Props) {
  const [select, setSelect] = useState(''); //로그 상세 선택
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
  const [logList, setLogList] = useState([]);
  //상품승인
  const { mutate: ApproveMutate } = useItemApprovemutation({
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
            title: `상품 승인`,
            message: `상품 승인되었습니다.`,
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

  //상품거절
  const { mutate: DeniedMutate } = useItemDeniedmutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: `상품 반려`,
            message: `상품 반려되었습니다.`,
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
      const obj: ItemApproveReqType = {
        itemCode: itemCode,
        itemId: itemId,
      };
      setOpenAlertModal(true);
      setModalState({
        ...ModalState,
        title: `상품 승인`,
        message: `상품 승인하시겠습니까?`,
        type: 'alert',
        okButtonName: '확인',
        cbOk: () => {
          ApproveMutate(obj);
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
        const obj: ItemDeniedReqType = {
          itemCode: itemCode,
          itemId: itemId,
          deniedReason: deniedReason,
        };
        setOpenAlertModal(true);
        setModalState({
          ...ModalState,
          title: `상품 반려`,
          message: `상품 반려하시겠습니까?`,
          type: 'alert',
          okButtonName: '확인',
          cbOk: () => {
            DeniedMutate(obj);
            // window.history.back();
          },
        });
      }
    }
  };
  //로그목록
  const { data: LogListData, error } = useQuery(
    ['goodsLogList', itemCode],
    () => goodsApi.getGoodsLogList(String(itemCode)),
    {
      staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      refetchInterval: false, // 자동 새로 고침 비활성화
    },
  );
  useEffect(() => {
    if (LogListData?.success) {
      setLogList(LogListData.data);
      setSelect(LogListData.data[0].version);
    }
  }, [LogListData]);
  //승인상태
  useEffect(() => {
    if (BasicInfo?.status == 1) {
      setIsCheck(1);
    } else if (BasicInfo?.status == 3) {
      setIsCheck(3);
      setDeniedReason(
        BasicInfo?.deniedReason !== undefined ? BasicInfo?.deniedReason : '',
      );
    }
  }, [BasicInfo?.status]);

  return (
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
        mb={'20px'}
      >
        <Flex flexDirection={'column'}>
          <Flex flexDirection={'row'} pb={'20px'}>
            <Text
              w={'165px'}
              flexShrink={0}
              color={ColorBlack}
              fontWeight={600}
              fontSize={'15px'}
            >
              파트너사
            </Text>
            <Flex gap={'10px'} alignItems={'center'}>
              <Box
                borderRadius={'50px'}
                overflow={'hidden'}
                w={'24px'}
                h={'24px'}
              >
                <Image
                  src={
                    partnerInfo?.thumbnailImagePath == null &&
                    partnerInfo?.thumbnailImagePath == undefined
                      ? '/images/header/icon_header_user.png'
                      : imgPath() + partnerInfo?.thumbnailImagePath
                  }
                  width={24}
                  height={24}
                  alt="파트너사 이미지"
                />
              </Box>

              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
              >
                {partnerInfo?.title}
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection={'row'} alignItems={'center'}>
            <Text
              w={'165px'}
              flexShrink={0}
              color={ColorBlack}
              fontWeight={600}
              fontSize={'15px'}
            >
              버전
            </Text>
            <Flex>
              <LogSelectBox
                width="337px"
                select={select}
                setSelect={setSelect}
                list={logList}
                placeholder="로그목록"
                onClick={(e) => {
                  const obj = {
                    itemCode: itemCode,
                    itemId: e,
                  };
                  console.log('obj', obj);
                  setSelectLog(obj);
                  // console.log(e);
                  // LogItemMutate(obj);
                }}
              />
            </Flex>
            <Flex pl={'15px'}>
              <Text
                fontWeight={400}
                fontSize={'15px'}
                color={ColorGray700}
                pr={'10px'}
              >
                상품코드
              </Text>
              <Text color={ColorBlack} fontWeight={600} fontSize={'15px'}>
                {BasicInfo?.itemCode}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDirection={'column'}
          borderTopColor={ColorGrayBorder}
          pt={'20px'}
          mt={'20px'}
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
              상품승인요청일
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {BasicInfo?.requestDate == null ? '-' : BasicInfo?.requestDate}
            </Text>
          </Flex>
          <Flex>
            <Flex flexDirection={'row'} pb={'20px'} w={'50%'}>
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
              >
                상품승인일/거절일시
              </Text>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {BasicInfo?.status == 1
                  ? BasicInfo?.approvalDate == null ||
                    BasicInfo?.approvalDate == undefined
                    ? '-'
                    : BasicInfo?.approvalDate
                  : BasicInfo?.deniedDate == null ||
                    BasicInfo?.deniedDate == undefined
                  ? '-'
                  : BasicInfo?.deniedDate}
              </Text>
            </Flex>
            <Flex flexDirection={'row'} pb={'20px'} w={'50%'}>
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
              >
                승인처리자/반려처리자
              </Text>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {BasicInfo?.status == 1
                  ? BasicInfo?.approvalId == null ||
                    BasicInfo?.approvalId == undefined
                    ? '-'
                    : BasicInfo?.approvalId
                  : BasicInfo?.deniedId == null ||
                    BasicInfo?.deniedId == undefined
                  ? '-'
                  : BasicInfo?.deniedId}
              </Text>
            </Flex>
          </Flex>
          {(BasicInfo.deniedDate !== null ||
            BasicInfo.deniedDate !== undefined) && (
            <Flex flexDirection={'row'} pb={'20px'}>
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
              >
                반려사유
              </Text>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {BasicInfo?.deniedReason == null ||
                BasicInfo?.deniedReason == undefined
                  ? '-'
                  : BasicInfo?.deniedReason}
              </Text>
            </Flex>
          )}

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
                  onChange={(e: any) => setDeniedReason(e.target.value)}
                  disabled={goodsInfo.LogItemDisable}
                  // register={register('title')}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent={'center'} pt={'20px'}>
          <CustomButton
            text="처리완료"
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
      </Flex>
    </>
  );
}

export default GoodsPartner;
