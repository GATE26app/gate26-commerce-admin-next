import Image from 'next/image';
import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { ColorBlack } from '@/utils/_Palette';

import { CheckBoxProps } from './CheckBox.type';

const CheckBox = ({
  checked,
  disabled,
  children,
  onClick,
  width,
  height,
  ...props
}: CheckBoxProps) => {
  return (
    <Flex
      cursor="pointer"
      alignItems="center"
      {...props}
      onClick={() => onClick && onClick()}
    >
      {disabled ? (
        <Image
          src={'/images/icon_check_off.png'}
          width={21}
          height={21}
          alt="checkbox"
        />
      ) : checked ? (
        <Image
          src={'/images/icon_check_on.png'}
          width={21}
          height={21}
          alt="checkbox"
        />
      ) : (
        <Image
          src={'/images/icon_check_off.png'}
          width={21}
          height={21}
          alt="checkbox"
        />
      )}
      {typeof children === 'string' ? (
        <Text fontSize={'15px'} ml="10px" color={ColorBlack}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Flex>
  );
};

export default CheckBox;
