import Image from 'next/image';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  OrderListItemType,
  OrderListResType,
} from '@/app/apis/order/OrderApi.type';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGrayBorder,
} from '@/utils/_Palette';

import OrderCard from './OrderCard';

// import GoodsCard from './GoodsCard';

export const orderlistheader = [
  {
    id: 'id',
    name: '주문일\n(주문번호)',
    width: '9%',
  },
  {
    id: 'GoodOrderNum',
    name: '상품주문번호',
    width: '7%',
  },
  {
    id: 'GoodOrderNum',
    name: '파트너사',
    width: '7%',
  },
  {
    id: 'info',
    name: '상품정보',
    width: '25%',
  },
  {
    id: 'payment',
    name: '결제정보',
    width: '7%',
  },
  {
    id: 'rest',
    name: '예약/이용자 정보',
    width: '12%',
  },
  {
    id: 'reves',
    name: '예약/이용일',
    width: '7%',
  },
  {
    id: 'state',
    name: '주문상태',
    width: '10%',
  },
  {
    id: 'delivery',
    name: '배송지정보',
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
export type { ItemProps, DataTableHeaderProps };
interface Props {
  list: OrderListResType;
  CheckList: string[];
  setChekcList: React.Dispatch<React.SetStateAction<string[]>>;
}
function OrderDataTable({ list, setChekcList, CheckList }: Props) {
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
      list?.orders.forEach((item) => {
        checkdata.push(item.orderId);
        setChekcList(checkdata);
      });
    } else if (
      list?.orders.length !== CheckList.length &&
      CheckList.length !== 0
    ) {
      const checkdata: string[] = [];
      list?.orders.forEach((item) => {
        checkdata.push(item.orderId);
        setChekcList(checkdata);
      });
    } else {
      setChekcList([]);
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
        <Flex
          w={'5%'}
          alignItems={'center'}
          justifyContent={'center'}
          h={'64px'}
          onClick={() => onClickAllCheck()}
        >
          {(list?.orders.length == CheckList.length && list?.orders.length > 0) ? (
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
        {orderlistheader.map((item: DataTableHeaderProps, index: number) => {
          return (
            <Flex
              w={item.width}
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

      {list && list?.totalCount !== undefined && list?.totalCount !== 0 ? (
        <>
          {list &&
            list?.orders.map((item: OrderListItemType, index: number) => {
              return (
                <OrderCard
                  key={index}
                  item={item}
                  header={orderlistheader}
                  CheckList={CheckList}
                  setChekcList={setChekcList}
                />
              );
            })}
        </>
      ) : (
        <Flex
          bgColor={ColorGray100}
          mt={'20px'}
          py={'42px'}
          minW={'1550px'}
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
      )}
    </Box>
  );
}

export default OrderDataTable;