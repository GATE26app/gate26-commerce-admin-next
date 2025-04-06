import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import {
  GodsListItemDataListProps,
  GoodsListItemProps,
} from '@/app/apis/goods/GoodsApi.type';

import {
  COlorBlueSucces,
  ColorBlack,
  ColorBlue,
  ColorGray400,
  ColorGray500,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
  ColorRed50,
} from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { SettleListItemType } from '@/app/apis/settlement/SettlementApi.type';
import { formatDated, intComma } from '@/utils/format';
import { safeDecryptAndParse } from '@/utils/crypto';
interface DataTableHeaderProps {
  id: string;
  name: string;
  width: number;
}
interface Props {
  header: Array<DataTableHeaderProps>;
  item: SettleListItemType;
  index: number;
  pageNo: number;
  totalCount: number;
  CheckList: string[];
  setChekcList: React.Dispatch<React.SetStateAction<string[]>>;
}

function SettleCard({ header, item, index, pageNo, totalCount, CheckList, setChekcList }: Props) {
  const router = useRouter();

  const onCheckClick = (item: string) => {
    setChekcList((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((i) => i !== item);
      } else {
        return [...prevItems, item];
      }
    });
  };

  return (
    <Flex
      minW={'1550px'}
      flexDirection={'row'}
      justifyContent={'center'}
      py={'20px'}
      borderBottomColor={ColorGrayBorder}
      borderBottomWidth={1}
    >
      <Flex
        w={'5%'}
        alignItems={'center'}
        justifyContent={'center'}
        onClick={() => onCheckClick(String(item.settlementId))}
      >
        {CheckList.includes(String(item.settlementId)) ? (
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

      <Flex
        w={`${header[0]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={ColorBlack}
          textAlign={'center'}
        >
          {item.settlementNumber}
        </Text>
      </Flex>
      <Flex
        w={`${header[1]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.partner.title}
        </Text>
        <Text fontSize={'14px'} fontWeight={400} color={ColorGray700}>
          {item.partner.businessRegistrationNumber == null ? '-' : safeDecryptAndParse(item.partner.businessRegistrationNumber)}
        </Text>
      </Flex>
      <Flex
        w={`${header[2]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
        cursor={'pointer'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {intComma(item.orderAmount)}원
        </Text>
      </Flex>
      <Flex
        w={`${header[2]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
        cursor={'pointer'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {intComma(item.paymentAmount)}원
        </Text>
      </Flex>
      {/* 결제수수료 */}
      <Flex
        w={`${header[3]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
        {intComma(item.paymentChargeAmount)}원
        </Text>
      </Flex>
      {/* 서비스이용 수수료 */}
      <Flex
        w={`${header[4]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {intComma(item.serviceChargeAmount)}원
        </Text>
        {/* <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          3,000
        </Text> */}
      </Flex>
      {/* 예약자정보 */}
      <Flex
        w={`${header[5]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {intComma(item.discountSettlementAmount)}원
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            ㅣ
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {intComma(item.discountChargeAmount)}원
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={`${header[6]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'10px'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {intComma(item.settlementAmount)}원
        </Text>
      </Flex>
      <Flex
        w={`${header[7]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {formatDated(dayjs(item.fromDate)) == 'Invalid Date'
        ? '-'
        : formatDated(dayjs(item.fromDate))}
        </Text>
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {formatDated(dayjs(item.toDate)) == 'Invalid Date'
        ? '-'
        : formatDated(dayjs(item.toDate))}
        </Text>
      </Flex>
      <Flex
        w={`${header[9]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={ColorBlack}
          textAlign={'center'}
        >
                    {formatDated(dayjs(item.settlementDate)) == 'Invalid Date'
        ? '-'
        : formatDated(dayjs(item.settlementDate))}
        </Text>
      </Flex>
      <Flex
        w={`${header[10]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Box
          bgColor={item.status == 0 ? COlorBlueSucces : ColorRed50}
          // bgColor={ColorGray500}
          borderRadius={'5px'}
          px={'6px'}
          py={'4px'}
        >
          <Text
            fontSize={'14px'}
            fontWeight={600}
            color={item.status == 0 ? ColorBlue : ColorRed}
            // color={ColorBlack}
            textAlign={'center'}
          >
            {item.statusName}
          </Text>
        </Box>
      </Flex>
      <Flex
        w={`${header[10]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        cursor={'pointer'}
        onClick={() => router.push(`/settlementDetail?getSettleId=${item.settlementId}`)}
      >
        <Box
          borderRadius={'6px'}
          borderWidth={1}
          borderColor={ColorInputBorder}
          px={'15px'}
          py={'7px'}
        >
          <Text
            fontSize={'14px'}
            fontWeight={400}
            color={ColorGray700}
            textAlign={'center'}
          >
            상세보기
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
export default SettleCard;
