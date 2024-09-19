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
import { CouponDataType } from '@/app/apis/coupon/CouponApi.type';

interface Props {
  data: CouponDataType;
}
function CouponStatusComponent({ data }: Props) {
  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'30px'}
        w={'100%'}
        borderWidth={1}
        borderRadius={'12px'}
        borderColor={ColorGray400}
        flexDirection={'column'}
      >
        <Flex gap={'15px'} flexDirection={'row'}>
          <Text fontWeight={600} fontSize={'15px'} color={ColorBlack}>
            등록일
          </Text>
          <Text fontWeight={400} fontSize={'16px'} color={ColorBlack}>
            {data?.createdDate !== undefined && DashDate(data?.createdDate)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CouponStatusComponent;
