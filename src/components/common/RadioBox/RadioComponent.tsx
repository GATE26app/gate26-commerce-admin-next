import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Box, HStack, Stack, Text } from '@chakra-ui/react';

import { ColorBlack } from '@/utils/_Palette';

interface Props {
  text: string;
  checked: boolean;
  onClick: () => void;
  disabled?: boolean;
}
function RadioComponent({ text, checked, onClick, disabled }: Props) {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    setCheck(checked);
  }, [checked]);
  return (
    <HStack
      spacing={'10px'}
      cursor={'pointer'}
      onClick={() => {
        if (disabled) {
          undefined;
        } else {
          onClick();
          setCheck(!check);
        }
      }}
    >
      {check ? (
        <Image
          src={'/images/Page/radio_on.png'}
          alt="라디오 on 버튼"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src={'/images/Page/radio_off.png'}
          alt="라디오 off 버튼"
          width={24}
          height={24}
        />
      )}
      <Text color={ColorBlack} fontSize={'15px'} fontWeight={500}>
        {text}
      </Text>
    </HStack>
  );
}

export default RadioComponent;
