import React, { useEffect, useState } from 'react';

import { Box, Flex, Image, Input, Text, useEditable } from '@chakra-ui/react';

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
interface Props {
  EntriesData: EntriesResType;
  setEntriesData: React.Dispatch<React.SetStateAction<EntriesResType>>;
}
function EntriesStatusComponent({ EntriesData, setEntriesData }: Props) {
  const selectlist = ['노출함', '노출안함']; //1=>노출, 2=>미노출
  const [select, setSelect] = useState('노출함');

  useEffect(() => {
    if (EntriesData) {
      setSelect(EntriesData.level == 1 ? '노출함' : '노출안함');
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
          노출상태
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
          placeholder="노출여부"
          width={'310px'}
          list={selectlist}
          select={select}
          setSelect={setSelect}
          onClick={(data) => {
            setEntriesData({ ...EntriesData, level: data == '노출함' ? 1 : 2 });
          }}
        />
      </Flex>
    </Flex>
  );
}

export default EntriesStatusComponent;
