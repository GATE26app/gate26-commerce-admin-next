import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { GodsListItemDataListProps } from '@/apis/goods/GoodsApi.type';

import { ColorBlack, ColorGrayBorder } from '@/utils/_Palette';

import { DataTableHeaderProps } from '@/components/Goods/List/GoodsDataTable';
import { SettleItemDtoType, SettleUnListItemDtoType } from '@/app/apis/settlement/SettlementApi.type';
import { intComma } from '@/utils/format';

interface Props {
  header: Array<DataTableHeaderProps>;
  item: SettleItemDtoType|any;
  index: number;
  pageNo: number;
  totalCount: number;
}
function UnSettlementCard({ header, item, index, pageNo, totalCount }: Props) {
  return (
    <Flex
      // w={'1009px'}
      minW={'1000px'}
      flexDirection={'row'}
      justifyContent={'center'}
      py={'20px'}
      borderBottomColor={ColorGrayBorder}
      borderBottomWidth={1}
    >
      <Flex
        w={`${header[0]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.typeName}
        </Text>
      </Flex>
      <Flex
        w={`${header[1]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
        cursor={'pointer'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.orderId}
        </Text>
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.merchantUid}
        </Text>
      </Flex>
      {/* 결제수수료 */}
      <Flex
        w={`${header[2]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
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
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {intComma(item.paymentAmount)}원
        </Text>
      </Flex>
      {/* 서비스이용 수수료 */}
      <Flex
        w={`${header[3]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.payMethodName}
        </Text>
      </Flex>
      {/* 예약자정보 */}
      <Flex
        w={`${header[4]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
        {intComma(item.paymentAmount)}원
        </Text>
      </Flex>

      <Flex
        w={`${header[5]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
        {intComma(item.serviceChargePercent)}%
        </Text>
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
        {intComma(item.serviceChargeAmount)}원
        </Text>
      </Flex>
      <Flex
        w={`${header[6]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {intComma(item.discountChargeAmount)}원
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            ㅣ
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {intComma(item.discountSettlementAmount)}원
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={`${header[7]?.width}%`}
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
          {intComma(item.settlementAmount)}원
        </Text>
      </Flex>
    </Flex>
  );
}
export default UnSettlementCard;
