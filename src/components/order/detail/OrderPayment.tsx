import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderDetailItemType } from '@/app/apis/order/OrderApi.type';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray700,
} from '@/utils/_Palette';
import { PaymentMethod, intComma } from '@/utils/format';

interface Props {
  info: OrderDetailItemType;
}
function OrderPayment({ info }: Props) {
  return (
    <Box mt={'60px'}>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
        결제정보
      </Text>
      <Flex
        flexDirection={'column'}
        w={'100%'}
        borderTopColor={ColorDataTableBorderTop}
        borderTopWidth={1}
        mt={'15px'}
      >
        {info.payment !== null && (
          <Flex mt={'15px'} alignItems={'center'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              결제일시
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {info.paymentDate}
            </Text>
          </Flex>
        )}
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            총 결제금액
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {intComma(info.payment == null ? 0 : info.payment?.amount)}원
          </Text>
        </Flex>
        {info.payment !== null && (
          <Flex mt={'15px'} alignItems={'center'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              결제수단
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {/* {info.paymentMethod == 'card' ? '카드' : '무통장입금'} */}
              {PaymentMethod(info.paymentMethod)}
            </Text>
          </Flex>
        )}

        {info.paymentMethod == 'card' && (
          <Flex mt={'15px'} alignItems={'center'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              flexShrink={0}
              color={ColorBlack}
            >
              카드사명
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {/* {info.paymentMethod == 'card' ? '카드' : '무통장입금'} */}
              {info?.payment.cardName}
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default OrderPayment;
