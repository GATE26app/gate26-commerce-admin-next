import { CouponDataType } from '@/app/apis/coupon/CouponApi.type';
import InputBox from '@/components/common/Input';
import {
  ColorBlack,
  ColorGray400,
  ColorGray50,
  ColorWhite,
} from '@/utils/_Palette';
import { intComma } from '@/utils/format';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
interface Props {
  CouponData: CouponDataType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataType>>;
}
function CouponTypeComponent({ CouponData, setCouponData }: Props) {
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
          할인유형
        </Text>
      </Flex>
      <Flex
        px={'30px'}
        py={'20px'}
        w={'100%'}
        flexDirection={'row'}
        borderWidth={1}
        borderColor={ColorGray400}
        borderBottomRadius={'12px'}
        gap={'10px'}
      >
        <Flex
          borderRadius={'10px'}
          px={'14px'}
          py={'16px'}
          backgroundColor={CouponData.dcType == 1 ? ColorBlack : ColorWhite}
          borderWidth={1}
          borderColor={CouponData.dcType == 1 ? ColorBlack : ColorGray400}
          onClick={() =>
            setCouponData({
              ...CouponData,
              dcType: 1,
            })
          }
          cursor={'pointer'}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            color={CouponData.dcType == 1 ? ColorWhite : ColorBlack}
          >
            원
          </Text>
        </Flex>
        <Flex
          borderRadius={'10px'}
          px={'14px'}
          py={'16px'}
          borderWidth={1}
          backgroundColor={CouponData.dcType == 2 ? ColorBlack : ColorWhite}
          borderColor={CouponData.dcType == 2 ? ColorBlack : ColorGray400}
          onClick={() =>
            setCouponData({
              ...CouponData,
              dcType: 2,
            })
          }
          cursor={'pointer'}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            color={CouponData.dcType == 2 ? ColorWhite : ColorBlack}
          >
            %
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CouponTypeComponent;
