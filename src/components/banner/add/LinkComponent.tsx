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
import { EntriesResType } from '@/app/apis/entries/EntriesApi.type';
import { BannerResType } from '@/app/apis/banner/BannerApi.type';

interface Props {
  BannerInfo: BannerResType;
  setBannerInfo: React.Dispatch<React.SetStateAction<BannerResType>>;
}
function LinkComponent({ BannerInfo, setBannerInfo }: Props) {
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
          연결할 링크
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
        <InputBox
          value={BannerInfo.target}
          onChange={(e) =>
            setBannerInfo({
              ...BannerInfo,
              target: e.target.value,
            })
          }
          placeholder="연결하실 페이지 링크를 등록해주세요."
          // register={register('title')}
        />
      </Flex>
    </Flex>
  );
}

export default LinkComponent;
