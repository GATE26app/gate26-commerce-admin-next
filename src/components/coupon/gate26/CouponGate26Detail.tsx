import CustomButton from '@/components/common/CustomButton';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import {
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CouponTitleComponent from '../common/CouponTitleComponent';
import CouponStatusComponent from '../common/CouponStatusComponent';
import { CouponDataType } from '@/app/apis/coupon/CouponApi.type';
import CouponDateComponent from '../common/CouponDateComponent';
import CouponExposureStatusComponent from '../common/CouponExposureStatusComponent';
import { useQuery } from 'react-query';
import couponApi from '@/app/apis/coupon/CouponApi';
import CouponPermissionUser from '../common/CouponPermissionUser';
import CouponCntComponent from '../common/CouponCntComponent';
import CouponPriceComponent from '../common/CouponPriceComponent';
import CouponTypeComponent from '../common/CouponTypeComponent';
import CouponPartnerPrice from '../common/CouponPartnerPrice';
import CouponPermission from '../common/CouponPermission';
import CouponMinPriceComponent from '../common/CouponMinPriceComponent';
import {
  useCouponDeleteMutation,
  useGetUserSearchMutation,
  usePatchCouponModifyMutation,
} from '@/app/apis/coupon/CouponApi.mutation';

function CouponGate26Detail() {
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
  const [CouponData, setCouponData] = useState<CouponDataType>({
    couponId: 0,
    access: 0,
    accessName: '',
    level: 0,
    levelName: '',
    type: 0,
    typeName: '',
    stockCnt: 0,
    title: '',
    startDate: '',
    endDate: '',
    minOrderAmount: 0,
    dcType: 1,
    dcTypeName: '',
    priceDc: 0,
    partnerChargeAmount: 0,
    percentDc: 0,
    partnerChargePercent: 0,
    partner: {
      partnerId: '',
      title: '',
      images: [],
    },
    itemRef: {
      itemCode: '',
      item: {
        itemId: '',
        title: '',
        priceNet: 0,
        priceDcPer: 0,
        price: 0,
        images: [],
      },
    },
    permissions: [],
    createdId: '',
    createdDate: '',
    modifiedId: '',
    modifiedDate: '',
  });

  //쿠폰 상세
  const { data: detailData, isLoading } = useQuery(
    ['GET_GOODSDETAIL', getCouponId],
    () => couponApi.getCouponDetail(getCouponId == null ? '0' : getCouponId),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      onSuccess: ({ data }) => {
        setCouponData(data);
      },
    },
  );
  useEffect(() => {
    if (detailData?.data?.stockCnt == null) {
      setCouponCntState(false);
    } else {
      setCouponCntState(true);
    }
  }, [detailData?.data?.stockCnt]);
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
    } else if (CouponData?.dcType == 1 && CouponData.priceDc == 0) {
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
            CouponId: String(getCouponId),
            data: {
              access: 0,
              level: CouponData.level,
              type: CouponData.type,
              title: CouponData.title,
              startDate: CouponData.startDate,
              endDate: CouponData.endDate,
              minOrderAmount: CouponData.minOrderAmount,
              dcType: 1,
              priceDc: CouponData.priceDc,
              stockCnt: CouponData.stockCnt,
            },
          };
          console.log('@1111obj', obj);
          ModifyMutate(obj);
        } else {
          const obj = {
            CouponId: String(getCouponId),
            data: {
              access: 0,
              level: CouponData.level,
              type: CouponData.type,
              title: CouponData.title,
              startDate: CouponData.startDate,
              endDate: CouponData.endDate,
              minOrderAmount: CouponData.minOrderAmount,
              dcType: 2,
              percentDc: CouponData.percentDc,
              stockCnt: CouponData.stockCnt,
            },
          };
          console.log('@2222obj', obj);
          ModifyMutate(obj);
        }
      } else {
        if (CouponData.dcType == 1) {
          const obj = {
            CouponId: String(getCouponId),
            data: {
              access: 1,
              level: CouponData.level,
              type: CouponData.type,
              title: CouponData.title,
              startDate: CouponData.startDate,
              endDate: CouponData.endDate,
              minOrderAmount: CouponData.minOrderAmount,
              dcType: 1,
              priceDc: CouponData.priceDc,
              stockCnt: CouponData.stockCnt,
              permissions: ClickUserList,
            },
          };
          console.log('@3333obj', obj);
          ModifyMutate(obj);
        } else {
          const obj = {
            CouponId: String(getCouponId),
            data: {
              access: 1,
              level: CouponData.level,
              type: CouponData.type,
              title: CouponData.title,
              startDate: CouponData.startDate,
              endDate: CouponData.endDate,
              minOrderAmount: CouponData.minOrderAmount,
              dcType: 2,
              percentDc: CouponData.percentDc,
              stockCnt: CouponData.stockCnt,
              permissions: ClickUserList,
            },
          };
          console.log('@4444obj', obj);
          ModifyMutate(obj);
        }
      }
    }
  };
  //쿠폰 수정
  const { mutate: ModifyMutate, isLoading: IsLoading } =
    usePatchCouponModifyMutation({
      options: {
        onSuccess: (res) => {
          if (res.success == true) {
            setOpenAlertModal(true);
            setModalState({
              ...ModalState,
              title: '쿠폰 수정',
              message: '쿠폰이 수정되었습니다.',
              type: 'alert',
              okButtonName: '확인',
              cbOk: () => {
                router.back();
                // window.history.back();
              },
            });
          } else {
            setOpenAlertModal(true);
            setModalState({
              ...ModalState,
              title: '쿠폰 수정',
              message: `${res.message}`,
              type: 'alert',
              okButtonName: '확인',
              cbOk: () => {
                setOpenAlertModal(false);
                // window.history.back();
              },
            });
          }
        },
      },
    });
  //쿠폰 삭제
  const { mutate: deleteMutate } = useCouponDeleteMutation({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          // router.back();
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: '쿠폰 삭제',
            message: '쿠폰이 삭제되었습니다.',
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              router.back();
              // window.history.back();
            },
          });
        } else {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: '쿠폰 삭제',
            message: '쿠폰이 삭제 되지 않았습니다.',
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              setOpenAlertModal(false);
              // window.history.back();
            },
          });
          // console.log('error 상품 생성 에러', res.code);
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
              쿠폰 등록/수정
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
              text="수정"
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

        {detailData?.success == true && CouponData !== undefined ? (
          <Box
            // px={'60px'}
            // pb={'60px'}
            bgColor={ColorWhite}
            borderBottomRadius={'16px'}
          >
            <CouponStatusComponent data={CouponData} />
            <CouponPermissionUser
              CouponData={CouponData}
              setCouponData={setCouponData}
              ClickUserList={ClickUserList}
              setClickUserList={setClickUserList}
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
            <CouponDateComponent
              CouponData={CouponData}
              setCouponData={setCouponData}
            />
            <CouponExposureStatusComponent
              CouponData={CouponData}
              setCouponData={setCouponData}
            />

            <Flex justifyContent={'flex-end'}>
              <CustomButton
                text="삭제하기"
                borderColor={ColorGray900}
                bgColor={ColorWhite}
                color={ColorGray900}
                fontSize="15px"
                px="31px"
                py="13px"
                onClick={() => {
                  setOpenAlertModal(true);
                  setModalState({
                    ...ModalState,
                    title: '쿠폰 삭제',
                    message: `쿠폰을 삭제 하시겠습니까?`,
                    type: 'confirm',
                    okButtonName: '확인',
                    cbOk: () => {
                      deleteMutate(String(CouponData.couponId));
                      setLoadingModal(true);
                    },
                  });
                }}
              />
            </Flex>
          </Box>
        ) : (
          <></>
        )}
      </Flex>
    </>
  );
}

export default CouponGate26Detail;
