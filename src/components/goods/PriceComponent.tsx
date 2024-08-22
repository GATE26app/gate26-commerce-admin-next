import React, { useEffect, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import InputBox from '@/components/common/Input';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { intComma } from '@/utils/format';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import {
  GoodsBasicProps,
  GoodsDetailBasicProps,
} from '@/app/apis/goods/GoodsApi.type';

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
}
function PriceComponent({ list, setList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const originalPriceNum = list?.price / (1 - list?.priceDcPer / 100);
  useEffect(() => {
    if (list?.price !== 0) {
      setList({
        ...list,
        priceNet: list?.price / (1 - list?.priceDcPer / 100),
        priceDc: list?.price / (1 - list?.priceDcPer / 100) - list?.price,
      });
      // setList()
    }
  }, [list?.price, list?.priceDcPer]);

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
          판매가
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
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={'10px'}
        >
          <Box w={'288px'}>
            <InputBox
              placeholder="숫자로만 입력"
              type="text"
              maxLength={15}
              value={list.price == 0 ? '' : intComma(list.price)}
              onChange={(e: any) =>
                setList({
                  ...list,
                  price: Number(e.target.value.replace(/[^0-9]/g, '')),
                })
              }
              disabled={goodsInfo.LogItemDisable}
            />
          </Box>
          <Text
            color={ColorBlack}
            fontSize={'15px'}
            fontWeight={400}
            px={'10px'}
          >
            원
          </Text>
          <Box w={'288px'}>
            <InputBox
              placeholder="할인율"
              type="text"
              maxLength={2}
              value={list.priceDcPer}
              onChange={(e: any) =>
                setList({
                  ...list,
                  priceDcPer: Number(e.target.value.replace(/[^0-9]/g, '')),
                })
              }
              disabled={goodsInfo.LogItemDisable}
            />
          </Box>
          <Text
            color={ColorBlack}
            fontSize={'15px'}
            fontWeight={400}
            px={'10px'}
          >
            %
          </Text>
          <Text
            color={ColorBlack}
            fontSize={'15px'}
            fontWeight={400}
            px={'10px'}
          >
            원가 {intComma(list?.priceNet.toFixed(0))}원
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PriceComponent;
