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
function CouponPartnerPrice({ CouponData, setCouponData }: Props) {
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
          파트너사쿠폰 부담비
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
        alignItems={'center'}
      >
        <Box w={'288px'}>
          <InputBox
            placeholder="숫자로만 입력"
            type="text"
            maxLength={15}
            value={
              CouponData.dcType == 1
                ? CouponData.partnerChargeAmount == 0
                  ? ''
                  : intComma(CouponData.partnerChargeAmount)
                : CouponData.partnerChargePercent == 0
                ? ''
                : CouponData.partnerChargePercent
            }
            onChange={(e: any) => {
              if (CouponData?.dcType == 1) {
                setCouponData({
                  ...CouponData,
                  partnerChargePercent: 0,
                  partnerChargeAmount: Number(
                    e.target.value.replace(/[^0-9]/g, ''),
                  ),
                });
              } else {
                setCouponData({
                  ...CouponData,
                  partnerChargePercent: Number(
                    e.target.value.replace(/[^0-9]/g, ''),
                  ),
                  partnerChargeAmount: 0,
                });
              }
            }}
          />
        </Box>
        <Text color={ColorBlack} fontWeight={400} fontSize={'14px'} ml={'10px'}>
          {CouponData?.dcType == 1 ? '원' : '%'}
        </Text>
      </Flex>
    </Flex>
  );
}

export default CouponPartnerPrice;
