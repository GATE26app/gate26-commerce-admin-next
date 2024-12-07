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
function OrderAmount({ info }: Props) {
  return (
    <Box mt={'60px'}>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
        주문정보
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
            상품금액
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {intComma(info.orderAmount)}원
          </Text>
        </Flex>
        {info.orderType == 1 && (
          <Flex mt={'15px'} alignItems={'center'}>
            <Text
              w={'160px'}
              fontSize={'15px'}
              fontWeight={700}
              // flexShrink={0}
              color={ColorBlack}
            >
              배송비
            </Text>
            <Flex flexDirection={'column'}>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {intComma(info.shipping?.shippingFee)}원
              </Text>
            </Flex>
          </Flex>
        )}
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            // flexShrink={0}
            color={ColorBlack}
          >
            할인금액
          </Text>
          <Flex flexDirection={'column'}>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              (-) {intComma(info.discountAmount)}원
            </Text>
            {info.coupons.length > 0 &&
              info.coupons.map((item, idx) => {
                return (
                  <Text
                    color={ColorGray700}
                    fontWeight={400}
                    fontSize={'15px'}
                    key={item.couponDownload?.coupon?.title + '_' + idx}
                  >
                    {item.couponDownload?.coupon?.title}{' '}
                    {intComma(item.couponDownload?.coupon?.priceDc)}원
                  </Text>
                );
              })}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default OrderAmount;
