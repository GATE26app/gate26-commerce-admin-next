import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Flex, Text } from '@chakra-ui/react';

import DatePicker from '@/components/common/DatePicker';

import { ColorBlack, ColorGray50, ColorGray400 } from '@/utils/_Palette';
import { CouponDataResType } from '@/app/apis/coupon/CouponApi.type';
import SelectBox from '@/components/common/SelectBox';

interface Props {
  CouponData: CouponDataResType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataResType>>;
}
function CouponExposureStatusComponent({ CouponData, setCouponData }: Props) {
  const selectlist = ['노출함', '노출안함']; //1=>노출, 2=>미노출
  const [select, setSelect] = useState('노출함');

  useEffect(() => {
    if (CouponData) {
      setSelect(CouponData.level == 1 ? '노출함' : '노출안함');
    }
  }, [CouponData]);
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
          노출상태
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
        <SelectBox
          placeholder="노출여부"
          width={'310px'}
          list={selectlist}
          select={select}
          setSelect={setSelect}
          onClick={(data) => {
            setCouponData({ ...CouponData, level: data == '노출함' ? 1 : 2 });
          }}
        />
      </Flex>
    </Flex>
  );
}

export default CouponExposureStatusComponent;
