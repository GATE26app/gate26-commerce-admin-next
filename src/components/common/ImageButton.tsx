import React from 'react';

import { Flex, Image, Text } from '@chakra-ui/react';

import { ColorGray600, ColorGrayBorder, ColorWhite } from '@/utils/_Palette';

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  img: string;
  backgroundColor: string;
  borderColor: string;
  TextColor: string;
  imgWidth: string;
  imgHeight: string;
  fontSize: string;
  px: string;
  py: string;
}

function ImageButton({
  img,
  text,
  onClick,
  backgroundColor,
  borderColor,
  TextColor,
  imgWidth,
  imgHeight,
  fontSize,
  px,
  py,
}: ButtonProps) {
  return (
    <Flex
      // w={width}
      px={px}
      py={py}
      borderRadius={'10px'}
      borderWidth={1}
      borderColor={borderColor}
      bgColor={backgroundColor}
      justifyContent={'center'}
      alignItems={'center'}
      onClick={onClick}
      cursor={'pointer'}
      boxSizing="border-box"
    >
      <Image src={img} width={imgWidth} height={imgHeight} alt="상품관리" />
      <Text
        color={TextColor}
        fontSize={fontSize}
        fontWeight={500}
        lineHeight={fontSize}
        ml={'10px'}
      >
        {text}
      </Text>
    </Flex>
  );
}

export default ImageButton;
