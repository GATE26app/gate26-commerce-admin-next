import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ColorBlack, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';
import { policiesDTO } from '@/apis/goods/GoodsApi.type';

function CancelComponent({ info }: { info: Array<policiesDTO> }) {
  return (
    <Box mx={'16px'} my={'20px'}>
      <Text color={ColorBlack} fontSize={'18px'} fontWeight={700}>
        취소 및 환불 규정
      </Text>
      <Box pt={'20px'}>
        {info &&
          info.map((item, index) => {
            return (
              <Text
                key={index}
                color={ColorBlack}
                fontWeight={400}
                fontSize={'16px'}
              >
                {item.title?.split('<br/>').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Text>
            );
          })}
      </Box>
    </Box>
  );
}

export default CancelComponent;
