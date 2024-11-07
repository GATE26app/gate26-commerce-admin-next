import React, { useState } from 'react';

import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';

import InputBox from '@/components/common/Input';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import SelectBox from '@/components/common/SelectBox';
import { BannerResType } from '@/app/apis/banner/BannerApi.type';

interface Props {
  BannerInfo: BannerResType;
  setBannerInfo: React.Dispatch<React.SetStateAction<BannerResType>>;
}
function OrderComponent({ BannerInfo, setBannerInfo }: Props) {
  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderBottomWidth={0}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
      >
        <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
          노출순서
        </Text>
      </Flex>
      <Flex
        px={'30px'}
        py={'20px'}
        w={'100%'}
        flexDirection={'column'}
        borderWidth={1}
        borderColor={ColorGray400}
        borderBottomRadius={'12px'}
      >
        <SelectBox
          placeholder="검색분류선택"
          width={'190px'}
          list={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          select={String(BannerInfo.sort + 1)}
          setSelect={(item) => {
            setBannerInfo({
              ...BannerInfo,
              sort: Number(item) - 1,
            });
          }}
        />
      </Flex>
    </Flex>
  );
}

export default OrderComponent;
