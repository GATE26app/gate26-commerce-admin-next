import Image from 'next/image';
import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { ColorGray400, ColorRed, ColorRed50 } from '@/utils/_Palette';

function Header() {
  return (
    <Box
      px={'140px'}
      py={'22px'}
      borderBottomColor={ColorGray400}
      borderBottomWidth={1}
      background={'#00000008'}
      boxShadow={'lg'}
      mb={'3px'}
    >
      <Flex flexDirection={'row'} alignItems={'center'}>
        <Image
          src={'/images/header/icon_logo_big.png'}
          width={145}
          height={41}
          alt="로고"
          priority={true}
        />
        <Box
          bgColor={'rgba(255,223,219,0.38)'}
          borderRadius={'11px'}
          px={'6px'}
          py={'2px'}
          ml={'18px'}
        >
          <Text fontSize={'13px'} fontWeight={600} color={ColorRed}>
            파트너스
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
