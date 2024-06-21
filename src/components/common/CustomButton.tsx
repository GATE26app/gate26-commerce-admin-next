import { Button as ChakraButton, Flex, Text } from '@chakra-ui/react';

import styled from '@emotion/styled';

export interface ButtonProps {
  px?: string;
  py?: string;
  text: string;
  onClick?: () => void;
  fontSize: string;
  color: string;
  borderColor: string;
  bgColor: string;
  borderRadius?: string;
  fontWeight?: number;
  disabled?: boolean;
}

const CustomButton = ({
  px,
  py,
  text,
  onClick,
  fontSize = '15px',
  fontWeight = 400,
  color,
  borderColor,
  bgColor,
  borderRadius = '10px',
  disabled = false,
}: ButtonProps) => {
  return (
    <Flex
      px={px}
      py={py}
      borderWidth={1}
      bgColor={bgColor}
      borderColor={borderColor}
      onClick={disabled ? undefined : onClick}
      borderRadius={borderRadius}
      alignItems="center"
      justifyContent="center"
      cursor={'pointer'}
      opacity={disabled ? 0.5 : 1}
    >
      <Text
        fontSize={fontSize}
        lineHeight={fontSize}
        color={color}
        fontWeight={fontWeight}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default CustomButton;
