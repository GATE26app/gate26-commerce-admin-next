import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import InputBox from '@/components/common/Input';

import { ColorBlack, ColorGray50, ColorGray400 } from '@/utils/_Palette';
import { CouponDataType } from '@/app/apis/coupon/CouponApi.type';
interface Props {
  CouponData: CouponDataType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataType>>;
}
function CouponTitleComponent({ CouponData, setCouponData }: Props) {
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
          쿠폰명
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
        <InputBox
          value={CouponData.title}
          onChange={(e: any) =>
            setCouponData({
              ...CouponData,
              title: e.target.value,
            })
          }
          placeholder="쿠폰명을 입력해주세요."
          // register={register('title')}
        />
      </Flex>
    </Flex>
  );
}

export default CouponTitleComponent;
