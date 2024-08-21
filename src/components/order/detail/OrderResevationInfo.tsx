import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderDetailItemType } from '@/app/apis/order/OrderApi.type';

import { ColorBlack, ColorDataTableBorderTop } from '@/utils/_Palette';
import { formatPhone } from '@/utils/format';

interface Props {
  info: OrderDetailItemType;
}
function OrderResevationInfo({ info }: Props) {
  return (
    <Box mt={'60px'}>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
        예약자 정보
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
            주문자 이름
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.orderName !== null && info.orderName !== ''
              ? info.orderName
              : '-'}
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
            주문자 ID
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.orderName !== null && info.orderName !== ''
              ? info.orderName
              : '-'}
          </Text>
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
            whiteSpace={'pre-wrap'}
          >
            {'주문자\n휴대폰번호'}
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.orderHp !== null && info.orderHp !== ''
              ? formatPhone(info.orderHp)
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
            whiteSpace={'pre-wrap'}
          >
            {`예약자이메일`}
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.orderEmail !== null && info.orderEmail !== ''
              ? info.orderEmail
              : '-'}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default OrderResevationInfo;
