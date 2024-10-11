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
import { BannerResType } from '@/app/apis/banner/BannerApi.type';

interface Props {
  BannerInfo: BannerResType;
  setBannerInfo: React.Dispatch<React.SetStateAction<BannerResType>>;
}
function DateComponent({ BannerInfo, setBannerInfo }: Props) {
  const [openDay, setOpenDay] = useState<dayjs.Dayjs>(() =>
    dayjs(BannerInfo.openDate),
  );
  const [endDay, setEndDay] = useState<dayjs.Dayjs>(() =>
    dayjs(BannerInfo.endDate),
  );
  const [sState, setSState] = useState(false);
  const [eState, setEState] = useState(false);

  //상세에서 날짜 안불러올때 다시 추가
  useEffect(() => {
    if (BannerInfo?.openDate !== '' && BannerInfo?.openDate !== null) {
      setOpenDay(dayjs(BannerInfo.openDate));
    }
    if (BannerInfo?.endDate !== '' && BannerInfo?.endDate !== null) {
      setEndDay(dayjs(BannerInfo.endDate));
    }
  }, [BannerInfo]);
  useEffect(() => {
    if (sState) {
      setBannerInfo({
        ...BannerInfo,
        openDate: `${dayjs(openDay).format('YYYY-MM-DD HH:mm')}:00`,
      });
      setSState(false);
    }
    if (eState) {
      setBannerInfo({
        ...BannerInfo,
        endDate: `${dayjs(endDay).format('YYYY-MM-DD HH:mm')}:00`,
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
          노출기간 설정
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
            type={'datetime'}
            curDate={openDay}
            width={'310px'}
            // minDateTime={dayjs(new Date()).format('YYYY-MM-DD')}
            // maxDateTime={dayjs(BannerInfo.endDate).format('YYYY-MM-DD')}
            onApply={(date) => {
              setOpenDay(
                date.format('YYYY-MM-DD') == 'Invalid Date'
                  ? dayjs(new Date())
                  : date,
              );
              setSState(true);
              console.log('date', date.format('YYYY-MM-DD'));
            }}
          />
          <Text color={ColorBlack} fontSize={'15px'} fontWeight={500}>
            ~
          </Text>
          <DatePicker
            type={'datetime'}
            curDate={endDay}
            width={'310px'}
            minDateTime={
              BannerInfo.openDate == ''
                ? ''
                : dayjs(BannerInfo.openDate).format('YYYY-MM-DD')
            }
            onApply={(date) => {
              setEndDay(
                date.format('YYYY-MM-DD') == 'Invalid Date'
                  ? dayjs(new Date())
                  : date,
              );
              console.log(date);
              setEState(true);
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default DateComponent;
