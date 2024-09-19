import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { ColorBlack00 } from '@/utils/_Palette';
import CouponGate26Content from '@/components/coupon/gate26/CouponGate26Content';

function page() {
  return (
    <Box w={'100%'} pt={'60px'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/subtopicon04.png'}
            width={'20px'}
            height={'20px'}
            alt="GATE26 쿠폰관리"
          />
          <Text
            fontWeight={700}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            GATE26 쿠폰관리
          </Text>
        </Flex>
      </Flex>
      <CouponGate26Content />
    </Box>
  );
}

export default page;
