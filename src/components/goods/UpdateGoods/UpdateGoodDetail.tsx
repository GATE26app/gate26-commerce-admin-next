'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import {
  useLogItemutation,
  usePatchGoodsStatusMutation,
  usePatchOptionModifyMutation,
  usePatchUpdateGoodsStatusMutation,
} from '@/app/apis/goods/GoodsApi.mutation';

import CustomButton from '@/components/common/CustomButton';

import {
  ColorBlack,
  ColorBlack00,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorRed50,
  ColorWhite,
} from '@/utils/_Palette';
import { DashDate } from '@/utils/format';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import StatusComponent from '@/components/goods/StatusComponent';
import ModifyOptionComponent from '@/components/goods/ModifyOptionComponent';
import GoodsPartner from './GoodsPartner';
import {
  CategoryResProps,
  GoodsAttributeListProps,
  GoodsBasicProps,
  GoodsDetailBasicProps,
  GoodsItemProps,
  GoodsListItemImageProps,
  GoodsOptionStockModifyType,
  GoodsPoliciesListProps,
  GoodsSchedulesListProps,
  GoodsSelectLogItemType,
  LocationResProps,
  OptionItemProps,
  PartnerType,
  PatchGoodsStatusParmaType,
  PatchOptionStockType,
  PatchUpdateGoodsStatusParmaType,
  StatusProps,
  optionInputsProps,
} from '@/app/apis/goods/GoodsApi.type';
import goodsApi from '@/app/apis/goods/GoodsApi';
import AlertModal from '@/components/common/Modal/AlertModal';
import GoodsModify from '../GoodsModify';
import { usePartnerZuInfo } from '@/_store/PatnerInfo';
import PreviewDrawerComponent from '../Preview/PreviewDrawerComponent';

