import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray50,
  ColorGrayBorder,
  ColorWhite,
} from '@/utils/_Palette';

import { orderGoodheader } from '@/utils/headerData';
import GoodsInfoCard from './GoodsInfoCard';
import { OrderDetailItemType } from '@/app/apis/order/OrderApi.type';

interface ItemProps {
  id: number;
  orderDate: string;
  orderNum: string;
  GoodOrderNum: string;
  image: string;
  category1: string;
  goodsName: string;
  option: string;
  price: number;
  payment: string;
  orderPrice: number;
  orderemail: string;
  ordername: string;
  orderphone: string;
  useDate: string;
  state: string;
  delivery: string;
}

interface DataHeaderProps {
  name: string;
  width: string;
}

interface Props {
  info: OrderDetailItemType;
}
function CancelInfoCard({ info }: Props) {
  return (
    <Box
      bgColor={ColorWhite}
      borderRadius={'12px'}
      mt={'20px'}
      w={'100%'}
      mb={'20px'}
    >
      <Flex
        flexDirection={'row'}
        w={'100%'}
        // borderTopColor={ColorDataTableBorderTop}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
        // mt={'15px'}
        justifyContent={'center'}
      >
        {orderGoodheader.map((item: DataHeaderProps, index: number) => {
          return (
            <Flex
              w={item.width}
              alignItems={'center'}
              justifyContent={'center'}
              h={'49px'}
              key={index}
            >
              <Text
                color={ColorBlack}
                fontSize={'15px'}
                fontWeight={700}
                whiteSpace={'pre-wrap'}
                textAlign={'center'}
              >
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Flex>
      {info && <GoodsInfoCard item={info} header={orderGoodheader} />}
    </Box>
  );
}

export default CancelInfoCard;
