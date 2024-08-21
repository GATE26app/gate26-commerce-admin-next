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
import Link from 'next/link';
import { GoodsBasicProps } from '@/app/apis/goods/GoodsApi.type';
import { usePartnerZuInfo } from '@/_store/PatnerInfo';

interface Props {
  list: GoodsBasicProps;
}

function ShippingComponent({ list }: Props) {
  const { partnerZuInfo, setPartnerZuInfo } = usePartnerZuInfo(
    (state) => state,
  );
  console.log('partnerZuInfo', partnerZuInfo);
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
          배송비 정책
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
          <Box w={'150px'}>
            <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
              배송비
            </Text>
          </Box>
          {partnerZuInfo.shippingType !== 0 ? (
            <Text
              color={ColorBlack}
              fontSize={'15px'}
              fontWeight={400}
              px={'10px'}
            >
              {partnerZuInfo.shippingType == 1
                ? '무료'
                : partnerZuInfo.shippingType == 2
                ? `${intComma(partnerZuInfo.shippingFee)}원`
                : `${intComma(partnerZuInfo.shippingFee)}원 (${intComma(
                    partnerZuInfo.shippingMinAmount,
                  )}원 이상 무료)`}
            </Text>
          ) : (
            <Link href={`/partner/detail?partnerId=${list.partnerId}`}>
              <Text
                color={ColorRed}
                fontSize={'15px'}
                fontWeight={400}
                px={'10px'}
                textDecoration={'underline'}
              >
                배송비 정책 입력하기
              </Text>
            </Link>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ShippingComponent;
