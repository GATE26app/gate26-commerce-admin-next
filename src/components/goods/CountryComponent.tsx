import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { LocationListProps } from './SaveGoods/SaveGoodsPageComponent';
import { LocationResProps } from '@/app/apis/goods/GoodsApi.type';
import goodsApi from '@/app/apis/goods/GoodsApi';
import LocationSelectBox from '../common/SelectBox/LocationSelectBox';

interface LocationProps {
  locations: Array<LocationProps[]>;
  locationId: number;
  depth: number;
  level: number;
  sort: number;
  title: string;
}
interface SelectListProps {
  locationId: number;
  level1Name: string;
  level2Name: string;
}
export type { LocationProps };
interface Props {
  list: Array<LocationListProps>;
  setList: React.Dispatch<React.SetStateAction<LocationListProps[]>>;
  getList?: Array<LocationResProps>;
  setGetList?: React.Dispatch<React.SetStateAction<LocationResProps[]>>;
  locationPreList: Array<LocationResProps>;
  setLocationPreList: React.Dispatch<React.SetStateAction<LocationResProps[]>>;
}
function CountryComponent({
  list,
  setList,
  getList,
  setGetList,
  locationPreList,
  setLocationPreList,
}: Props) {
  const toast = useToast();
  const [select, setSelect] = useState('');
  const [city, setCity] = useState('');
  const [alllist, setAllList] = useState<any>([]);
  const [LocationList, setLocationList] = useState<LocationProps[]>([]);
  const [level2LocaList, setLevel2LocaList] = useState<any>([]); // 2차 카테고리
  const [selectList, setSelectList] = useState<SelectListProps[]>([]);
  const [onSuccess, setOnSuccess] = useState(false);
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  // const { data, isLoading } = useGetLocationQuery();
  // const { data } = useGetLocationQuery({
  //   options: {
  //     onSuccess: (res) => {
  //       if (res.success == true) {
  //         setAllList(res.data);
  //         if (res.data) {
  //           setLocationList(res.data);
  //         }
  //       }
  //     },
  //   },
  // });
  // });
  const {
    data: LoacionData,
    error,
    isLoading,
  } = useQuery('location', goodsApi.getLoation, {
    staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
    refetchInterval: false, // 자동 새로 고침 비활성화
  });
  useEffect(() => {
    if (LoacionData?.success && LoacionData.data && !onSuccess) {
      setAllList(LoacionData.data);
      setLocationList(LoacionData.data);
    }
  }, [LoacionData, onSuccess]);

  //수정시 카테고리에 데이터 넣기
  useEffect(() => {
    if (getList) {
      const result: SelectListProps[] = [];
      getList.forEach((item) => {
        result.push({
          level1Name:
            item.depth == 1 ? item.title : item.fullTitle.split('>')[0],
          level2Name: item.depth == 1 ? '' : item.title,
          locationId: item.locationId,
        });
      });

      setSelectList(result);
      const resultId: LocationListProps[] = [];
      getList.forEach((item) => {
        resultId.push({
          locationId: item.locationId,
        });
      });
      setList(resultId);
    }
  }, [getList]);

  //1차카테고리 선택
  const onClickFirstLocation = (id: number, data: string) => {
    let arr = [];
    arr.push(LocationList.filter((item) => item.locationId == id)[0]);
    setCity('');

    let allObject = {
      locationId: arr[0].locationId,
      title: '전체',
      sort: 0,
      level: 2,
      depth: 2,
      locations: [],
    };

    setLevel2LocaList([
      allObject,
      ...LocationList.filter((item) => item.locationId == id).map(
        (prev) => prev.locations,
      )[0],
    ]);
  };

  //2차 카테고리 선택
  const onClickSecondlocation = (id: number, data: string) => {
    let oneObject = {
      level1Name: select,
      level2Name: data == '전체' ? '' : data,
      locationId: id,
    };
    let locations = {
      locationId: id,
    };
    if (selectList.some((arr) => arr.locationId == id) == false) {
      setSelectList([...selectList, oneObject]);
      setCity('');
      setSelect('');
      setList([...list, locations]);
      setLevel2LocaList([]);
    } else {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            이미 등록된 나라/도시입니다.
          </Box>
        ),
      });
    }
  };

  //카테고리 삭제
  const onDeleteClick = (idx: number) => {
    if (selectList.some((arr) => arr.locationId === idx)) {
      setSelectList(selectList.filter((item) => idx !== item.locationId));
      setList(list.filter((item) => idx !== item.locationId));
    }
  };
  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderBottomWidth={0}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
      >
        <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
          나라/도시
        </Text>
        <Text color={ColorRed} fontWeight={800} ml={'3px'} lineHeight={'12px'}>
          *
        </Text>
      </Flex>
      <Flex
        px={'30px'}
        py={'20px'}
        w={'100%'}
        flexDirection={'column'}
        borderWidth={1}
        borderColor={ColorGray400}
        borderBottomRadius={'12px'}
      >
        <Flex mb={'20px'} gap={'10px'} flexWrap={'wrap'}>
          <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
            <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
              나라
            </Text>
            <LocationSelectBox
              placeholder="1차 카테고리 선택"
              width={'311px'}
              list={LocationList}
              select={select}
              setSelect={setSelect}
              onClick={onClickFirstLocation}
              disable={goodsInfo.LogItemDisable}
            />
          </Flex>
          <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
            <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
              도시
            </Text>

            <LocationSelectBox
              placeholder="2차 카테고리 선택"
              width={'311px'}
              list={level2LocaList}
              select={city}
              setSelect={setCity}
              onClick={onClickSecondlocation}
              disable={goodsInfo.LogItemDisable}
            />
          </Flex>
        </Flex>
        <Flex
          borderRadius={'12px'}
          bgColor={ColorGray100}
          p={'20px'}
          gap={'20px'}
        >
          <Text
            fontWeight={700}
            fontSize={'16px'}
            color={ColorBlack}
            flexShrink={0}
          >
            선택한 카테고리
          </Text>
          <Flex flexWrap={'wrap'} gap={'20px'}>
            {selectList.map((item, index) => {
              return (
                <Flex
                  key={index}
                  flexDirection={'row'}
                  gap={'5px'}
                  alignItems={'center'}
                >
                  <Text fontSize={'16px'} fontWeight={400} color={ColorBlack}>
                    {item.level1Name}
                  </Text>
                  {item.level2Name !== '' &&
                    item.level2Name !== undefined &&
                    item.level2Name !== null && (
                      <>
                        <Text
                          fontSize={'16px'}
                          fontWeight={400}
                          color={ColorBlack}
                        >
                          &gt;
                        </Text>
                        <Text
                          fontSize={'16px'}
                          fontWeight={400}
                          color={ColorBlack}
                        >
                          {item.level2Name}
                        </Text>
                      </>
                    )}
                  {!goodsInfo.LogItemDisable && (
                    <Image
                      src={'/images/Page/icon_delete_category.png'}
                      width={'16px'}
                      height={'16px'}
                      alt="카테고리 삭제"
                      onClick={() => onDeleteClick(item.locationId)}
                    />
                  )}
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CountryComponent;
