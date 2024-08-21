import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderDetailItemType } from '@/app/apis/order/OrderApi.type';

import { ColorBlack, ColorDataTableBorderTop } from '@/utils/_Palette';
import { formatPhone } from '@/utils/format';

interface Props {
  info: OrderDetailItemType;
}
function OrderBuyerInfo({ info }: Props) {
  return (
    <Box>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
        주문자 정보
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
            {info.buyerName !== null && info.buyerName !== ''
              ? info.buyerName
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
            {info.buyerHp !== null && info.buyerHp !== ''
              ? formatPhone(info.buyerHp)
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
            {`예약/이용정보\n받을 이메일`}
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.buyerEmail !== null && info.buyerEmail !== ''
              ? info.buyerEmail
              : '-'}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default OrderBuyerInfo;
