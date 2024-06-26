import Image from 'next/image';
import React, { MouseEvent, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGrayBorder,
} from '@/utils/_Palette';

import EntriesAucionCard from './EntriesAucionCard';
import {
  EntriesListReqType,
  EntriesListType,
} from '@/app/apis/entries/EntriesApi.type';
import EntriesFirstSkeletonCard from '../first/EntriesFirstSkeletonCard';

export const cancellistheader = [
  {
    id: 'state',
    name: '번호',
    width: '7%',
  },
  {
    id: 'GoodOrderNum',
    name: `상태값`,
    width: '10%',
  },
  {
    id: 'info',
    name: '상품응모명',
    width: '21%',
  },
  {
    id: 'payment',
    name: '당첨자수',
    width: '7%',
  },
  {
    id: 'rest',
    name: '오픈일',
    width: '10%',
  },
  {
    id: 'reves',
    name: '응모기간',
    width: '10%',
  },
  {
    id: 'state',
    name: '등록일',
    width: '10%',
  },
  {
    id: '예약자정보',
    name: '노출상태',
    width: '10%',
  },
  {
    id: 'setting',
    name: '관리',
    width: '15%',
  },
];

interface DataTableHeaderProps {
  name: string;
  width: string;
}
interface ItemProps {
  id: number;
  state: string;
  title: string;
  winnerCnt: number;
  openDate: string;
  startDate: string;
  endDate: string;
  sDate: string;
  exposure: string;
}
export type { ItemProps, DataTableHeaderProps };
interface Props {
  data: EntriesListReqType;
}
function EntreisAuctionTable({ data }: Props) {
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
        minW={'1200px'}
        borderTopColor={ColorDataTableBorderTop}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
        borderTopWidth={1}
        mt={'15px'}
        justifyContent={'center'}
      >
        {cancellistheader.map((item: DataTableHeaderProps, index: number) => {
          return (
            <Flex
              key={index}
              w={item.width}
              alignItems={'center'}
              justifyContent={'center'}
              h={'64px'}
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
            .map((_, index) => {
              return (
                <EntriesFirstSkeletonCard
                  key={index}
                  header={cancellistheader}
                />
              );
            })}
        </>
      ) : (
        <>
          {data && (data?.totalCount == undefined || data?.totalCount == 0) ? (
            <Flex
              bgColor={ColorGray100}
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
              <Text
                fontSize={'14px'}
                fontWeight={'400'}
                color={ColorBlack}
                mt={'10px'}
              >
                경매 상품 응모가 없습니다.
              </Text>
            </Flex>
          ) : (
            <>
              {data?.entries.map((item: EntriesListType, index: number) => {
                return (
                  <EntriesAucionCard
                    key={index}
                    item={item}
                    index={index}
                    totalCount={data.totalCount}
                    pageNo={data.pageNo}
                    header={cancellistheader}
                  />
                );
              })}
            </>
          )}
        </>
      )}
      {/* {data &&
        data?.entries !== undefined &&
        data?.entries.map((item: EntriesListType, index: number) => {
          return (
            <EntriesAucionCard
              key={index}
              item={item}
              index={index}
              totalCount={data.totalCount}
              pageNo={data.pageNo}
              header={cancellistheader}
            />
          );
        })} */}
    </Box>
  );
}

export default EntreisAuctionTable;
