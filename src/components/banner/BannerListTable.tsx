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
import Image from 'next/image';
import {
  ReviewListItemType,
  ReviewListResType,
} from '@/app/apis/review/ReviewApi.type';
import BannerSkeletonCard from './BannerSkeletonCard';
import BannerCard from './BannerCard';

const reviewlistheader = [
  {
    id: 'id',
    name: '번호',
    width: '10%',
  },
  {
    id: 'image',
    name: '배너이미지',
    width: '25%',
  },
  {
    id: 'name',
    name: '배너명',
    width: '20%',
  },
  {
    id: 'date',
    name: '등록일',
    width: '9%',
  },
  {
    id: 'order',
    name: '노출순서',
    width: '9%',
  },
  {
    id: 'show_date',
    name: '노출기간',
    width: '9%',
  },
  {
    id: 'status',
    name: '노출상태',
    width: '10%',
  },
  {
    id: 'state',
    name: '관리',
    width: '10%',
  },
];

interface DataTableHeaderProps {
  name: string;
  width: string;
}

interface Props {
  data: ReviewListResType;
}

function BannerListTable({ data }: any) {
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

  console.log('data', data);
  return (
    <Box
      overflowX={'auto'}
      ref={scrollRef}
      onMouseDown={handleMouseDownEvent}
      onMouseLeave={() => setDragging(false)}
      onMouseUp={() => setDragging(false)}
      onMouseMove={handleMouseMoveEvent}
      pb={'50px'}
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
        {reviewlistheader.map((item: DataTableHeaderProps, index: number) => {
          return (
            <Flex
              w={`${item.width}`}
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
              return <BannerSkeletonCard header={reviewlistheader} />;
            })}
        </>
      ) : (
        <>
          {data?.banners.map((item, index) => {
            return (
              <BannerCard
                key={index}
                item={item}
                header={reviewlistheader}
                index={index}
                totalCount={data.totalCount}
                pageNo={data.pageNo}
              />
            );
          })}
        </>
      )}
    </Box>
  );
}

export default BannerListTable;
