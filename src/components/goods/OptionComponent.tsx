import React, { useState } from 'react';

import dayjs from 'dayjs';

import { Flex, Image, Text } from '@chakra-ui/react';

import {
  GoodsBasicProps,
  OptionProps,
  optionInputsProps,
} from '@apis/goods/GoodsApi.type';

import { ColorBlack, ColorGray50, ColorGray400 } from '@utils/_Palette';

import OptionList from './OptionList';
import OptionPlus from './OptionPlus';

interface Option {
  optionName: string;
  optionValue: string;
  price: number;
  stock: number;
}

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
  optionList: Array<OptionProps>;
  setOptionList: React.Dispatch<React.SetStateAction<OptionProps[]>>;
  optionInputList: Array<optionInputsProps>;
  setOptionInputList: React.Dispatch<React.SetStateAction<optionInputsProps[]>>;
}
function OptionComponent({
  list,
  setList,
  optionList,
  setOptionList,
  optionInputList,
  setOptionInputList,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
        alignItems={'center'}
        borderBottomRadius={open ? 0 : '12px'}
        justifyContent={'space-between'}
      >
        <Flex>
          <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
            옵션
          </Text>
        </Flex>
        <Flex>
          {open ? (
            <Image
              src={'/images/Page/icon_regist_up.png'}
              width={'40px'}
              height={'40px'}
              alt="카테고리 삭제"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <Image
              src={'/images/Page/icon_regist_down.png'}
              width={'40px'}
              height={'40px'}
              alt="카테고리 삭제"
              onClick={() => setOpen(!open)}
            />
          )}
        </Flex>
      </Flex>
      {open && (
        <Flex
          px={'30px'}
          py={'20px'}
          w={'100%'}
          borderWidth={1}
          borderTopWidth={0}
          borderColor={ColorGray400}
          flexDirection={'column'}
          borderBottomRadius={'12px'}
        >
          {/* <OptionForm /> */}
          {optionList !== undefined && (
            <OptionPlus
              list={list}
              setList={setList}
              optionList={optionList}
              setOptionList={setOptionList}
              optionInputList={optionInputList}
              setOptionInputList={setOptionInputList}
            />
          )}

          {optionList !== undefined ? (
            optionList?.length > 0 && (
              <OptionList
                list={list}
                setList={setList}
                optionList={optionList}
                setOptionList={setOptionList}
              />
            )
          ) : (
            <></>
          )}
        </Flex>
      )}
    </Flex>
  );
}

export default OptionComponent;
