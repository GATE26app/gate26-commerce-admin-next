import { usePutCouponCreateMutation } from '@/app/apis/coupon/CouponApi.mutation';
import { CouponDataResType } from '@/app/apis/coupon/CouponApi.type';
import CustomButton from '@/components/common/CustomButton';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import ToastComponent from '@/components/common/Toast/ToastComponent';

import {
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CouponPermissionUser from '../common/create/CouponPermissionUser';
import CouponTitleComponent from '../common/create/CouponTitleComponent';
import CouponTypeComponent from '../common/create/CouponTypeComponent';
import CouponCntComponent from '../common/create/CouponCntComponent';
import CouponPriceComponent from '../common/create/CouponPriceComponent';
import CouponDateComponent from '../common/create/CouponDateComponent';
import CouponExposureStatusComponent from '../common/create/CouponExposureStatusComponent';
import CouponMinPriceComponent from '../common/create/CouponMinPriceComponent';
import CouponPartnerPrice from '../common/create/CouponPartnerPrice';
import CouponPermissionPartner from '../common/create/CouponPermissionPartner';

function CouponPartnerCreate() {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const getCouponId = searchParams.get('id');
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [couponCntState, setCouponCntState] = useState(true); //쿠폰 재고 유무
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });

  const [ClickUserList, setClickUserList] = useState<string[]>([]);
  const [ClickPartner, setClickPartner] = useState<string>('');
  const [CouponData, setCouponData] = useState<CouponDataResType>({
    access: 0,
    level: 0,
    type: 2,
    stockCnt: 0,
    title: '',
    startDate: '',
    endDate: '',
    minOrderAmount: 0,
    dcType: 1,
    priceDc: 0,
    partnerChargeAmount: 0,
    percentDc: 0,
    partnerChargePercent: 0,
    permissions: [],
    itemCode: '',
    partnerId: '',
  });

  const handleClick = () => {
    if (CouponData.access == 1 && ClickUserList.length == 0) {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'발급대상을 선택해주세요.'}
          </Box>
        ),
      });
    } else if (ClickPartner == '') {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'파트너사를 선택해주세요.'}
          </Box>
        ),
      });
    } else if (CouponData.title == '') {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'GATE 26 쿠폰명을 입력해주세요.'}
          </Box>
        ),
      });
    } else if (couponCntState && CouponData.stockCnt == 0) {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'쿠폰 재고를 입력해주세요.'}
          </Box>
        ),
      });
    } else if (CouponData.dcType == 1 && CouponData.priceDc == 0) {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'할인 금액을 입력해주세요.'}
          </Box>
        ),
      });
    } else if (CouponData.dcType == 2 && CouponData.percentDc == 0) {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'할인율을 입력해주세요.'}
          </Box>
        ),
      });
    } else if (CouponData.minOrderAmount == 0) {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'최소 주문 금액을 입력해주세요.'}
          </Box>
        ),
      });
    } else if (CouponData.dcType == 1 && CouponData.partnerChargeAmount == 0) {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'파트너사 쿠폰 부담비를 입력해주세요.'}
          </Box>
        ),
      });
    } else if (CouponData.dcType == 2 && CouponData.partnerChargePercent == 0) {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'파트너사 쿠폰 부담율을 입력해주세요.'}
          </Box>
        ),
      });
    } else if (CouponData.startDate == '') {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'GATE 26 쿠폰 시작일을 선택해주세요.'}
          </Box>
        ),
      });
    } else if (CouponData.endDate == '') {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'GATE 26 쿠폰 종료일을 선택해주세요.'}
          </Box>
        ),
      });
    } else if (CouponData?.dcType == 2 && Number(CouponData.percentDc) > 100) {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'할인율을 100% 이하로 입력해주세요.'}
          </Box>
        ),
      });
    } else {
      // access => 전체(0), 개인(1)
      // dcType => 원(1), 퍼센트(2)
      if (CouponData.access == 0) {
        if (CouponData.dcType == 1) {
          const obj = {
            access: 0,
            level: 1,
            type: CouponData.type,
            title: CouponData.title,
            startDate: CouponData.startDate,
            endDate: CouponData.endDate,
            minOrderAmount: CouponData.minOrderAmount,
            dcType: 1,
            priceDc: CouponData.priceDc,
            stockCnt: CouponData.stockCnt,
            partnerId: ClickPartner,
            partnerChargeAmount: CouponData?.partnerChargeAmount,
          };
          console.log('@1111obj', obj);
          CreateItemMutate(obj);
        } else {
          const obj = {
            access: 0,
            level: 1,
            type: CouponData.type,
            title: CouponData.title,
            startDate: CouponData.startDate,
            endDate: CouponData.endDate,
            minOrderAmount: CouponData.minOrderAmount,
            dcType: 2,
            percentDc: CouponData.percentDc,
            stockCnt: CouponData.stockCnt,
            partnerId: ClickPartner,
            partnerChargePercent: CouponData?.partnerChargePercent,
          };
          console.log('@2222obj', obj);
          CreateItemMutate(obj);
        }
      } else {
        if (CouponData.dcType == 1) {
          const obj = {
            access: 1,
            level: 1,
            type: CouponData.type,
            title: CouponData.title,
            startDate: CouponData.startDate,
            endDate: CouponData.endDate,
            minOrderAmount: CouponData.minOrderAmount,
            dcType: 1,
            priceDc: CouponData.priceDc,
            stockCnt: CouponData.stockCnt,
            permissions: ClickUserList,
            partnerId: ClickPartner,
            partnerChargeAmount: CouponData?.partnerChargeAmount,
          };
          console.log('@3333obj', obj);
          CreateItemMutate(obj);
        } else {
          const obj = {
            access: 1,
            level: 1,
            type: CouponData.type,
            title: CouponData.title,
            startDate: CouponData.startDate,
            endDate: CouponData.endDate,
            minOrderAmount: CouponData.minOrderAmount,
            dcType: 2,
            percentDc: CouponData.percentDc,
            stockCnt: CouponData.stockCnt,
            permissions: ClickUserList,
            partnerId: ClickPartner,
            partnerChargePercent: CouponData?.partnerChargePercent,
          };
          console.log('@4444obj', obj);
          CreateItemMutate(obj);
        }
      }
    }
  };

  const { mutate: CreateItemMutate, isLoading } = usePutCouponCreateMutation({
    options: {
      onSuccess: (res) => {
        console.log('res', res);
        if (res.success == true) {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: 'GATE 26 쿠폰 등록',
            message: 'GATE 26 쿠폰이 등록되었습니다.',
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              router.back();
              // window.history.back();
            },
          });
        } else {
          ToastComponent('등록에 실패하였습니다.');
          console.log('error GATE 26 쿠폰 등록 에러', res.code);
        }
      },
    },
  });
  console.log('CouponData', CouponData);
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
        flexDirection={'column'}
        position={'relative'}
        borderRadius={'16px'}
      >
        <Flex
          justifyContent={'space-between'}
          pt={'60px'}
          pb={'15px'}
          position={'sticky'}
          top={'72px'}
          bgColor={ColorWhite}
          zIndex={999}
        >
          <Flex alignItems={'center'}>
            <Image
              src={'/images/Page/subtopicon05.png'}
              width={'20px'}
              height={'20px'}
              alt="상품관리"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              쿠폰 등록
            </Text>
          </Flex>
          <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <CustomButton
              text="목록"
              borderColor={ColorGray400}
              color={ColorGray700}
              px="44px"
              py="13px"
              bgColor={ColorWhite}
              fontSize="15px"
              onClick={() => router.back()}
            />

            <CustomButton
              text="등록"
              borderColor={ColorRed}
              color={ColorWhite}
              px="44px"
              py="13px"
              bgColor={ColorRed}
              fontSize="15px"
              onClick={() => handleClick()}
            />
          </Flex>
        </Flex>

        <Box
          // px={'60px'}
          // pb={'60px'}
          bgColor={ColorWhite}
          borderBottomRadius={'16px'}
        >
          <CouponPermissionUser
            CouponData={CouponData}
            setCouponData={setCouponData}
            ClickUserList={ClickUserList}
            setClickUserList={setClickUserList}
          />
          <CouponPermissionPartner
            CouponData={CouponData}
            setCouponData={setCouponData}
            ClickPartner={ClickPartner}
            setClickPartner={setClickPartner}
          />
          <CouponTitleComponent
            CouponData={CouponData}
            setCouponData={setCouponData}
          />
          <CouponTypeComponent
            CouponData={CouponData}
            setCouponData={setCouponData}
          />
          <CouponCntComponent
            CouponData={CouponData}
            setCouponData={setCouponData}
            state={couponCntState}
            setState={setCouponCntState}
          />
          <CouponPriceComponent
            CouponData={CouponData}
            setCouponData={setCouponData}
          />
          <CouponMinPriceComponent
            CouponData={CouponData}
            setCouponData={setCouponData}
          />
          <CouponPartnerPrice
            CouponData={CouponData}
            setCouponData={setCouponData}
          />
          <CouponDateComponent
            CouponData={CouponData}
            setCouponData={setCouponData}
          />
          <CouponExposureStatusComponent
            CouponData={CouponData}
            setCouponData={setCouponData}
          />
        </Box>
      </Flex>
    </>
  );
}

export default CouponPartnerCreate;
