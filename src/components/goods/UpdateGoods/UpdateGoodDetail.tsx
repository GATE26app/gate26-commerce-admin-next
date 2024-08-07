import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

// import StatusComponent from '@/components/Goods/_fragments/StatusComponent';
import CustomButton from '@/components/common/CustomButton';
// import LogSelectBox from '@/components/common/LogSelectBox';

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

// import { useGoodsStateZuInfo } from '_store/StateZuInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import StatusComponent from '@/components/goods/StatusComponent';
import GoodsModify from '@/components/goods/GoodsModify';
import ModifyOptionComponent from '@/components/goods/ModifyOptionComponent';
import { useRouter, useSearchParams } from 'next/navigation';
import GoodsPartner from '@/components/goods/UpdateGoods/GoodsPartner';
import CatagoryComponent from '@/components/goods/CatagoryComponent';
import CountryComponent from '@/components/goods/CountryComponent';
import GoodNameComponent from '@/components/goods/GoodNameComponent';
import PriceComponent from '@/components/goods/PriceComponent';
import ImageComponent from '@/components/goods/ImageComponent';
import DivisionComponent from '@/components/goods/DivisionComponent';
import InfoComponent from '@/components/goods/InfoComponent';
import DetailComponent from '@/components/goods/DetailComponent';
import PlanComponent from '@/components/goods/PlanComponent';
import BookingCheckComponent from '@/components/goods/BookingCheckComponent';
import CancleComponent from '@/components/goods/CancleComponent';
import EditorDetailComponent from '@/components/goods/EditorDetailComponent';
import OptionComponent from '@/components/goods/OptionComponent';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import {
  CategoryResProps,
  GoodsAttributeListProps,
  GoodsBasicProps,
  GoodsItemProps,
  GoodsListItemImageProps,
  GoodsOptionStockModifyType,
  GoodsPoliciesListProps,
  GoodsSchedulesListProps,
  LocationResProps,
  OptionItemProps,
  PartnerType,
  StatusProps,
  optionInputsProps,
} from '@/app/apis/goods/GoodsApi.type';
import goodsApi from '@/app/apis/goods/GoodsApi';

