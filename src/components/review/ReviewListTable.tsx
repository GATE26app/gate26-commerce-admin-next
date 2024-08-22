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
import ReviewSkeletonCard from './ReviewSkeletonCard';
import ReviewCard from './ReviewCard';
import {
  ReviewListItemType,
  ReviewListResType,
} from '@/app/apis/review/ReviewApi.type';

export const reviewlistheader = [
  {
    id: 'id',
    name: '번호',
    width: '10%',
  },
  {
    id: 'GoodOrderNum',
    name: '상품정보',
    width: '29%',
  },
  {
    id: 'info',
    name: '리뷰',
    width: '26%',
  },
  {
    id: 'payment',
    name: '작성자',
    width: '9%',
  },
  {
    id: 'rest',
    name: '작성일',
    width: '8%',
  },
  {
    id: 'reves',
    name: '답변상태값',
    width: '8%',
  },
  {
    id: 'reves',
    name: '노출상태',
    width: '8%',
  },
  {
    id: 'state',
    name: '답글',
    width: '8%',
  },
];

interface DataTableHeaderProps {
  name: string;
  width: string;
}
interface ListProps {
  itemCode: string;
  items: GoodsItemProps[];
}
interface Props {
  data: ReviewListResType;
}

const itemData = {
  id: 10,
};
function ReviewListTable({ data }: Props) {
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
        minW={'1550px'}
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
              return <ReviewSkeletonCard header={reviewlistheader} />;
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
              {data?.reviews.map(
                (itemData: ReviewListItemType, index: number) => {
                  return (
                    <ReviewCard
                      key={1}
                      item={itemData}
                      header={reviewlistheader}
                      index={1}
                      totalCount={10}
                      pageNo={1}
                    />
                  );
                },
              )}
            </>
          )}
        </>
      )}
      {/* {data &&
        data?.reviews !== undefined &&
        data?.reviews.map((itemData: ReviewListItemType, index: number) => {
          return (
            <GoodsCard
              key={index}
              item={itemData}
              header={reviewlistheader}
              index={index}
              totalCount={data.totalCount}
              pageNo={data.pageNo}
            />
          );
        })} */}
    </Box>
  );
}

export default ReviewListTable;
