import { CouponDataType } from '@/app/apis/coupon/CouponApi.type';
import InputBox from '@/components/common/Input';
import { ColorBlack, ColorGray400, ColorGray50 } from '@/utils/_Palette';
import { intComma } from '@/utils/format';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
interface Props {
  CouponData: CouponDataType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataType>>;
}
function CouponMinPriceComponent({ CouponData, setCouponData }: Props) {
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
          최소주문금액
        </Text>
      </Flex>
      <Flex
        px={'30px'}
        py={'20px'}
        w={'100%'}
        flexDirection={'row'}
        alignItems={'center'}
        borderWidth={1}
        borderColor={ColorGray400}
        borderBottomRadius={'12px'}
      >
        <Box w={'288px'}>
          <InputBox
            placeholder="숫자로만 입력"
            type="text"
            maxLength={15}
            value={intComma(CouponData.minOrderAmount)}
            onChange={(e: any) =>
              setCouponData({
                ...CouponData,
                minOrderAmount: Number(e.target.value.replace(/[^0-9]/g, '')),
              })
            }
          />
        </Box>
        <Text color={ColorBlack} fontWeight={400} fontSize={'14px'} ml={'10px'}>
          원
        </Text>
      </Flex>
    </Flex>
  );
}

export default CouponMinPriceComponent;
