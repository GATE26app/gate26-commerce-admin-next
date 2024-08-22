import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import InputBox from '@/components/common/Input';

import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorRed,
} from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import {
  GoodsBasicProps,
  GoodsDetailBasicProps,
} from '@/app/apis/goods/GoodsApi.type';

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
}

function GoodNameComponent({ list, setList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
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
          상품명
        </Text>
        <Text color={ColorRed} fontWeight={800} ml={'3px'} lineHeight={'12px'}>
          *
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
          placeholder="상품명을 입력해주세요."
          value={list?.title}
          onChange={(e: any) => setList({ ...list, title: e.target.value })}
          disabled={goodsInfo.LogItemDisable}
          // register={register('title')}
        />
      </Flex>
    </Flex>
  );
}

export default GoodNameComponent;
