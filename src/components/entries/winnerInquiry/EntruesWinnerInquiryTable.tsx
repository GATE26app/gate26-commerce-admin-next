import Image from 'next/image';
import React, { MouseEvent, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGrayBorder,
} from '@/utils/_Palette';

import EntriesWinnerInquiryCard from './EntriesWinnerInquiryCard';
import {
  EntriesListReqType,
  EntriesListType,
} from '@/app/apis/entries/EntriesApi.type';
import EntriesWinnerSkeletonCard from './EntriesWinnerSkeletonCard';

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
    id: 'GoodOrderNum',
    name: `구분`,
    width: '7%',
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
    name: '응모수 / 응모당첨수',
    width: '12%',
  },
  {
    id: 'setting',
    name: '관리',
    width: '15%',
  },
];

interface HeaderListProp {}
interface DataTableHeaderProps {
  name: string;
  width: string;
}
interface ItemProps {
  id: number;
  state: string;
  title: string;
  winnerCnt: number;
  division: string;
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
function EntruesWinnerInquiryTable({ data }: Props) {
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
      overflowX={'scroll'}
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
            .map(() => {
              return <EntriesWinnerSkeletonCard header={cancellistheader} />;
            })}
        </>
      ) : (
        <>
          {data && data?.totalCount == undefined ? (
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
              <Text fontSize={'14px'} fontWeight={'400'} color={ColorBlack}>
                조회한 내용이 없습니다.
              </Text>
            </Flex>
          ) : (
            <>
              {data?.entries.map((item: EntriesListType, index: number) => {
                return (
                  <EntriesWinnerInquiryCard
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
            <EntriesWinnerInquiryCard
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

export default EntruesWinnerInquiryTable;
