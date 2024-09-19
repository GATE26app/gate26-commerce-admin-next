import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Flex, Text } from '@chakra-ui/react';

import DatePicker from '@/components/common/DatePicker';

import { ColorBlack, ColorGray50, ColorGray400 } from '@/utils/_Palette';
import { CouponDataType } from '@/app/apis/coupon/CouponApi.type';

interface Props {
  CouponData: CouponDataType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataType>>;
}
function CouponDateComponent({ CouponData, setCouponData }: Props) {
  const [openDay, setOpenDay] = useState<dayjs.Dayjs>(() =>
    dayjs(CouponData.startDate),
  );
  const [endDay, setEndDay] = useState<dayjs.Dayjs>(() =>
    dayjs(CouponData.endDate),
  );
  const [sState, setSState] = useState(false);
  const [eState, setEState] = useState(false);

  //상세에서 날짜 안불러올때 다시 추가
  useEffect(() => {
    if (CouponData?.startDate !== '' && CouponData?.startDate !== null) {
      setOpenDay(dayjs(CouponData.startDate));
    }
    if (CouponData?.endDate !== '' && CouponData?.endDate !== null) {
      setEndDay(dayjs(CouponData.endDate));
    }
  }, [CouponData]);
  useEffect(() => {
    if (sState) {
      setCouponData({
        ...CouponData,
        startDate: `${dayjs(openDay).format('YYYY-MM-DD HH:mm')}:00`,
      });
      setSState(false);
    }
    if (eState) {
      setCouponData({
        ...CouponData,
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
          유효기간
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
            curDate={openDay}
            width={'310px'}
            minDateTime={dayjs(new Date()).format('YYYY-MM-DD')}
            maxDateTime={dayjs(CouponData.endDate).format('YYYY-MM-DD')}
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
            type={'date'}
            curDate={endDay}
            width={'310px'}
            minDateTime={
              CouponData.startDate == ''
                ? ''
                : dayjs(CouponData.startDate).format('YYYY-MM-DD')
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
          {/* </Flex> */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CouponDateComponent;
