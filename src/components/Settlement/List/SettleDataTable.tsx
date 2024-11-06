import Image from 'next/image';
import React, { MouseEvent, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  GodsListItemDataListProps,
  GoodsListResponseProps,
} from '@/app/apis/goods/GoodsApi.type';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGrayBorder,
} from '@/utils/_Palette';

import { settlelistheader } from '@/utils/headerData';
import SettleCard from './SettleCard';
import { SettleListDtoType, SettleListItemType, SettleListResType } from '@/app/apis/settlement/SettlementApi.type';

interface DataTableHeaderProps {
  name: string;
  width: number;
}
interface Props {
  data: SettleListResType;
  setChekcList: React.Dispatch<React.SetStateAction<string[]>>;
  CheckList: string[];
}
function SettleDataTable({ data, setChekcList, CheckList }: Props) {
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
      data?.settlements.forEach((item) => {
        checkdata.push(String(item.settlementId));
        setChekcList(checkdata);
      });
    } else if (
      data?.settlements.length !== CheckList.length &&
      CheckList.length !== 0
    ) {
      const checkdata: string[] = [];
      data?.settlements.forEach((item) => {
        checkdata.push(String(item.settlementId));
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
          {data?.settlements.length == CheckList.length ? (
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
        {settlelistheader.map((item: DataTableHeaderProps, index: number) => {
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
      {data && data?.totalCount !== undefined && data?.totalCount !== 0 ? (
        <>
          {data &&
            data?.settlements !== undefined &&
            data?.settlements.map(
              (itemData: SettleListItemType, index: number) => {
                return (
                  <SettleCard
                    key={index}
                    item={itemData}
                    header={settlelistheader}
                    index={index}
                    totalCount={data.totalCount}
                    pageNo={data.pageNo}
                    CheckList={CheckList}
                    setChekcList={setChekcList}
                  />
                );
              },
            )}
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
            데이터가 없습니다.
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export default SettleDataTable;
