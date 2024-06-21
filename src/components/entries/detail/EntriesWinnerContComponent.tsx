import React, { useEffect, useState } from 'react';

import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';

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
interface Props {
  EntriesData: EntriesResType;
  setEntriesData: React.Dispatch<React.SetStateAction<EntriesResType>>;
}
function EntriesWinnerContComponent({ EntriesData, setEntriesData }: Props) {
  const arr = Array(100)
    .fill(undefined)
    .map((v, i) => `${i + 1}`);
  const [select, setSelect] = useState('');

  useEffect(() => {
    if (EntriesData) {
      setSelect(String(EntriesData.winnerCnt));
    }
  }, [EntriesData]);
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
          당첨자수
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
          placeholder="당첨자수선택"
          width={'310px'}
          list={arr}
          select={select}
          setSelect={setSelect}
          onClick={(data: string) => {
            // setSelect
            setEntriesData({ ...EntriesData, winnerCnt: Number(data) });
          }}
        />
      </Flex>
    </Flex>
  );
}

export default EntriesWinnerContComponent;
