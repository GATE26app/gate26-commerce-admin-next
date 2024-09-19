import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
  CategoryResProps,
  GoodsAttributeListProps,
  GoodsBasicProps,
  GoodsDetailBasicProps,
  GoodsListItemImageProps,
  GoodsPoliciesListProps,
  GoodsSchedulesListProps,
  LocationResProps,
  OptionItemProps,
  optionInputsProps,
} from '@/app/apis/goods/GoodsApi.type';
import CatagoryComponent from './CatagoryComponent';
import CountryComponent from './CountryComponent';
import GoodNameComponent from './GoodNameComponent';
import PriceComponent from './PriceComponent';
import ImageComponent from './ImageComponent';
import DivisionComponent from './DivisionComponent';
import InfoComponent from './InfoComponent';
import DetailComponent from './DetailComponent';
import PlanComponent from './PlanComponent';
import BookingCheckComponent from './BookingCheckComponent';
import CancelComponent from './CancelComponent';
import EditorDetailComponent from './EditorDetailComponent';
import OptionComponent from './OptionComponent';
import ShippingComponent from './ShippingComponent';

interface CategoryListProps {
  categoryId: number;
}
interface LocationListProps {
  locationId: number;
}

interface Props {
  CateGetList: CategoryResProps[];
  setCateGetList: React.Dispatch<React.SetStateAction<CategoryResProps[]>>;
  BasicInfo: GoodsBasicProps;
  setBasicInfo: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
  imageList: GoodsListItemImageProps[];
  setImageList: React.Dispatch<React.SetStateAction<GoodsListItemImageProps[]>>;
  categoryList: CategoryListProps[];
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryListProps[]>>;
  locationList: LocationListProps[];
  setLocationList: React.Dispatch<React.SetStateAction<LocationListProps[]>>;
  attributeList: GoodsAttributeListProps[];
  setAttributeList: React.Dispatch<
    React.SetStateAction<GoodsAttributeListProps[]>
  >;
  planList: GoodsSchedulesListProps[];
  setPlanList: React.Dispatch<React.SetStateAction<GoodsSchedulesListProps[]>>;
  policyList: GoodsPoliciesListProps[];
  setPolicyList: React.Dispatch<React.SetStateAction<GoodsPoliciesListProps[]>>;
  locationGetList: LocationResProps[];
  setLocationGetList: React.Dispatch<React.SetStateAction<LocationResProps[]>>;
  // goodsItemList: GoodsItemProps[];
  // setGoodsItemList: React.Dispatch<React.SetStateAction<GoodsItemProps[]>>;
  optionList: OptionItemProps[];
  setOptionList: React.Dispatch<React.SetStateAction<OptionItemProps[]>>;
  optionInputList: optionInputsProps[];
  setOptionInputList: React.Dispatch<React.SetStateAction<optionInputsProps[]>>;
  CatePreList: CategoryResProps[];
  setCatePreList: React.Dispatch<React.SetStateAction<CategoryResProps[]>>;
  locationPreList: LocationResProps[];
  setLocationPreList: React.Dispatch<React.SetStateAction<LocationResProps[]>>;
  EditorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
}
function GoodsModify({
  categoryList,
  setCategoryList,
  BasicInfo,
  setBasicInfo,
  imageList,
  setImageList,
  attributeList,
  setAttributeList,
  planList,
  setPlanList,
  CateGetList,
  setCateGetList,
  locationList,
  setLocationList,
  policyList,
  setPolicyList,
  locationGetList,
  setLocationGetList,
  optionList,
  setOptionList,
  optionInputList,
  setOptionInputList,
  CatePreList,
  setCatePreList,
  locationPreList,
  setLocationPreList,
  EditorContent,
  setEditorContent,
}: // locationGetList,
// setLocationGetList,
// goodsItemList,
// setGoodsItemList,
Props) {
  const router = useRouter();
  // const [categoryList, setCategoryList] = useState<CategoryListProps[]>([]);
  // const [locationList, setLocationList] = useState<LocationListProps[]>([]);
  return (
    <>
      <CatagoryComponent
        list={categoryList}
        setList={setCategoryList}
        // list={categoryList}
        // setList={setCategoryList}
        getList={CateGetList}
        setGetList={setCateGetList}
        CatePreList={CatePreList}
        setCatePreList={setCatePreList}
      />
      {(BasicInfo.type == 3 || BasicInfo.type == 2) && (
        <CountryComponent
          list={locationList}
          setList={setLocationList}
          // list={locationList}
          // setList={setLocationList}
          getList={locationGetList}
          setGetList={setLocationGetList}
          locationPreList={locationPreList}
          setLocationPreList={setLocationPreList}
        />
      )}

      <GoodNameComponent list={BasicInfo} setList={setBasicInfo} />
      <PriceComponent list={BasicInfo} setList={setBasicInfo} />
      {BasicInfo.type == 1 && <ShippingComponent list={BasicInfo} />}
      <ImageComponent list={imageList} setList={setImageList} />
      {BasicInfo.type == 3 && (
        <DivisionComponent list={attributeList} setList={setAttributeList} />
      )}
      <InfoComponent list={BasicInfo} setList={setBasicInfo} />
      <DetailComponent list={BasicInfo} setList={setBasicInfo} />
      {BasicInfo.type == 3 && (
        <>
          <PlanComponent list={planList} setList={setPlanList} />
          <BookingCheckComponent list={BasicInfo} setList={setBasicInfo} />
          <CancelComponent list={policyList} setList={setPolicyList} />
        </>
      )}

      <EditorDetailComponent list={EditorContent} setList={setEditorContent} />
      <OptionComponent
        list={BasicInfo}
        setList={setBasicInfo}
        optionList={optionList}
        setOptionList={setOptionList}
        optionInputList={optionInputList}
        setOptionInputList={setOptionInputList}
      />
    </>
  );
}

export default GoodsModify;
