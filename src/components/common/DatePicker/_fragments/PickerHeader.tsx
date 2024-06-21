import React from 'react';

import dayjs from 'dayjs';

import { Center, Flex, Text } from '@chakra-ui/react';
import ArrowLeftIcon from '../../@Icons/System/ArrowLeft';
import ArrowRightIcon from '../../@Icons/System/ArrowRight';

// import ArrowLeftIcon from '@icons/System/ArrowLeft';
// import ArrowRightIcon from '@icons/System/ArrowRight';

interface PickerHeaderProps {
  date: dayjs.Dayjs;
  setDate: (val: dayjs.Dayjs) => void;
}

const PickerHeader = ({ date, setDate }: PickerHeaderProps) => {
  const jumpToMonth = (num: number) =>
    num
      ? setDate(date.clone().add(1, 'month'))
      : setDate(date.clone().subtract(1, 'month'));

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      padding={'20px 0'}
    >
      <Center
        w="30px"
        h="30px"
        cursor="pointer"
        onClick={async () => {
          jumpToMonth(0);
        }}
      >
        <ArrowLeftIcon />
      </Center>

      <Text
        fontWeight="bold"
        fontSize="15px"
        color="primary.500"
        margin={'0 21px'}
      >
        {date?.format('YYYY년 MM월')}
      </Text>

      <Center
        w="30px"
        h="30px"
        cursor="pointer"
        onClick={() => {
          jumpToMonth(1);
        }}
      >
        <ArrowRightIcon />
      </Center>
    </Flex>
  );
};

export default PickerHeader;