interface CategoryListProps {
  categoryId: number;
}
interface LocationListProps {
  locationId: number;
}
function UpdateGoodDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const { setPartnerZuInfo } = usePartnerZuInfo((state) => state);
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => { },
    cbCancel: () => { },
  });
  const searchParams = useSearchParams();
  const getType = searchParams.get('type');
  const getItemCode = searchParams.get('itemcode');
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [selectMenu, setSelectMenu] = useState(1);
  const [selectLog, setSelectLog] = useState<GoodsSelectLogItemType>({
    itemCode: '',
    itemId: '',
  }); //로그 상세 선택

  const [logList, setLogList] = useState([]);
  const [logDisable, setLogDisable] = useState(false);
  const [optionList, setOptionList] = useState<OptionItemProps[]>([]);
  const [CateGetList, setCateGetList] = useState<CategoryResProps[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryListProps[]>([]); //수정시 전달한 리스트
  const [CatePreList, setCatePreList] = useState<CategoryResProps[]>([]);
  const [locationGetList, setLocationGetList] = useState<LocationResProps[]>(
    [],
  );

  const [goodsItemList, setGoodsItemList] = useState<GoodsItemProps[]>([]);
  const [locationList, setLocationList] = useState<LocationListProps[]>([]); //수정시 전달한 리스트
  const [locationPreList, setLocationPreList] = useState<LocationResProps[]>(
    [],
  );
  const [statusList, setStatusList] = useState<StatusProps>({
    forSale: 0,
    level: 0,
    viewStartDate: '',
    viewEndDate: '',
  });

  const [attributeList, setAttributeList] = useState<GoodsAttributeListProps[]>(
    [],
  );
  // const [optionList, setOptionList] = useState<OptionProps[]>([]);
  const [optionInputList, setOptionInputList] = useState<optionInputsProps[]>(
    [],
  );
  const [EditorContent, setEditorContent] = useState('');
  const [BasicInfo, setBasicInfo] = useState<GoodsBasicProps>({
    itemId: '',
    itemCode: '',
    title: '', //상품 명
    basicInfo: '', //상품 기본정보
    detailInfo: '', //상품 상세설명
    content: '', //상품 상세설명(에디터)
    reservationInfo: '', //상품 예약전 확인사항
    sort: 1, //상품 정렬
    type: Number(getType), //상품 유형 (미사용)
    orderSameDay: 0, //상품 이용일시 당일판매, 0=>가능, 1=>불가능
    orderCloseBefore: 0, //상품 판매마감처리, 0=>해당없음, N시간전 판매마감
    level: 1, //상품 레벨, 1=>노출, 2=>미노출, 10=>삭제
    viewStartDate: '', //노출 시작일시
    viewEndDate: '', //노출 종료일시
    status: 2, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
    forSale: 1, //판매 상태, 1=>판매중, 2=>판매안함, 10=>품절
    priceNet: 0, //상품 판매금액, 기본할인전
    priceDcPer: 0, //상품 기본할인율
    priceDc: 0, //상품 기본할인금액
    price: 0, //상품 판매금액, 기본할인후
    optionType: 1, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
    optionInputType: 0, //상품 옵션입력 유형, 0=>단독형, 1=>조합형
    optionInputStartDate: '', //상품 옵션입력 이용일시 생성구간 시작일
    optionInputEndDate: '', //상품 옵션입력 이용일시 생성구간 종료일,
    autoConfirm: 0, //자동예약확정: 활성화 비활성화
    partnerTitle: '', //파트너사명
    requestDate: '', //상품승인요청일
    approvalDate: '', //상품승인일
    deniedDate: '', //상품반려일
    deniedReason: '', //반려사유
    approvalId: '', //승인처리자
    deniedId: '', //승인거절처리자
    requiredPartnerCancelConfirm: 0,
  });
  const [partnerInfo, setPartnerInfo] = useState<PartnerType>();
  const [imageList, setImageList] = useState<GoodsListItemImageProps[]>([]);
  const [policyList, setPolicyList] = useState<GoodsPoliciesListProps[]>([]);
  const [planList, setPlanList] = useState<GoodsSchedulesListProps[]>([
    {
      sort: 1,
      startDay: '',
      startTime: '',
      durationTime: '',
      location: '',
      info: '',
      lng: '',
      lat: '',
      images: [
        {
          imagePath: '',
          thumbnailImagePath: '',
        },
      ],
    },
  ]);
  const [optionModifyList, setOptionModifyList] = useState<
    GoodsOptionStockModifyType[]
  >([]);
  const itemCode = getItemCode as string;

  // 계속해서 refetch 되는 현상을 컨트롤하기 위한 변수
  const [shouldFetch, setShouldFetch] = useState(true);


  const ToastComponent = (message: string) => {
    return toast({
      position: 'top',
      duration: 2000,
      render: () => (
        <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
          {`${message}`}
        </Box>
      ),
    });
  };
  //상품상세
  const { data: detailData } = useQuery(
    ['GET_GOODSDETAIL', itemCode],
    () => goodsApi.getGoodsDetail(itemCode),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: shouldFetch && !!itemCode,
      onSuccess: ({ data }) => {
        if (data == undefined) {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'존재하지 않는 상품입니다.'}
              </Box>
            ),
          });
          if (document.referrer) {
            router.back();
          } else {
            router.replace('/goodsList');
          }
        }
      },
    },
  );

  useEffect(() => {
    if (detailData?.success == true) {
      setPartnerZuInfo(detailData?.data.partner);
      setLogDisable(false);
      setOptionList(detailData?.data.options);
      setStatusList({
        forSale: detailData?.data.forSale,
        level: detailData?.data.level,
        viewStartDate: detailData?.data.viewStartDate,
        viewEndDate: detailData?.data.viewEndDate,
      });
      setCateGetList(detailData?.data.categories);
      setCatePreList(detailData?.data.categories);
      setLocationGetList(detailData?.data.locations);
      setLocationPreList(detailData?.data.locations);
      setGoodsItemList(detailData?.data);
      setAttributeList(detailData?.data.attributes);
      setEditorContent(detailData?.data.content);
      setBasicInfo({
        itemId: detailData?.data.itemId,
        itemCode: detailData?.data?.itemCode,
        title: detailData?.data.title, //상품 명
        basicInfo: detailData?.data.basicInfo, //상품 기본정보
        detailInfo: detailData?.data.detailInfo, //상품 상세설명
        content: detailData?.data.content, //상품 상세설명(에디터)
        reservationInfo: detailData?.data.reservationInfo, //상품 예약전 확인사항
        sort: detailData?.data.sort, //상품 정렬
        type: detailData?.data.type, //상품 유형 (미사용)
        orderSameDay: detailData?.data.orderSameDay, //상품 이용일시 당일판매, 0=>가능, 1=>불가능
        orderCloseBefore: detailData?.data.orderCloseBefore, //상품 판매마감처리, 0=>해당없음, N시간전 판매마감
        level: detailData?.data.level, //상품 레벨, 1=>노출, 2=>미노출, 10=>삭제
        viewStartDate: detailData?.data.viewStartDate, //노출 시작일시
        viewEndDate: detailData?.data.viewEndDate, //노출 종료일시
        status: detailData?.data.status, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
        forSale: detailData?.data.forSale, //판매 상태, 1=>판매중, 2=>판매안함, 10=>품절
        priceNet: detailData?.data.priceNet, //상품 판매금액, 기본할인전
        priceDcPer: detailData?.data.priceDcPer, //상품 기본할인율
        priceDc: detailData?.data.priceDc, //상품 기본할인금액
        price: detailData?.data.price, //상품 판매금액, 기본할인후
        optionType: detailData?.data.optionType, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
        optionInputType: detailData?.data.optionInputType, //상품 옵션입력 유형, 0=>단독형, 1=>조합형
        optionInputStartDate: detailData?.data.optionInputStartDate, //상품 옵션입력 이용일시 생성구간 시작일
        optionInputEndDate: detailData?.data.optionInputEndDate, //상품 옵션입력 이용일시 생성구간 종료일
        autoConfirm: detailData?.data.autoConfirm,
        deniedReason: detailData?.data.deniedReason,
        partnerTitle: detailData?.data.partnerTitle, //파트너사명
        requestDate: detailData?.data.requestDate, //상품승인요청일
        approvalDate: detailData?.data.approvalDate, //상품승인일
        deniedDate: detailData?.data.deniedDate, //상품반려일
        approvalId: detailData?.data.approvalId, //승인처리자
        deniedId: detailData?.data.deniedId, //승인거절처리자
        requiredPartnerCancelConfirm:
          detailData?.data.requiredPartnerCancelConfirm,
      });
      setPlanList(detailData?.data.schedules);
      setPolicyList(detailData?.data.policies);
      setOptionInputList(detailData?.data.optionInputs);
      setImageList(detailData?.data.images);
      setPartnerInfo(detailData?.data.partner);
    }
  }, [detailData]);

  useEffect(() => {
    if (
      goodsInfo.LogItemDisable == true &&
      detailData?.data?.itemId == BasicInfo.itemId
    ) {
      setGoodsInfo({
        LogItemDisable: false,
      });
    }
  }, [BasicInfo]);

  //상품 수정[버전변경]
  const { mutate: PatchUpdateGoodsMutate, isLoading } =
    usePatchUpdateGoodsStatusMutation({
      options: {
        onSuccess: (res) => {
          if (res.success == true) {
            router.back();
          } else {
            toast({
              position: 'top',
              duration: 3000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  //노출여부, 노출기간, 판매여부
  const { mutate: PatchStstusMutate } = usePatchGoodsStatusMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          router.back();
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

  //수정
  const { mutate: optionModifyMutate } = usePatchOptionModifyMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          router.back();
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

  //로그목록
  const { data: LogListData, error } = useQuery(
    ['goodsLogList', itemCode],
    () => goodsApi.getGoodsLogList(itemCode),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!itemCode,
    },
  );

  useEffect(() => {
    // if(selectLog){

    // }
    if (selectLog.itemId !== '') {
      LogItemMutate(selectLog);
    }
  }, [selectLog.itemId]);
  //로그 상세
  const { mutate: LogItemMutate } = useLogItemutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setGoodsInfo({
            LogItemDisable: true,
          });
          setOptionList(res.data.options);
          setStatusList({
            forSale: res.data.forSale,
            level: res.data.level,
            viewStartDate: res.data.viewStartDate,
            viewEndDate: res.data.viewEndDate,
          });
          setCateGetList(res.data.categories);
          setCatePreList(res.data.categories);
          setLocationGetList(res.data.locations);
          setLocationPreList(res.data.locations);
          setGoodsItemList(res.data);
          setAttributeList(res.data.attributes);
          setEditorContent(res.data.content);
          setBasicInfo({
            itemId: res.data.itemId,
            itemCode: res.data.itemCode,
            title: res.data.title, //상품 명
            basicInfo: res.data.basicInfo, //상품 기본정보
            detailInfo: res.data.detailInfo, //상품 상세설명
            content: res.data.content, //상품 상세설명(에디터)
            reservationInfo: res.data.reservationInfo, //상품 예약전 확인사항
            sort: res.data.sort, //상품 정렬
            type: res.data.type, //상품 유형 (미사용)
            orderSameDay: res.data.orderSameDay, //상품 이용일시 당일판매, 0=>가능, 1=>불가능
            orderCloseBefore: res.data.orderCloseBefore, //상품 판매마감처리, 0=>해당없음, N시간전 판매마감
            level: res.data.level, //상품 레벨, 1=>노출, 2=>미노출, 10=>삭제
            viewStartDate: res.data.viewStartDate, //노출 시작일시
            viewEndDate: res.data.viewEndDate, //노출 종료일시
            status: res.data.status, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
            forSale: res.data.forSale, //판매 상태, 1=>판매중, 2=>판매안함, 10=>품절
            priceNet: res.data.priceNet, //상품 판매금액, 기본할인전
            priceDcPer: res.data.priceDcPer, //상품 기본할인율
            priceDc: res.data.priceDc, //상품 기본할인금액
            price: res.data.price, //상품 판매금액, 기본할인후
            optionType: res.data.optionType, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
            optionInputType: res.data.optionInputType, //상품 옵션입력 유형, 0=>단독형, 1=>조합형
            optionInputStartDate: res.data.optionInputStartDate, //상품 옵션입력 이용일시 생성구간 시작일
            optionInputEndDate: res.data.optionInputEndDate, //상품 옵션입력 이용일시 생성구간 종료일
            autoConfirm: res.data.autoConfirm,
            deniedReason: res.data.deniedReason,
            partnerTitle: res.data.partnerTitle, //파트너사명
            requestDate: res.data.requestDate, //상품승인요청일
            approvalDate: res.data.approvalDate, //상품승인일
            deniedDate: res.data.deniedDate, //상품반려일
            approvalId: res.data.approvalId, //승인처리자
            deniedId: res.data.deniedId, //승인거절처리자
            requiredPartnerCancelConfirm: res.data.requiredPartnerCancelConfirm,
          });
          setPlanList(res.data.schedules);
          setPolicyList(res.data.policies);
          setOptionInputList(res.data.optionInputs);
          setImageList(res.data.images);
          setPartnerInfo(res.data.partner);
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
  useEffect(() => {
    if (LogListData?.success) {
      setLogList(LogListData.data);
    }
  }, [LogListData]);

  const onSubmit = (selectMenu: number, status?: number) => {
    if (selectMenu == 1) {
      if (categoryList.length == 0) {
        ToastComponent('카테고리를 선택해주세요.');
      } else if (
        locationList.length == 0 &&
        (getType == '3' || getType == '2')
      ) {
        ToastComponent('지역을 선택해주세요.');
      } else if (BasicInfo.title == '') {
        ToastComponent('제목을 입력해주세요.');
      } else if (BasicInfo.price == 0) {
        ToastComponent('판매가를 입력해주세요.');
      } else if (imageList.length == 0) {
        ToastComponent('대표 상품 이미지를 선택해주세요.');
      } else if (imageList.length == 1) {
        ToastComponent('상품 이미지를 선택해주세요.');
      } else if (imageList.length == 1) {
        ToastComponent('상품 이미지를 선택해주세요.');
      } else if (policyList.length == 0 && getType == '3') {
        ToastComponent('취소/환불 규정을 입력해주세요.');
      } else if (
        policyList.filter((item) => item.type == 1).length == 0 &&
        getType == '3'
      ) {
        ToastComponent('취소/환불 기본 규정을 입력해주세요.');
      } else if (optionList.length == 0) {
        ToastComponent('옵션을 선택해 입력해주세요.');
      } else if (optionList.length >= 1000) {
        ToastComponent('옵션은 1000개까지 등록 가능합니다.');
      } else {
        const body: PatchUpdateGoodsStatusParmaType = {
          itemCode: itemCode,
          itemId: detailData?.data.itemId,
          data: {
            sort: BasicInfo.sort,
            status: BasicInfo.status,
            title: BasicInfo.title,
            basicInfo: BasicInfo.basicInfo,
            detailInfo: BasicInfo.detailInfo,
            reservationInfo: BasicInfo.reservationInfo,
            content: EditorContent,
            orderSameDay: BasicInfo.orderSameDay,
            orderCloseBefore: BasicInfo.orderCloseBefore,
            type: BasicInfo.type,
            level: BasicInfo.level,
            forSale: BasicInfo.forSale,
            priceNet: BasicInfo.priceNet,
            priceDcPer: BasicInfo.priceDcPer,
            priceDc: BasicInfo.priceDc,
            price: BasicInfo.price,
            optionType: BasicInfo.optionType,
            viewStartDate: BasicInfo.viewStartDate,
            viewEndDate: BasicInfo.viewEndDate,
            attributes: attributeList,
            categories: categoryList,
            locations: locationList,
            optionInputType: BasicInfo.optionInputType,
            optionInputStartDate: BasicInfo.optionInputStartDate,
            optionInputEndDate: BasicInfo.optionInputEndDate,
            images: imageList,
            schedules: planList,
            policies: policyList,
            optionInputs: optionInputList,
            options: optionList,
            requiredPartnerCancelConfirm:
              BasicInfo.requiredPartnerCancelConfirm,
          },
        };

        PatchUpdateGoodsMutate(body);
      }
    } else if (selectMenu == 2) {
      const body: PatchGoodsStatusParmaType = {
        itemCode: itemCode,
        itemId: detailData?.data.itemId,
        data: {
          autoConfirm: BasicInfo.autoConfirm,
          orderSameDay: BasicInfo.orderSameDay,
          level: BasicInfo.level,
          forSale: BasicInfo.forSale,
          viewStartDate: BasicInfo.viewStartDate,
          viewEndDate: BasicInfo.viewEndDate,
        },
      };
      PatchStstusMutate(body);
    } else if (selectMenu == 3) {
      const body: PatchOptionStockType = {
        itemCode: itemCode,
        itemId: detailData?.data.itemId,
        data: { options: optionModifyList },
      };
      optionModifyMutate(body);
    }
  };
  useEffect(() => {
    setLoadingModal(isLoading);
    setShouldFetch(false);
  }, [isLoading]);
  const previewData = {
    type: getType,
    title: BasicInfo.title,
    basicInfo: BasicInfo.basicInfo,
    detailInfo: BasicInfo.detailInfo,
    reservationInfo: BasicInfo.reservationInfo,
    content: EditorContent,
    orderSameDay: BasicInfo.orderSameDay,
    level: BasicInfo.level,
    forSale: BasicInfo.forSale,
    priceNet: BasicInfo.priceNet,
    priceDcPer: BasicInfo.priceDcPer,
    priceDc: BasicInfo.priceDc,
    price: BasicInfo.price,
    optionType: BasicInfo.optionType,
    viewStartDate: BasicInfo.viewStartDate,
    viewEndDate: BasicInfo.viewEndDate,
    attributes: attributeList,
    categories: CatePreList,
    locations: locationPreList,
    optionInputType: BasicInfo.optionInputType,
    optionInputStartDate: BasicInfo.optionInputStartDate,
    optionInputEndDate: BasicInfo.optionInputEndDate,
    images: imageList,
    schedules: planList,
    policies: policyList,
    optionInputs: optionInputList,
    options: optionList,
    autoConfirm: BasicInfo.autoConfirm,
    requiredPartnerCancelConfirm: BasicInfo.requiredPartnerCancelConfirm,
  };
  return (
    <>
      <PreviewDrawerComponent
        data={previewData}
        isOpen={isPreviewModal}
        onClose={() => setIsPreviewModal(false)}
      />
      <LoadingModal
        children={isLoadingModal}
        isOpen={isLoadingModal}
        onClose={() => setLoadingModal(false)}
      />
      <AlertModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      {detailData?.success == true ? (
        <Flex
          w={'100%'}
          flexDirection={'column'}
          position={'relative'}
          borderRadius={'16px'}
        >
          <Flex
            justifyContent={'space-between'}
            pt={'70px'}
            pb={'15px'}
            px={'60px'}
            position={'sticky'}
            top={'72px'}
            bgColor={ColorWhite}
            zIndex={10}
            borderTopRadius={'10px'}
            flexDirection={'column'}
          >
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Flex alignItems={'center'}>
                <Image
                  src={'/images/Page/ico_goods.png'}
                  width={'20px'}
                  height={'20px'}
                  alt="상품관리"
                />
                <Text
                  fontWeight={800}
                  fontSize={'22px'}
                  color={ColorBlack00}
                  pl={'10px'}
                  pr={'15px'}
                >
                  상품수정
                </Text>
                <Text color={ColorGray700} fontSize={'15px'} fontWeight={400}>
                  상품코드
                </Text>
                <Text
                  color={ColorBlack}
                  fontSize={'15px'}
                  fontWeight={700}
                  pl={'10px'}
                >
                  {detailData?.data.itemCode}
                </Text>
              </Flex>
              <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
                <CustomButton
                  text="미리보기"
                  borderColor={ColorGray400}
                  color={ColorGray700}
                  px="44px"
                  py="13px"
                  bgColor={ColorWhite}
                  fontSize="15px"
                  onClick={() => {
                    setIsPreviewModal(true);
                  }}
                />
                {selectMenu == 1 && (
                  <CustomButton
                    text="취소"
                    borderColor={ColorGray400}
                    color={ColorGray700}
                    px="44px"
                    py="13px"
                    bgColor={ColorWhite}
                    fontSize="15px"
                    onClick={() => {
                      setOpenAlertModal(true);
                      setModalState({
                        ...ModalState,
                        title: '상품 수정',
                        message: `작성중인 내용을 취소하시겠습니까?`,
                        type: 'confirm',
                        okButtonName: '확인',
                        cbOk: () => {
                          // deleteMutate(String(getEntryId));
                          // setLoadingModal(true);
                          // window.history.back();
                          router.back();
                        },
                      });
                    }}
                  />
                )}

                <CustomButton
                  text={'수정'}
                  borderColor={ColorRed}
                  color={ColorWhite}
                  px={selectMenu == 1 ? '44px' : '31.5px'}
                  py="13px"
                  bgColor={ColorRed}
                  fontSize="15px"
                  onClick={() => {
                    setOpenAlertModal(true);
                    setModalState({
                      ...ModalState,
                      title: '상품 수정',
                      message: `상품을 ${selectMenu == 1 ? '저장' : '업데이트'
                        }하시겠습니까?`,
                      type: 'confirm',
                      okButtonName: '확인',
                      cbOk: () => {
                        onSubmit(selectMenu);
                      },
                    });
                  }}
                />
              </Flex>
            </Flex>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Flex
                borderRadius={'12px'}
                py={'10px'}
                px={'11px'}
                bgColor={ColorGray50}
              >
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={selectMenu == 1 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setSelectMenu(1)}
                  cursor={'pointer'}
                >
                  <Text
                    color={selectMenu == 1 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    상품수정
                  </Text>
                </Flex>
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={selectMenu == 2 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setSelectMenu(2)}
                  cursor={'pointer'}
                >
                  <Text
                    color={selectMenu == 2 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    판매상태변경
                  </Text>
                </Flex>
                {/* {BasicInfo.type == 3 && ( */}
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={selectMenu == 3 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setSelectMenu(3)}
                  cursor={'pointer'}
                >
                  <Text
                    color={selectMenu == 3 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    재고수정
                  </Text>
                </Flex>
                {/* )} */}
              </Flex>
            </Flex>
          </Flex>
          <Box
            px={'60px'}
            pb={'60px'}
            bgColor={ColorWhite}
            borderBottomRadius={'16px'}
          >
            <GoodsPartner
              itemCode={String(getItemCode)}
              itemId={String(BasicInfo?.itemId)}
              BasicInfo={BasicInfo}
              partnerInfo={partnerInfo}
              setSelectLog={setSelectLog}
            />

            {selectMenu == 1 && (
              <GoodsModify
                CatePreList={CatePreList}
                setCatePreList={setCatePreList}
                CateGetList={CateGetList}
                setCateGetList={setCateGetList}
                categoryList={categoryList}
                setCategoryList={setCategoryList}
                locationList={locationList}
                setLocationList={setLocationList}
                locationPreList={locationPreList}
                setLocationPreList={setLocationPreList}
                BasicInfo={BasicInfo}
                setBasicInfo={setBasicInfo}
                imageList={imageList}
                setImageList={setImageList}
                attributeList={attributeList}
                setAttributeList={setAttributeList}
                planList={planList}
                setPlanList={setPlanList}
                policyList={policyList}
                setPolicyList={setPolicyList}
                locationGetList={locationGetList}
                setLocationGetList={setLocationGetList}
                optionList={optionList}
                setOptionList={setOptionList}
                optionInputList={optionInputList}
                setOptionInputList={setOptionInputList}
                EditorContent={EditorContent}
                setEditorContent={setEditorContent}
              />
            )}
            {selectMenu == 2 && (
              <StatusComponent list={BasicInfo} setList={setBasicInfo} />
            )}
            {selectMenu == 3 && (
              <ModifyOptionComponent
                list={BasicInfo}
                optionList={optionList}
                setOptionList={setOptionList}
                optionModifyList={optionModifyList}
                setOptionModifyList={setOptionModifyList}
              />
            )}
          </Box>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
}

export default UpdateGoodDetail;
