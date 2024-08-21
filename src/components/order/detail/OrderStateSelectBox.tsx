import React, { useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray700,
  ColorInputBorder,
  ColorWhite,
} from '@/utils/_Palette';

interface Props {
  placeholder: string;
  width: string;
  list: Array<string>;
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  onClick: (type: string) => void;
}
function OrderStateSelectBox({
  onClick,
  placeholder,
  width,
  list,
  select,
  setSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Flex
      borderRadius={'10px'}
      borderWidth={1}
      borderColor={ColorInputBorder}
      alignItems={'center'}
      px={'12px'}
      py={'11px'}
      justifyContent={'space-between'}
      bgColor={ColorWhite}
      cursor={'pointer'}
      onClick={() => setOpen(!open)}
      w={width}
      boxSizing={'border-box'}
      position={'relative'}
      zIndex={1}
    >
      <Text
        color={ColorGray700}
        fontSize={'15px'}
        fontWeight={400}
        lineHeight={'15px'}
      >
        {select == '' ? placeholder : select}
      </Text>
      {open ? (
        <Image
          src={'/images/Page/input_select_up.png'}
          width={'20px'}
          height={'20px'}
          alt="select arrow"
        />
      ) : (
        <Image
          src={'/images/Page/input_select_down.png'}
          width={'20px'}
          height={'20px'}
          alt="select arrow"
        />
      )}
      {open && (
        <Flex
          bgColor={ColorWhite}
          borderWidth={1}
          borderColor={ColorInputBorder}
          borderRadius={'10px'}
          flexDirection={'column'}
          position={'absolute'}
          top={'45px'}
          left={0}
          w={width}
          zIndex={999}
          display={'block'}
          maxHeight={'220px'}
          overflowY={'auto'}
        >
          {list &&
            list.map((item: string, index: number) => {
              return (
                <Box
                  key={index}
                  px={'15px'}
                  py={'12px'}
                  cursor={'pointer'}
                  onClick={() => {
                    onClick(item);
                    // setSelect(item);
                    // setOpen(false);
                  }}
                >
                  <Text
                    color={item == select ? ColorBlack : ColorGray700}
                    fontSize={'15px'}
                    fontWeight={500}
                    lineHeight={'15px'}
                  >
                    {item}
                  </Text>
                </Box>
              );
            })}
        </Flex>
      )}
    </Flex>
  );
}

export default OrderStateSelectBox;
