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
import CancelComponent from '@/components/goods/CancelComponent';
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
  StatusProps,
  optionInputsProps,
} from '@/app/apis/goods/GoodsApi.type';
import goodsApi from '@/app/apis/goods/GoodsApi';
import Partner from './Partner';
import PartnerDetailTab from './PartnerDetailTab';
import PartnerBasicInfo from './PartnerBasicInfo';
import PartnerConnectInfo from './PartnerConnectInfo';
import PartnerPayDataTable from './PartnerPayDataTable';
import partnersApi from '@/app/apis/partners/PartnersApi';
import PartnerShippingInfo from './PartnerShippingInfo';
import PartnerServiceInfo from './PartnerServiceInfo';

interface CategoryListProps {
  categoryId: number;
}
interface LocationListProps {
  locationId: number;
}
function UpdatePartnerDetail() {
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
  const getPertnerId = searchParams.get('partnerId');
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [selectMenu, setSelectMenu] = useState(1);
  const [tab, setTab] = useState(1);
  const [BasicInfo, setBasicInfo] = useState<GoodsBasicProps>({
    itemId: '',
    title: '', //상품 명
    basicInfo: '', //상품 기본정보
    detailInfo: '', //상품 상세설명
    content: '', //상품 상세설명(에디터)
    reservationInfo: '', //상품 예약전 확인사항
    sort: 1, //상품 정렬
    type: Number(1), //상품 유형 (미사용)
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
      lat: '',
      lng: '',
      images: [
        {
          imagePath: '',
          thumbnailImagePath: '',
        },
      ],
    },
  ]);

  //상세
  const {
    data: info,
    isLoading: isLoading,
    error,
    refetch
  } = useQuery(['commerce_detail', getPertnerId], () =>
    partnersApi.GetPartnersDetail(String(getPertnerId)),
  );

  return (
    <>
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
        <Box
          pb={'60px'}
          bgColor={ColorWhite}
          borderBottomRadius={'16px'}
          pt={'67px'}
        >
          <Flex alignItems={'center'} mb={'20px'}>
            <Image
              src={'/images/Page/subtopicon01.png'}
              width={'20px'}
              height={'23px'}
              alt="상품관리"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              파트너사 상세보기
            </Text>
          </Flex>
          <Partner
            itemCode={String(getPertnerId)}
            itemId={String(BasicInfo.itemId)}
            info={info && info.data}
          />
          <PartnerDetailTab setTab={tab} onTab={(t: number) => setTab(t)} />
          {tab == 1 && <PartnerBasicInfo info={info && info.data} />}
          {tab == 2 && <PartnerConnectInfo info={info?.data} />}
          {tab == 3 && <PartnerShippingInfo info={info?.data} />}
          {tab == 4 && <PartnerServiceInfo info={info?.data} refresh={() => refetch()}/>}
        </Box>
      </Flex>
    </>
  );
}

export default UpdatePartnerDetail;
