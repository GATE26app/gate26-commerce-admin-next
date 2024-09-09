import React from 'react';
import { ColorBlack00 } from '@/utils/_Palette';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import CouponPartnerContent from '@/components/coupon/partner/CouponPartnerContent';

function page() {
  return (
    <Box w={'100%'} pt={'60px'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/subtopicon04.png'}
            width={'20px'}
            height={'20px'}
            alt="선착순상품응모"
          />
          <Text
            fontWeight={700}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            파트너사 쿠폰관리
          </Text>
        </Flex>
      </Flex>
      <CouponPartnerContent />
    </Box>
  );
}

export default page;
