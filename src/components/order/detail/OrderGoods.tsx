import Image from 'next/image';
import React, { MouseEvent, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderDetailItemType } from '@/app/apis/order/OrderApi.type';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGrayBorder,
} from '@/utils/_Palette';
import OrderGoodsCard from './OrderGoodsCard';

export const orderGoodheader = [
  {
    id: 'GoodOrderNum',
    name: '상품주문번호',
    width: '15%',
  },
  {
    id: 'info',
    name: '상품정보',
    width: '35%',
  },
  {
    id: 'orderPrice',
    name: '주문 상품금액',
    width: '15%',
  },
  {
    id: 'reves',
    name: '예약/이용일',
    width: '15%',
  },
  {
    id: 'state',
    name: '주문상태',
    width: '15%',
  },
  {
    id: 'delivery',
    name: '배송정보',
    width: '15%',
  },
];
interface ItemProps {
  id: number;
  orderDate: string;
  orderNum: string;
  GoodOrderNum: string;
  image: string;
  category1: string;
  goodsName: string;
  option: string;
  price: number;
  payment: string;
  orderPrice: number;
  orderemail: string;
  ordername: string;
  orderphone: string;
  useDate: string;
  state: string;
  delivery: string;
}
interface Props {
  info: OrderDetailItemType;
}
interface DataTableHeaderProps {
  id: string;
  name: string;
  width: string;
}
function OrderGoods({ info }: Props) {
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
    <Box mt={'60px'}>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
        주문상품
      </Text>
      <Box
        overflowX={'auto'}
        ref={scrollRef}
        onMouseDown={handleMouseDownEvent}
        onMouseLeave={() => setDragging(false)}
        onMouseUp={() => setDragging(false)}
        onMouseMove={handleMouseMoveEvent}
        h={'280px'}
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
          {orderGoodheader.map((item: DataTableHeaderProps, index: number) => {
            // 주문 상품 유형, 1=>일반형, 2=>바우처형, 3=>예약형, 4=>이륙살롱
            if (info.orderType !== 1 && item.name === '배송정보') {
              return null;
            }

            return (
              <Flex
                key={index}
                w={item.width}
                alignItems={'center'}
                justifyContent={'center'}
                h={'49px'}
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
        <OrderGoodsCard item={info} header={orderGoodheader} />
      </Box>

      {/* {info &&
        data.map((item: ItemProps, index: number) => {
          return (
            <OrderGoodsCard key={index} item={item} header={orderGoodheader} />
          );
        })} */}
    </Box>
  );
}

export default OrderGoods;
