import Image from 'next/image';
import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { ColorBlack, ColorGrayBorder } from '@/utils/_Palette';

import { DataTableHeaderProps, ItemProps } from './ApplyTable';
import { DashDate } from '@/utils/format';
import { PartUserType } from '@/app/apis/entries/EntriesApi.type';

interface Props {
  header: Array<DataTableHeaderProps>;
  item: PartUserType;
  index: number;
  pageNo: number;
  totalCount: number;
}
function ApplyCard({ header, item, index, pageNo, totalCount }: Props) {
  return (
    <Flex
      w={'100%'}
      flexDirection={'row'}
      justifyContent={'center'}
      pt={'16px'}
      pb={'15px'}
      borderBottomColor={ColorGrayBorder}
      borderBottomWidth={1}
    >
      <Flex
        w={header[0]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {totalCount - (pageNo - 1) * 10 - index}
        </Text>
      </Flex>
      <Flex
        w={header[1]?.width}
        gap={'10px'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.userId}
        </Text>
      </Flex>
      <Flex
        w={header[2]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {item.name}
        </Text>
      </Flex>
      {/* 예약자정보 */}
      <Flex
        w={header[3]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.phone}
        </Text>
      </Flex>
      <Flex
        w={header[4]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {DashDate(item.createdDate)}
        </Text>
      </Flex>
    </Flex>
  );
}

export default ApplyCard;
