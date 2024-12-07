import {
  CouponDataResType,
  CouponDataType,
} from '@/app/apis/coupon/CouponApi.type';
import RadioComponent from '@/components/common/CustomRadioButton/RadioComponent';
import InputBox from '@/components/common/Input';
import { ColorBlack, ColorGray400, ColorGray50 } from '@/utils/_Palette';
import { intComma } from '@/utils/format';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  CouponData: CouponDataType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataType>>;
}

function CouponCntComponent({
  state,
  setState,
  CouponData,
  setCouponData,
}: Props) {
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
          쿠폰수량(재고)
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
        <Flex gap={'30px'}>
          <RadioComponent
            text="유한"
            checked={state}
            onClick={() => {
              setState(true);
            }}
          />
          <RadioComponent
            text="무제한"
            checked={!state}
            onClick={() => {
              setState(false);
            }}
          />
        </Flex>
        {state && (
          <Box w={'288px'} mt={'20px'}>
            <InputBox
              placeholder="숫자로만 입력"
              type="text"
              maxLength={15}
              value={
                CouponData.stockCnt == 0 && CouponData.stockCnt == undefined
                  ? ''
                  : intComma(CouponData.stockCnt)
              }
              onChange={(e: any) =>
                setCouponData({
                  ...CouponData,
                  stockCnt: Number(e.target.value.replace(/[^0-9]/g, '')),
                })
              }
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default CouponCntComponent;
