import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderDetailItemType } from '@/app/apis/order/OrderApi.type';

import { ColorBlack, ColorDataTableBorderTop } from '@/utils/_Palette';
import { formatPhone } from '@/utils/format';

interface Props {
  info: OrderDetailItemType;
}
function OrderDelivery({ info }: Props) {
  return (
    <Box mt={'60px'}>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
        배송지 정보
      </Text>
      <Flex
        flexDirection={'column'}
        w={'100%'}
        borderTopColor={ColorDataTableBorderTop}
        borderTopWidth={1}
        mt={'15px'}
      >
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            수령인
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.recieverName !== null ? info.recieverName : '-'}
          </Text>
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            휴대폰번호
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.recieverHp !== null ? formatPhone(info.recieverHp) : '-'}
          </Text>
        </Flex>

        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            // flexShrink={0}
            color={ColorBlack}
          >
            주소
          </Text>

          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.address !== null && info.address !== ''
              ? `[${info.postcode}] ${info.address} ${info.addressDetail} `
              : '-'}
          </Text>
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            // flexShrink={0}
            color={ColorBlack}
          >
            배송메모
          </Text>

          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.shippingMemo !== null ? info.shippingMemo : '-'}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default OrderDelivery;
