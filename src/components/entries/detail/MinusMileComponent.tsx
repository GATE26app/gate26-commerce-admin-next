import React, { useState } from 'react';

import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';

import InputBox from '@/components/common/Input';
import SelectBox from '@/components/common/SelectBox/SelectBox';

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
import { intComma } from '@/utils/format';
interface Props {
  EntriesData: EntriesResType;
  setEntriesData: React.Dispatch<React.SetStateAction<EntriesResType>>;
}
function MinusMileComponent({ EntriesData, setEntriesData }: Props) {
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
          응모시 차감 MILE
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
          type="text"
          placeholder="숫자로만 입력"
          w={'310px'}
          maxLength={10}
          value={EntriesData.point == 0 ? '' : intComma(EntriesData.point)}
          onChange={(e) =>
            setEntriesData({
              ...EntriesData,
              point: Number(e.target.value.replace(/[^0-9]/g, '')),
            })
          }
          // register={register('title')}
        />
      </Flex>
    </Flex>
  );
}

export default MinusMileComponent;
