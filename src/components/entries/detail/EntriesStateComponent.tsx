import React, { useState } from 'react';

import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import {
  EntriesDetailType,
  EntriesResType,
} from '@/app/apis/entries/EntriesApi.type';
import { DashDate } from '@/utils/format';

interface Props {
  data: EntriesDetailType;
}

function EntriesStateComponent({ data }: Props) {
  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderRadius={'12px'}
        borderColor={ColorGray400}
        flexDirection={'column'}
      >
        <Flex
          gap={'15px'}
          flexDirection={'row'}
          borderBottomColor={ColorGray400}
          borderBottomWidth={1}
          pb={'15px'}
        >
          <Text fontWeight={600} fontSize={'15px'} color={ColorBlack}>
            등록일
          </Text>
          <Text fontWeight={400} fontSize={'16px'} color={ColorBlack}>
            {data?.openDate !== undefined && DashDate(data?.openDate)}
          </Text>
        </Flex>
        <Flex gap={'15px'} flexDirection={'row'} pt={'15px'}>
          <Text fontWeight={600} fontSize={'15px'} color={ColorBlack}>
            상태값
          </Text>
          <Text fontWeight={400} fontSize={'16px'} color={ColorBlack}>
            {data?.statusName}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default EntriesStateComponent;
