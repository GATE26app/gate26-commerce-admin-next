import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';

import DatePicker from '@/components/common/DatePicker';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { EntriesResType } from '@/app/apis/entries/EntriesApi.type';

interface Props {
  EntriesData: EntriesResType;
  setEntriesData: React.Dispatch<React.SetStateAction<EntriesResType>>;
}
function EntriesDateComponent({ EntriesData, setEntriesData }: Props) {
  const [startDay, setStartDay] = useState<dayjs.Dayjs>(() =>
    dayjs(EntriesData.startDate),
  );
  const [endDay, setEndDay] = useState<dayjs.Dayjs>(() =>
    dayjs(EntriesData.endDate),
  );
  const [sState, setSState] = useState(false);
  const [eState, setEState] = useState(false);

  useEffect(() => {
    if (sState) {
      setEntriesData({
        ...EntriesData,
        startDate: `${dayjs(startDay).format('YYYY-MM-DD')} 00:00:00`,
      });
      setSState(false);
    }
    if (eState) {
      setEntriesData({
        ...EntriesData,
        endDate: `${dayjs(endDay).format('YYYY-MM-DD')} 23:59:59`,
      });
      setEState(false);
    }
  }, [sState, eState]);
  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderBottomWidth={0}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
      >
        <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
          응모기간
        </Text>
      </Flex>
      <Flex
        px={'30px'}
        py={'20px'}
        w={'100%'}
        flexDirection={'column'}
        borderWidth={1}
        borderColor={ColorGray400}
        borderBottomRadius={'12px'}
      >
        <Flex alignItems={'center'} gap={'5px'}>
          <DatePicker
            type={'date'}
            curDate={startDay}
            width={'310px'}
            minDateTime={dayjs(new Date()).format('YYYY-MM-DD')}
            maxDateTime={dayjs(EntriesData.endDate).format('YYYY-MM-DD')}
            onApply={(date) => {
              setStartDay(date);
              setSState(true);
              console.log(date);
            }}
          />
          <Text color={ColorBlack} fontSize={'15px'} fontWeight={500}>
            ~
          </Text>
          <DatePicker
            type={'date'}
            curDate={endDay}
            width={'310px'}
            minDateTime={
              EntriesData.startDate == ''
                ? ''
                : dayjs(EntriesData.startDate).format('YYYY-MM-DD')
            }
            onApply={(date) => {
              setEndDay(date);
              console.log(date);
              setEState(true);
            }}
          />
          {/* </Flex> */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default EntriesDateComponent;
