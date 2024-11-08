import React, { MouseEvent, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

// import {
//   GoodsListItemProps,
//   GoodsListResponseProps,
// } from '@apis/goods/GoodsApi.type';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGrayBorder,
} from '@/utils/_Palette';

import GoodsCard from './GoodsCard';
import {
  GoodsItemProps,
  GoodsResListType,
} from '@/app/apis/goods/GoodsApi.type';
import Image from 'next/image';
import GoodsSkeletonCard from './GoodsSkeletonCard';

const listheader = [
  {
    id: 'id',
    name: '번호',
    width: 3,
  },
  {
    id: 'management',
    name: '관리',
    width: 8,
  },

  {
    id: 'code',
    name: '상품코드',
    width: 7,
  },
  {
    id: 'management',
    name: '파트너사',
    width: 7,
  },
  {
    id: 'country',
    name: '나라/도시',
    width: 7,
  },
  {
    id: 'catagory',
    name: '카테고리',
    width: 7,
  },
  {
    id: 'goods',
    name: '상품정보',
    width: 23,
  },
  {
    id: 'date',
    name: '등록일',
    width: 7,
  },
  {
    id: 'req',
    name: '상품승인',
    width: 5,
  },
  {
    id: 'reqDate',
    name: `승인요청\n 완료일`,
    width: 7,
  },
  {
    id: 'state',
    name: '노출상태',
    width: 6,
  },
  {
    id: 'goodsDate',
    name: '상품노출기간',
    width: 7,
  },
  {
    id: 'saleStatus',
    name: '판매상태',
    width: 6,
  },
];

interface DataTableHeaderProps {
  name: string;
  width: number;
}
interface ListProps {
  itemCode: string;
  items: GoodsItemProps[];
}
interface Props {
  data: GoodsResListType;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  CheckList: string[];
  setCheckList: React.Dispatch<React.SetStateAction<string[]>>;
}
export type { DataTableHeaderProps, ListProps };
function GoodsDataTable({ data, setOnSubmit, setCheckList, CheckList }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDownEvent = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    if (scrollRef.current) {
      setClickPoint(e.pageX);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseMoveEvent = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    e.preventDefault();
    if (scrollRef.current) {
      const walk = e.pageX - clickPoint;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  const onClickAllCheck = () => {
    if (CheckList.length == 0) {
      const checkdata: string[] = [];
      data?.data.forEach((item) => {
        checkdata.push(item.itemCode);
        setCheckList(checkdata);
      });
    } else if (
      data?.data.length !== CheckList.length &&
      CheckList.length !== 0
    ) {
      const checkdata: string[] = [];
      data?.data.forEach((item) => {
        checkdata.push(item.itemCode);
        setCheckList(checkdata);
      });
    } else {
      setCheckList([]);
    }
  };
  return (
    <Box
      overflowX={'auto'}
      ref={scrollRef}
      onMouseDown={handleMouseDownEvent}
      onMouseLeave={() => setDragging(false)}
      onMouseUp={() => setDragging(false)}
      onMouseMove={handleMouseMoveEvent}
    >
      <Flex
        flexDirection={'row'}
        minW={'1340px'}
        borderTopColor={ColorDataTableBorderTop}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
        borderTopWidth={1}
        mt={'15px'}
        justifyContent={'center'}
      >
        <Flex
          w={'5%'}
          alignItems={'center'}
          justifyContent={'center'}
          h={'64px'}
          onClick={() => onClickAllCheck()}
        >
          {(data?.data.length == CheckList.length && data?.data.length > 0) ? (
            <Image
              width={21}
              height={21}
              src={'/images/icon_check_on.png'}
              alt="체크"
            />
          ) : (
            <Image
              width={21}
              height={21}
              src={'/images/icon_check_off.png'}
              alt="체크"
            />
          )}
        </Flex>
        {listheader.map((item: DataTableHeaderProps, index: number) => {
          return (
            <Flex
              w={`${item.width}%`}
              alignItems={'center'}
              justifyContent={'center'}
              h={'64px'}
              key={index}
            >
              <Text
                color={ColorBlack}
                fontSize={'15px'}
                fontWeight={700}
                whiteSpace={'pre-wrap'}
              >
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Flex>
      {!data ? (
        <>
          {Array(7)
            .fill(0)
            .map(() => {
              return <GoodsSkeletonCard header={listheader} />;
            })}
        </>
      ) : (
        <>
          {(data && data?.totalCount == undefined) || data?.totalCount == 0 ? (
            <Flex
              bgColor={ColorGray100}
              minW={'1340px'}
              mt={'20px'}
              py={'42px'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Image
                width={80}
                height={80}
                src={'/images/Page/no_data.png'}
                alt="데이터 없음"
              />
              <Text fontSize={'14px'} fontWeight={'400'} color={ColorBlack}>
                조회한 내용이 없습니다.
              </Text>
            </Flex>
          ) : (
            <>
              {data?.data.map((itemData: ListProps, index: number) => {
                return (
                  <GoodsCard
                    key={index}
                    item={itemData}
                    header={listheader}
                    index={index}
                    totalCount={data.totalCount}
                    pageNo={data.pageNo}
                    setOnSubmit={setOnSubmit}
                    CheckList={CheckList}
                    setCheckList={setCheckList}
                  />
                );
              })}
            </>
          )}
        </>
      )}
      {/* {data &&
        data?.data !== undefined &&
        data?.data.map((itemData: ListProps, index: number) => {
          return (
            <GoodsCard
              key={index}
              item={itemData}
              header={listheader}
              index={index}
              totalCount={data.totalCount}
              pageNo={data.pageNo}
              setOnSubmit={setOnSubmit}
            />
          );
        })} */}
    </Box>
  );
}

export default GoodsDataTable;
