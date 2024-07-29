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
import PartnerSkeletonCard from './PartnerSkeletonCard';
import PartnerCard from './PartnerCard';
import { PartnersParamsType } from '@/app/apis/partners/PartnersApi.type';

const listheader = [
  {
    id: 'id',
    name: '번호',
    width: 3,
  },
  {
    id: 'type',
    name: '구분',
    width: 6,
  },

  {
    id: 'management',
    name: '파트너사명',
    width: 7,
  },
  {
    id: 'id',
    name: '아이디',
    width: 7,
  },
  {
    id: 'boss',
    name: '대표자',
    width: 7,
  },
  {
    id: 'catagory',
    name: '연락처/연락망',
    width: 7,
  },
  {
    id: 'goods',
    name: '회원승인',
    width: 5,
  },
  {
    id: 'date',
    name: '회원승인요청\n완료일',
    width: 7,
  },
  // {
  //   id: 'req',
  //   name: '계좌정보',
  //   width: 5,
  // },
  // {
  //   id: 'reqDate',
  //   name: `변경승인요청\n완료일`,
  //   width: 7,
  // },
  {
    id: 'state',
    name: '회원상태',
    width: 9,
  },
  {
    id: 'goodsDate',
    name: '상세',
    width: 7,
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
}
export type { DataTableHeaderProps, ListProps };
function PartnerDataTable({ data, setOnSubmit }: Props) {
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
        justifyContent={'space-between'}
      >
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
                textAlign={'center'}
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
              return <PartnerSkeletonCard header={listheader} />;
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
              {data?.partners.map((itemData: PartnersParamsType | any, index: number) => {
                return (
                  <PartnerCard 
                    key={index}
                    item={itemData}
                    header={listheader}
                    index={index}
                    totalCount={data.totalCount}
                    pageNo={data.pageNo}
                    setOnSubmit={setOnSubmit}
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

export default PartnerDataTable;