interface CategoryListProps {
  categoryId: number;
}
interface LocationListProps {
  locationId: number;
}
function UpdateGoodDetail() {
  const router = useRouter();
  const toast = useToast();
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
  const searchParams = useSearchParams();
  const getType = searchParams.get('type');
  const getItemCode = searchParams.get('itemcode');
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [selectMenu, setSelectMenu] = useState(1);
  const [optionList, setOptionList] = useState<OptionItemProps[]>([]);
  const [CateGetList, setCateGetList] = useState<CategoryResProps[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryListProps[]>([]); //수정시 전달한 리스트
  const [locationGetList, setLocationGetList] = useState<LocationResProps[]>(
    [],
  );

  const [goodsItemList, setGoodsItemList] = useState<GoodsItemProps[]>([]);
  const [locationList, setLocationList] = useState<LocationListProps[]>([]); //수정시 전달한 리스트
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
  const [partnerInfo, setPartnerInfo] = useState<PartnerType>();
  // const [partnerInfo, setPartnerInfo] = useState({
  //   partnerId: '',
  //   loginId: '',
  //   level: 0,
  //   levelName: '',
  //   status: 0,
  //   statusName: '',
  //   type: 0,
  //   typeName: '',
  //   title: '',
  //   images: [],
  // });
  // const [partnerImage]
  const [BasicInfo, setBasicInfo] = useState<GoodsBasicProps>({
    itemId: '',
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
    status: 0, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
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
  });
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
      lat: 0,
      lng: 0,
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

  //상품상세
  const { data: detailData, isLoading } = useQuery(
    ['GET_GOODSDETAIL', itemCode],
    () => goodsApi.getGoodsDetail(itemCode),
    {
      staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!itemCode,
      onSuccess: ({ data }) => {
        setOptionList(data.options);
        setStatusList({
          forSale: data.forSale,
          level: data.level,
          viewStartDate: data.viewStartDate,
          viewEndDate: data.viewEndDate,
        });
        setCateGetList(data.categories);
        setLocationGetList(data.locations);
        setGoodsItemList(data);
        setAttributeList(data.attributes);
        setBasicInfo({
          itemId: data.itemId,
          title: data.title, //상품 명
          basicInfo: data.basicInfo, //상품 기본정보
          detailInfo: data.detailInfo, //상품 상세설명
          content: data.content, //상품 상세설명(에디터)
          reservationInfo: data.reservationInfo, //상품 예약전 확인사항
          sort: data.sort, //상품 정렬
          type: data.type, //상품 유형 (미사용)
          orderSameDay: data.orderSameDay, //상품 이용일시 당일판매, 0=>가능, 1=>불가능
          orderCloseBefore: data.orderCloseBefore, //상품 판매마감처리, 0=>해당없음, N시간전 판매마감
          level: data.level, //상품 레벨, 1=>노출, 2=>미노출, 10=>삭제
          viewStartDate: data.viewStartDate, //노출 시작일시
          viewEndDate: data.viewEndDate, //노출 종료일시
          status: data.status, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
          forSale: data.forSale, //판매 상태, 1=>판매중, 2=>판매안함, 10=>품절
          priceNet: data.priceNet, //상품 판매금액, 기본할인전
          priceDcPer: data.priceDcPer, //상품 기본할인율
          priceDc: data.priceDc, //상품 기본할인금액
          price: data.price, //상품 판매금액, 기본할인후
          optionType: data.optionType, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
          optionInputType: data.optionInputType, //상품 옵션입력 유형, 0=>단독형, 1=>조합형
          optionInputStartDate: data.optionInputStartDate, //상품 옵션입력 이용일시 생성구간 시작일
          optionInputEndDate: data.optionInputEndDate, //상품 옵션입력 이용일시 생성구간 종료일
          autoConfirm: data.autoConfirm,
          partnerTitle: data.partnerTitle, //파트너사명
          requestDate: data.requestDate, //상품승인요청일
          approvalDate: data.approvalDate, //상품승인일
          deniedDate: data.deniedDate, //상품반려일
          deniedReason: data.deniedReason,
        });
        setPlanList(data.schedules);
        setPolicyList(data.policies);
        setOptionInputList(data.optionInputs);
        setImageList(data.images);
        setPartnerInfo(data.partner);
      },
    },
  );

  // useEffect(() => {
  //   if (
  //     goodsInfo.LogItemDisable == true &&
  //     detailData?.data?.itemId == BasicInfo.itemId
  //   ) {
  //     setGoodsInfo({
  //       LogItemDisable: false,
  //     });
  //   }
  // }, [BasicInfo]);
  // //상품 수정[버전변경]
  // const { mutate: PatchUpdateGoodsMutate } = usePatchUpdateGoodsStatusMutation({
  //   options: {
  //     onSuccess: (res) => {
  //       if (res.success == true) {
  //         router.back();
  //       } else {
  //         toast({
  //           position: 'top',
  //           duration: 3000,
  //           render: () => (
  //             <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
  //               {`${res.message}`}
  //             </Box>
  //           ),
  //         });
  //       }
  //     },
  //   },
  // });
  // //노출여부, 노출기간, 판매여부
  // const { mutate: PatchStstusMutate } = usePatchGoodsStatusMutation({
  //   options: {
  //     onSuccess: (res) => {
  //       if (res.success == true) {
  //         router.back();
  //       } else {
  //         toast({
  //           position: 'top',
  //           duration: 3000,
  //           render: () => (
  //             <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
  //               {`${res.message}`}
  //             </Box>
  //           ),
  //         });
  //       }
  //     },
  //   },
  // });

  // //
  // const { mutate: optionModifyMutate } = usePatchOptionModifyMutation({
  //   options: {
  //     onSuccess: (res) => {
  //       if (res.success == true) {
  //         router.back();
  //       } else {
  //         toast({
  //           position: 'top',
  //           duration: 3000,
  //           render: () => (
  //             <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
  //               {`${res.message}`}
  //             </Box>
  //           ),
  //         });
  //       }
  //     },
  //   },
  // });

  // const onSubmit = (selectMenu: number, status?: number) => {
  //   if (selectMenu == 1) {
  //     const body: PatchUpdateGoodsStatusParmaType = {
  //       itemCode: itemCode,
  //       itemId: detailData?.data.itemId,
  //       data: {
  //         sort: BasicInfo.sort,
  //         status: 2,
  //         title: BasicInfo.title,
  //         basicInfo: BasicInfo.basicInfo,
  //         detailInfo: BasicInfo.detailInfo,
  //         reservationInfo: BasicInfo.reservationInfo,
  //         content: BasicInfo.content,
  //         orderSameDay: BasicInfo.orderSameDay,
  //         orderCloseBefore: BasicInfo.orderCloseBefore,
  //         type: BasicInfo.type,
  //         level: 1,
  //         forSale: 1,
  //         priceNet: BasicInfo.priceNet,
  //         priceDcPer: BasicInfo.priceDcPer,
  //         priceDc: BasicInfo.priceDc,
  //         price: BasicInfo.price,
  //         optionType: 1,
  //         viewStartDate: BasicInfo.viewStartDate,
  //         viewEndDate: BasicInfo.viewEndDate,
  //         attributes: attributeList,
  //         categories: categoryList,
  //         locations: locationList,
  //         optionInputType: BasicInfo.optionInputType,
  //         optionInputStartDate: BasicInfo.optionInputStartDate,
  //         optionInputEndDate: BasicInfo.optionInputEndDate,
  //         images: imageList,
  //         schedules: planList,
  //         policies: policyList,
  //         optionInputs: optionInputList,
  //         options: optionList,
  //       },
  //     };

  //     PatchUpdateGoodsMutate(body);
  //   } else if (selectMenu == 2) {
  //     const body: PatchGoodsStatusParmaType = {
  //       itemCode: itemCode,
  //       itemId: detailData?.data.itemId,
  //       data: {
  //         level: BasicInfo.level,
  //         forSale: BasicInfo.forSale,
  //         viewStartDate: BasicInfo.viewStartDate,
  //         viewEndDate: BasicInfo.viewEndDate,
  //       },
  //     };
  //     PatchStstusMutate(body);
  //   } else if (selectMenu == 3) {
  //     const body: PatchOptionStockType = {
  //       itemCode: itemCode,
  //       itemId: detailData?.data.itemId,
  //       data: { options: optionModifyList },
  //     };
  //     optionModifyMutate(body);
  //   }
  // };
  return (
    <>
      {/* {detailData !== undefined ? ( */}
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
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
          px={'60px'}
          position={'sticky'}
          top={'95px'}
          bgColor={ColorWhite}
          zIndex={999}
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
                상품관리
              </Text>
            </Flex>
            <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
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
                      title: '취소',
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
                    // dispatch(
                    //   customModalSliceAction.setMessage({
                    //     title: '상품 수정',
                    //     message: `작성중인 내용을 취소하시겠습니까?`,
                    //     type: 'confirm',
                    //     okButtonName: '확인',
                    //     cbOk: () => {
                    //       router.back();
                    //       // window.history.back();
                    //     },
                    //   }),
                    // );
                    // openCustomModal();
                  }}
                />
              )}

              <CustomButton
                text={selectMenu == 1 ? '저장' : '업데이트'}
                borderColor={ColorRed}
                color={ColorWhite}
                px={selectMenu == 1 ? '44px' : '31.5px'}
                py="13px"
                bgColor={ColorRed}
                fontSize="15px"
                onClick={() => {
                  // dispatch(
                  //   customModalSliceAction.setMessage({
                  //     title: '상품 수정',
                  //     message: `상품을 ${
                  //       selectMenu == 1 ? '저장' : '업데이트'
                  //     }하시겠습니까?`,
                  //     type: 'confirm',
                  //     okButtonName: '확인',
                  //     cbOk: () => {
                  //       onSubmit(selectMenu);
                  //       // window.history.back();
                  //     },
                  //   }),
                  // );
                  // openCustomModal();
                }}
              />
            </Flex>
          </Flex>
          {/* <Flex justifyContent={'space-between'} alignItems={'center'}>
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
                  취소
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
                  저장
                </Text>
              </Flex>
            </Flex>
          </Flex> */}
        </Flex>
        <Box
          px={'60px'}
          pb={'60px'}
          bgColor={ColorWhite}
          borderBottomRadius={'16px'}
        >
          <GoodsPartner
            itemCode={String(getItemCode)}
            itemId={String(BasicInfo.itemId)}
            BasicInfo={BasicInfo}
            partnerInfo={partnerInfo}
            // title={BasicInfo?.partnerTitle}
          />
          {/* <CatagoryComponent list={categoryList} setList={setCategoryList} />
          {(getType == '3' || getType == '2') && (
            <>
              <CountryComponent list={locationList} setList={setLocationList} />
            </>
          )}
          <GoodNameComponent list={BasicInfo} setList={setBasicInfo} />
          <PriceComponent list={BasicInfo} setList={setBasicInfo} />
          <ImageComponent list={imageList} setList={setImageList} />
          {getType == '3' && (
            <DivisionComponent
              list={attributeList}
              setList={setAttributeList}
            />
          )}
          <InfoComponent list={BasicInfo} setList={setBasicInfo} />
          <DetailComponent list={BasicInfo} setList={setBasicInfo} />
          {getType == '3' && (
            <>
              <PlanComponent list={planList} setList={setPlanList} />
              <BookingCheckComponent list={BasicInfo} setList={setBasicInfo} />
              <CancleComponent list={policyList} setList={setPolicyList} />
            </>
          )}
          <EditorDetailComponent list={BasicInfo} setList={setBasicInfo} />
          <OptionComponent
            list={BasicInfo}
            setList={setBasicInfo}
            optionList={optionList}
            setOptionList={setOptionList}
            optionInputList={optionInputList}
            setOptionInputList={setOptionInputList}
          />
          <StatusComponent list={BasicInfo} setList={setBasicInfo} /> */}
          {/* {selectMenu == 1 && (
              <GoodsModify
                // watch={watch}
                CateGetList={CateGetList}
                setCateGetList={setCateGetList}
                categoryList={categoryList}
                setCategoryList={setCategoryList}
                locationList={locationList}
                setLocationList={setLocationList}
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
                // goodsItemList={goodsItemList}
                // setGoodsItemList={setGoodsItemList}
              />
            )}
            {selectMenu == 2 && (
              <StatusComponent list={BasicInfo} setList={setBasicInfo} />
            )}
            {selectMenu == 3 && (
              <ModifyOptionComponent
                optionList={optionList}
                setOptionList={setOptionList}
                optionModifyList={optionModifyList}
                setOptionModifyList={setOptionModifyList}
              />
            )} */}
        </Box>
      </Flex>
      {/* ) : (
        <></>
      )} */}
    </>
  );
}

export default UpdateGoodDetail;
