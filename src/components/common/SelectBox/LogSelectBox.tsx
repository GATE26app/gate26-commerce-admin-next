import React, { useEffect, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { LodListType } from '@/app/apis/goods/GoodsApi.type';

import {
  ColorBlue,
  ColorGray700,
  ColorInputBorder,
  ColorMainBackBule,
  ColorWhite,
} from '@/utils/_Palette';

interface Props {
  placeholder: string;
  width: string;
  list: Array<LodListType>;
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  onClick?: (data: string) => void;
}
function LogSelectBox({
  placeholder,
  width,
  list,
  select,
  setSelect,
  onClick,
}: Props) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('');

  useEffect(() => {
    console.log('list', list);
    if (list.length > 0) {
      console.log('list*********');
      setSelect(list[0]?.version);
      setState(list[0]?.forSaleName);
    }
  }, [list]);

  return (
    <Flex
      borderRadius={'10px'}
      borderWidth={1}
      borderColor={ColorInputBorder}
      alignItems={'center'}
      px={'15px'}
      py={'10px'}
      justifyContent={'space-between'}
      bgColor={ColorWhite}
      cursor={'pointer'}
      onClick={() => setOpen(!open)}
      w={width}
      boxSizing={'border-box'}
      position={'relative'}
      // zIndex={1}
    >
      <Flex alignItems={'center'}>
        <Text
          color={ColorGray700}
          fontSize={'15px'}
          fontWeight={500}
          lineHeight={'15px'}
        >
          {select == '' ? placeholder : select}
        </Text>
        <Box
          bgColor={ColorMainBackBule}
          px={'5px'}
          py={'3px'}
          borderRadius={'5px'}
          ml={'10px'}
        >
          <Text fontSize={'12px'} fontWeight={600} color={ColorBlue}>
            {state}
          </Text>
        </Box>
      </Flex>
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
          zIndex={9999}
          display={'block'}
          maxHeight={'220px'}
          overflowY={'scroll'}
        >
          {list &&
            list.map((item: LodListType, index: number) => {
              return (
                <Flex
                  flexDirection={'row'}
                  alignItems={'center'}
                  key={index}
                  px={'15px'}
                  py={'12px'}
                  cursor={'pointer'}
                  onClick={() => {
                    setSelect(item.version);
                    setOpen(false);
                    if (onClick) {
                      onClick(item.itemId);
                    }
                  }}
                >
                  <Text
                    color={ColorGray700}
                    fontSize={'15px'}
                    fontWeight={500}
                    lineHeight={'15px'}
                  >
                    {item.version}
                  </Text>
                  <Box
                    bgColor={ColorMainBackBule}
                    px={'5px'}
                    py={'3px'}
                    borderRadius={'5px'}
                    ml={'10px'}
                  >
                    <Text fontSize={'12px'} fontWeight={600} color={ColorBlue}>
                      {item.forSaleName}
                    </Text>
                  </Box>
                </Flex>
              );
            })}
        </Flex>
      )}
    </Flex>
  );
}

export default LogSelectBox;
