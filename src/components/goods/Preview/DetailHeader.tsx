import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import { ColorBlack, ColorWhite } from '@/utils/_Palette';

function DetailHeader() {
  return (
    <Flex
      position="sticky"
      top="0px"
      py={'17px'}
      px={'16px'}
      bgColor={ColorWhite}
      zIndex={99}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box flexBasis={'33.3%'}></Box>
      <Text
        fontWeight={700}
        fontSize={'20px'}
        color={ColorBlack}
        flexBasis={'33.3%'}
        textAlign={'center'}
      >
        상품 미리보기
      </Text>
      <Flex gap={'10px'} flexBasis={'33.3%'} justifyContent={'flex-end'}>
        <Flex></Flex>
      </Flex>
    </Flex>
  );
}

export default DetailHeader;
