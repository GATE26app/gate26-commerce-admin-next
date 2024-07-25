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

import {
  GoodsItemProps,
  GoodsResListType,
} from '@/app/apis/goods/GoodsApi.type';
import PartnerPaySkeletonCard from './PartnerPaySkeletonCard';
import Pagination from '@/components/common/Pagination/Pagination';
import PartnerPayCard from './PartnerPayCard';

const listheader = [
  {
    id: 'id',
    name: '번호',
    width: 3,
  },
  {
    id: 'type',
    name: '계좌은행',
    width: 6,
  },

  {
    id: 'management',
    name: '계좌번호',
    width: 7,
  },
  {
    id: 'id',
    name: '입금자명',
    width: 7,
  },
  {
    id: 'boss',
    name: '변경승인요청\n완료일',
    width: 10,
  },
  {
    id: 'catagory',
    name: '승인상태',
    width: 7,
  },
  {
    id: 'goods',
    name: '반려사유',
    width: 15,
  },
];

function PartnerPayDataTable() {
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
        minW={'900px'}
        borderTopColor={ColorDataTableBorderTop}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
        borderTopWidth={1}
        mt={'30px'}
        justifyContent={'space-between'}
      >
        {listheader.map((item: any, index: number) => {
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
        <PartnerPaySkeletonCard header={listheader} />
        <PartnerPayCard header={listheader}/>
        
        {/* <Flex justifyContent="space-between" alignItems="center">
            <Pagination
              currentPage={2}
              limit={10}
              total={100}
              onPageNumberClicked={() => {}}
              onPreviousPageClicked={() => {}}
              onNextPageClicked={() => {}}
              // setOnSubmit={setOnSubmit}
            />
          </Flex> */}
    </Box>
  );
}

export default PartnerPayDataTable;
