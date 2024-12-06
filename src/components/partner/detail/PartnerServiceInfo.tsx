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
import { useProfileServiceMutation } from '@/app/apis/partners/PartnersApi.mutation';

function PartnerServiceInfo({ info, refresh }: { info: PartnersParamsType, refresh:any }) {
  const toast = useToast();
  const router = useRouter();
  const [error, setError] = useState('');
  const [service, setService] = useState<any>({
    partnerId: '',
    serviceChargePercent: null,
  });

  useEffect(() => {
    if (info) {
      setService({
        partnerId: info.partnerId,
        serviceChargePercent: info.serviceChargePercent,
      });
    }
  }, [info]);

  const handleSubmitService = () => {
    if (service.serviceChargePercent == null) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'서비스수수료를 입력해주세요.'}
          </Box>
        ),
      });
    } else {
      ServiceChangeMutate(service);
    }
  };
  //배송 정책 수정
  const { mutate: ServiceChangeMutate } = useProfileServiceMutation({
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
          refresh();
        //   window.location.reload();
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

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    // 입력값이 숫자이고 0에서 100 사이인지 확인
    if (inputValue === '' || /^[0-9]+$/.test(inputValue)) {
      const num = Number(inputValue);
      if (num >= 0 && num <= 100) {
        setService({
          ...service,
          serviceChargePercent: inputValue,
        });
        setError('');
      } else {
        setError('값은 0과 100 사이여야 합니다.');
      }
    } else {
      setError('숫자만 입력할 수 있습니다.');
    }
  };

  return (
    <Flex mt={'30px'} flexDirection={'column'}>
      <Text fontWeight={'semibold'} fontSize={'18px'} color={ColorBlack}>
        서비스수수료
      </Text>
      <Flex
        w={'100%'}
        h={'2px'}
        bgColor={ColorDataTableBorderTop}
        mt={'10px'}
        mb={'30px'}
      ></Flex>
      <Flex>
        <Flex alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'165px'}
          >
            수수료(%)
          </Text>
          <Flex alignItems={'center'} gap={'10px'}>
            <Box w={'288px'}>
              <InputBox
                placeholder="0 ~ 100까지 수수료를 입력해주세요"
                type="string"
                value={service.serviceChargePercent}
                error={error}
                onChange={(e: any) => handleChange(e)}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
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
            handleSubmitService();
          }}
        />
      </Flex>
    </Flex>
  );
}

export default PartnerServiceInfo;
