import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';

import DatePicker from '@/components/common/DatePicker';
import InputBox from '@/components/common/Input';
import SelectBox from '@/components/common/SelectBox/SelectBox';

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
function OpenDateComponent({ EntriesData, setEntriesData }: Props) {
  const [curDay, setCurDay] = useState<dayjs.Dayjs>(() =>
    dayjs(EntriesData.openDate),
  );
  const [oState, setOState] = useState(false);
  useEffect(() => {
    if (oState) {
      setEntriesData({
        ...EntriesData,
        openDate: `${dayjs(curDay).format('YYYY-MM-DD HH:mm')}:00`,
      });
      setOState(false);
    }
  }, [oState]);
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
          오픈일
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
        <DatePicker
          type={'datetime'}
          curDate={curDay}
          width={'310px'}
          minDateTime={dayjs(new Date()).format('YYYY-MM-DD')}
          maxDateTime={EntriesData.openDate}
          onApply={(date) => {
            setOState(true);
            setCurDay(date);
            console.log(date);
          }}
        />
      </Flex>
    </Flex>
  );
}

export default OpenDateComponent;
