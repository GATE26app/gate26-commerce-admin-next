import React, { useEffect, useState } from 'react';

import { Flex, Text, useToast, Box } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import CustomButton from '@/components/common/CustomButton';
import { useRouter } from 'next/navigation';
import InputBox from '@/components/common/Input';
import { intComma } from '@/utils/format';
import { PartnersParamsType } from '@/app/apis/goods/GoodsApi.type';
import { useProfileShippingMutation } from '@/app/apis/partners/PartnersApi.mutation';

function PartnerShippingInfo({ info }: { info: PartnersParamsType }) {
  const toast = useToast();
  const router = useRouter();
  const [shipping, setShipping] = useState({
    shippingType: 0,
    shippingFee: 0,
    shippingMinAmount: 0,
  });
  console.log('info', info.partnerId);
  useEffect(() => {
    if (info) {
      setShipping({
        shippingType: info.shippingType,
        shippingFee: info.shippingFee,
        shippingMinAmount: info.shippingMinAmount,
      });
    }
  }, [info]);

  const handleSubmitShipping = () => {
    if (shipping.shippingType == 2) {
      // 유료
      if (shipping.shippingFee == 0) {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'배송비를 0원 이상 입력해주세요.'}
            </Box>
          ),
        });
      } else {
        let obj = {
          partnerId: info.partnerId,
          shipping: {
            shippingType: 2,
            shippingFee: shipping.shippingFee,
            shippingMinAmount: 0,
          },
        };
        ShippingChangeMutate(obj);
      }
    } else if (shipping.shippingType == 3) {
      // 부분유료
      if (shipping.shippingFee == 0) {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'배송비를 0원 이상 입력해주세요.'}
            </Box>
          ),
        });
      } else if (shipping.shippingMinAmount == 0) {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'최소주문금액을 0원 이상 입력해주세요.'}
            </Box>
          ),
        });
      } else {
        let obj = {
          partnerId: info.partnerId,
          shipping: {
            shippingType: 3,
            shippingFee: shipping.shippingFee,
            shippingMinAmount: shipping.shippingMinAmount,
          },
        };
        ShippingChangeMutate(obj);
      }
    } else if (shipping.shippingType == 1) {
      let obj = {
        partnerId: info.partnerId,
        shipping: {
          shippingType: 1,
          shippingFee: 0,
          shippingMinAmount: 0,
        },
      };
      ShippingChangeMutate(obj);
    }
  };
  //배송 정책 수정
  const { mutate: ShippingChangeMutate } = useProfileShippingMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'수정되었습니다.'}
              </Box>
            ),
          });
          window.location.reload();
        } else {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
          console.log('error 코드 생성 에러', res.code);
        }
      },
      onError: (req) => {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'에러가 발생했습니다.'}
            </Box>
          ),
        });
      },
    },
  });
  return (
    <Flex mt={'30px'} flexDirection={'column'}>
      <Text fontWeight={'semibold'} fontSize={'18px'} color={ColorBlack}>
        배송비 정책
      </Text>
      <Flex
        w={'100%'}
        h={'2px'}
        bgColor={ColorDataTableBorderTop}
        mt={'10px'}
        mb={'30px'}
      ></Flex>

      <Flex flexDirection={'row'} pb={'20px'}>
        <Text
          w={'165px'}
          flexShrink={0}
          color={ColorBlack}
          fontWeight={600}
          fontSize={'15px'}
        >
          회원상태
        </Text>
        <Flex flexDirection={'row'} gap={'10px'}>
          <CustomButton
            bgColor={shipping.shippingType == 1 ? ColorGray900 : ColorWhite}
            color={shipping.shippingType == 1 ? ColorWhite : ColorGray700}
            text="무료"
            fontSize="15px"
            borderColor={
              shipping.shippingType == 1 ? ColorGray900 : ColorGray400
            }
            px="38px"
            py="13px"
            onClick={() => setShipping({ ...shipping, shippingType: 1 })}
          />
          <CustomButton
            bgColor={shipping.shippingType == 3 ? ColorGray900 : ColorWhite}
            color={shipping.shippingType == 3 ? ColorWhite : ColorGray700}
            text="부분무료"
            fontSize="15px"
            borderColor={
              shipping.shippingType == 3 ? ColorGray900 : ColorGray400
            }
            px="38px"
            py="13px"
            onClick={() => setShipping({ ...shipping, shippingType: 3 })}
          />
          <CustomButton
            bgColor={shipping.shippingType == 2 ? ColorGray900 : ColorWhite}
            color={shipping.shippingType == 2 ? ColorWhite : ColorGray700}
            text="유료"
            fontSize="15px"
            borderColor={
              shipping.shippingType == 2 ? ColorGray900 : ColorGray400
            }
            px="38px"
            py="13px"
            onClick={() => setShipping({ ...shipping, shippingType: 2 })}
          />
        </Flex>
      </Flex>
      {shipping.shippingType == 2 && (
        <Flex>
          <Flex alignItems={'center'}>
            <Text
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              w={'165px'}
            >
              배송비
            </Text>
            <Box w={'288px'}>
              <InputBox
                placeholder="배송비"
                type="text"
                maxLength={8}
                value={
                  shipping.shippingFee == 0
                    ? ''
                    : intComma(shipping.shippingFee)
                }
                onChange={(e: any) =>
                  setShipping({
                    ...shipping,
                    shippingFee: Number(e.target.value.replace(/[^0-9]/g, '')),
                  })
                }
              />
            </Box>
          </Flex>
        </Flex>
      )}
      {shipping.shippingType == 3 && (
        <Flex flexDirection={'column'}>
          <Flex alignItems={'center'}>
            <Text
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              w={'165px'}
            >
              배송비
            </Text>
            <Box w={'288px'}>
              <InputBox
                placeholder="배송비"
                type="text"
                maxLength={8}
                value={
                  shipping.shippingFee == 0
                    ? ''
                    : intComma(shipping.shippingFee)
                }
                onChange={(e: any) =>
                  setShipping({
                    ...shipping,
                    shippingFee: Number(e.target.value.replace(/[^0-9]/g, '')),
                  })
                }
              />
            </Box>
          </Flex>
          <Flex flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'}>
            <Text
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              w={'165px'}
            >
              최소주문금액
            </Text>
            <Box w={'288px'}>
              <InputBox
                placeholder="최소주문금액"
                type="text"
                maxLength={15}
                value={
                  shipping.shippingMinAmount == 0
                    ? ''
                    : intComma(shipping.shippingMinAmount)
                }
                onChange={(e: any) =>
                  setShipping({
                    ...shipping,
                    shippingMinAmount: Number(
                      e.target.value.replace(/[^0-9]/g, ''),
                    ),
                  })
                }
              />
            </Box>
          </Flex>
        </Flex>
      )}
      <Flex
        flexDirection={'row'}
        alignItems={'center'}
        gap={'10px'}
        justifyContent={'center'}
        mt={'40px'}
      >
        <CustomButton
          text="목록"
          borderColor={ColorGray400}
          color={ColorGray700}
          px="67px"
          py="14px"
          bgColor={ColorWhite}
          fontSize="15px"
          onClick={() => router.back()}
        />

        <CustomButton
          text="확인"
          borderColor={ColorRed}
          color={ColorWhite}
          px="67px"
          py="14px"
          bgColor={ColorRed}
          fontSize="15px"
          onClick={() => {
            handleSubmitShipping();
          }}
        />
      </Flex>
    </Flex>
  );
}

export default PartnerShippingInfo;
