import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { ColorBlack00 } from '@/utils/_Palette';
import CouponGoodsContent from '@/components/coupon/goods/CouponGoodsContent';

function page() {
  return (
    <Box w={'100%'} pt={'60px'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/subtopicon04.png'}
            width={'20px'}
            height={'20px'}
            alt=" 상품 쿠폰관리"
          />
          <Text
            fontWeight={700}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            상품 쿠폰관리
          </Text>
        </Flex>
      </Flex>
      <CouponGoodsContent />
    </Box>
  );
}

export default page;
