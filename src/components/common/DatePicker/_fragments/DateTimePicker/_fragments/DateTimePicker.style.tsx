import { ColorGray100, ColorRed } from '@/utils/_Palette';
import { Box, Flex } from '@chakra-ui/react';

import styled from '@emotion/styled';

export const TimeBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 27px;
  letter-spacing: -2%;
  width: 50px;
  height: 32px;
  border-radius: 5px;

  &.cur {
    font-weight: bold;
    color: white;
    background-color: ${() => ColorRed};
    &:hover {
      background-color: ${() => ColorRed};
    }
  }
  &.select {
    background-color: ${() => ColorGray100};
  }
  &:hover {
    background-color: ${() => ColorGray100};
  }
`;

export const FlexHidden = styled(Flex)`
  height: 255px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
