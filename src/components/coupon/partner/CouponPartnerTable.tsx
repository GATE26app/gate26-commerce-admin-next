import Image from 'next/image';
import React, { MouseEvent, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGrayBorder,
} from '@/utils/_Palette';

import {
  CouponDataType,
  CouponListReqType,
  CouponListResType,
} from '@/app/apis/coupon/CouponApi.type';
import { couponPartnerListheader } from '@/utils/headerData';
import CouponPartnerSkeletonCard from './CouponPartnerSkeletonCard';
import CouponPartnerCard from './CouponPartnerCard';

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
  endDate: string;
  sDate: string;
  exposure: string;
}
export type { ItemProps, DataTableHeaderProps };

interface Props {
  data: CouponListReqType;
}
function CouponPartnerTable({ data }: Props) {
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
        {couponPartnerListheader.map(
          (item: DataTableHeaderProps, index: number) => {
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
          },
        )}
      </Flex>
      {!data ? (
        <>
          {Array(7)
            .fill(0)
            .map(() => {
              return (
                <CouponPartnerSkeletonCard header={couponPartnerListheader} />
              );
            })}
        </>
      ) : (
        <>
          {data && (data?.totalCount == undefined || data?.totalCount == 0) ? (
            <Flex
              minW={'1200px'}
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
                GATE26 쿠폰이 없습니다.
              </Text>
            </Flex>
          ) : (
            <>
              {data?.coupons.map((item: CouponDataType, index: number) => {
                return (
                  <CouponPartnerCard
                    key={index}
                    item={item}
                    index={index}
                    totalCount={data.totalCount}
                    pageNo={data.pageNo}
                    header={couponPartnerListheader}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default CouponPartnerTable;
