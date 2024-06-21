import React, { ReactElement } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';
import EntriesFirstContent from '@/components/entries/first/EntriesFirstContent';

function page() {
  return (
    <Box w={'100%'} pt={'60px'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/subtopicon05.png'}
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
            선착순상품응모
          </Text>
        </Flex>
      </Flex>
      {/* <OrderState /> */}
      <EntriesFirstContent />
    </Box>
  );
}

export default page;
