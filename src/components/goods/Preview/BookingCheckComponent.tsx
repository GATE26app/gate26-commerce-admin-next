import React from 'react';

import { Box, Text } from '@chakra-ui/react';

import { ColorBlack } from '@/utils/_Palette';

function BookingCheckComponent({ comment }: { comment: string }) {
  return (
    <Box mx={'16px'} my={'20px'}>
      <Text color={ColorBlack} fontSize={'18px'} fontWeight={700}>
        예약전 확인사항
      </Text>
      <Box pt={'20px'}>
        <Text
          color={ColorBlack}
          fontWeight={400}
          fontSize={'16px'}
          whiteSpace={'pre-wrap'}
        >
          {comment}
        </Text>
      </Box>
    </Box>
  );
}

export default BookingCheckComponent;
