import React, { useEffect, useRef, useState } from 'react';
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
import goodsApi from '@/app/apis/goods/GoodsApi';
import CategorySelectBox from '../common/SelectBox/CategorySelectBox';
import { CategoryResProps } from '@/app/apis/goods/GoodsApi.type';

interface SelectListProps {
  categoryId: number;
  level1Name: string;
  level2Name: string;
}
interface CategoryListProps {
  categoryId: number;
}
interface CateProps {
  categories: Array<CateProps[]>;
  categoryId: number;
  depth: number;
  level: number;
  sort: number;
  title: string;
}

export type { CateProps };

interface Props {
  list: Array<CategoryListProps>;
  setList: React.Dispatch<React.SetStateAction<CategoryListProps[]>>;
  getList?: Array<CategoryResProps>;
  setGetList?: React.Dispatch<React.SetStateAction<CategoryResProps[]>>;
  CatePreList: Array<CategoryResProps>;
  setCatePreList: React.Dispatch<React.SetStateAction<CategoryResProps[]>>;
}
function CatagoryComponent({
  list,
  setList,
  getList,
  setGetList,
  CatePreList,
  setCatePreList,
}: Props) {
  const toast = useToast();
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectCate1, setSelectCate1] = useState('');
  const [selectCate2, setSelectCate2] = useState('');
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [CategoryList, setCategoryList] = useState<CateProps[]>([]); // 1차 카테고리
  const [level2CateList, setLevel2CateList] = useState<any>([]); // 2차 카테고리
  const [alllist, setAllList] = useState<any>([]);
  const [selectList, setSelectList] = useState<SelectListProps[]>([]);
  const [onSuccess, setOnSuccess] = useState(false);

  //수정시 카테고리에 데이터 넣기
  useEffect(() => {
    if (getList) {
      const result: SelectListProps[] = [];
      getList.forEach((item) => {
        result.push({
          level1Name:
            item.depth == 1 ? item.title : item.fullTitle.split('>')[0],
          level2Name: item.depth == 1 ? '' : item.title,
          categoryId: item.categoryId,
        });
      });

      setSelectList(result);
      const resultId: CategoryListProps[] = [];
      getList.forEach((item) => {
        resultId.push({
          categoryId: item.categoryId,
        });
      });
      setList(resultId);
    }
  }, [getList]);
  // const { data, isLoading } = useQuery('category', () =>
  //   goodsApi.getCategory(),
  // );

  const { data, error, isLoading } = useQuery(
    'category',
    goodsApi.getCategory,
    {
      staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      refetchInterval: false, // 자동 새로 고침 비활성화
    },
  );
  useEffect(() => {
    if (data?.success && data.data && !onSuccess) {
      setAllList(data.data);
      setCategoryList(data.data);
      setOnSuccess(true);
    }
  }, [onSuccess, data]);
  //1차카테고리 선택
  const onClickFirstCate = (id: number, data: string) => {
    let arr = [];
    arr.push(CategoryList.filter((item) => item.categoryId == id)[0]);
    setSelectCate2('');

    let allObject = {
      categoryId: arr[0].categoryId,
      title: '전체',
      sort: 0,
      level: 2,
      depth: 2,
      categories: [],
    };

    setLevel2CateList([
      allObject,
      ...CategoryList.filter((item) => item.categoryId == id).map(
        (prev) => prev.categories,
      )[0],
    ]);
  };

  //2차 카테고리 선택
  const onClickSecondCate = (id: number, data: string) => {
    let oneObject = {
      level1Name: selectCate1,
      level2Name: data == '전체' ? '' : data,
      categoryId: id,
    };
    let PreObject = {
      categoryId: id,
      fullTitle: data == '전체' ? selectCate1 : `${selectCate1} > ${data}`,
      title: data,
      sort: 1,
      level: 1,
      depth: 1,
    };
    let catagory = {
      categoryId: id,
    };
    if (selectList.some((arr) => arr.categoryId == id) == false) {
      setSelectList([...selectList, oneObject]);
      setSelectCate1('');
      setSelectCate2('');
      setList([...list, catagory]);
      setLevel2CateList([]);
      setCatePreList([...CatePreList, PreObject]);
    } else {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            이미 등록된 카테고리입니다.
          </Box>
        ),
      });
    }
  };

  //카테고리 삭제
  const onDeleteClick = (idx: number) => {
    if (selectList.some((arr) => arr.categoryId === idx)) {
      setSelectList(selectList.filter((item) => idx !== item.categoryId));
      setList(list.filter((item) => idx !== item.categoryId));
      setCatePreList(CatePreList.filter((item) => idx !== item.categoryId));
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
          카테고리
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
        ref={anchorRef}
      >
        <Flex mb={'20px'} gap={'10px'} flexWrap={'wrap'}>
          <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
            <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
              대분류
            </Text>
            <CategorySelectBox
              placeholder="1차 카테고리 선택"
              width={'311px'}
              list={CategoryList}
              select={selectCate1}
              setSelect={setSelectCate1}
              onClick={onClickFirstCate}
              disable={goodsInfo.LogItemDisable}
            />
          </Flex>
          <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
            <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
              중분류
            </Text>
            <CategorySelectBox
              placeholder="2차 카테고리 선택"
              width={'311px'}
              list={level2CateList}
              select={selectCate2}
              setSelect={setSelectCate2}
              onClick={onClickSecondCate}
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
                      onClick={() => onDeleteClick(item.categoryId)}
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

export default CatagoryComponent;
