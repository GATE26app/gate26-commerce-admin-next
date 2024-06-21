'use client';
import React, { ReactElement, useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import CheckBox from '@/components/common/CheckBox';
import FormHelper from '@/components/common/FormHelper';
import InputBox from '@/components/common/Input';

import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorGray800,
  ColorGray900,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { setToken, setUserInfo } from '@/utils/localStorage/token';
import { usePostLoginMutation } from '../apis/auth/AuthApi.mutation';

import { useUserZuInfo } from '@/_store/UserZuInfo';
import { useRouter } from 'next/navigation';
// import BottomLayout from 'layout/BottomLayout';

interface LoginModel {
  loginId: string;
  password: string;
}

function page() {
  const toast = useToast();
  const router = useRouter();
  const [request, setRequest] = useState<LoginModel>({
    loginId: '',
    password: '',
  });
  const [checkbox, setCheckbox] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const toggleCheckbox = () => setCheckbox(!checkbox);
  const { setUserZuInfo } = useUserZuInfo((state) => state);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { mutate: loginMutate, isLoading } = usePostLoginMutation({
    options: {
      onSuccess: (res: any) => {
        if (res.success == true) {
          const data = res.data;
          const param = {
            access: data?.accessToken ? data?.accessToken : '',
            refresh: data?.refreshToken ? data?.refreshToken : '',
          };
          console.log('data', data.accessToken);
          setToken(param);
          setUserZuInfo({
            accessToken: data?.accessToken ? data?.accessToken : '',
            refreshToken: data?.refreshToken ? data?.refreshToken : '',
          });

          console.log('로그인');
          router.push('/');
          setErrorMsg('');
        } else {
          setErrorMsg(String(res.message));
        }
      },
      onError: (e: any) => {
        toast({
          position: 'top',
          duration: 1000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              서버 오류! 잠시 후 다시시도해주세요.
            </Box>
          ),
        });
      },
    },
  });
  const handleClickLogin = () => {
    const body = {
      adminId: request.loginId,
      adminPwd: request.password,
    };

    loginMutate(body);
  };
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };

    setRequest(newRequest);
  }
  return (
    <Box width="100vw" backgroundColor={ColorGray50}>
      <Flex
        pt={'150px'}
        pb={'170px'}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w={'568px'}
          bgColor={ColorWhite}
          borderRadius={'16px'}
          px={'74px'}
          py={'70px'}
        >
          <Flex
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Image
              src={'/images/header/icon_logo_big.png'}
              width={300}
              height={66}
              alt="로고"
            />
            <Box
              bgColor={'rgba(255,223,219,0.38)'}
              borderRadius={'11px'}
              px={'6px'}
              py={'2px'}
              mt={'24px'}
              mb={'37px'}
            >
              <Text fontSize={'18px'} fontWeight={600} color={ColorRed}>
                관리자
              </Text>
            </Box>
          </Flex>
          <FormHelper errorText="아이디를 입력해주세요." isInvalid={false}>
            <InputBox
              placeholder="아이디"
              value={request.loginId}
              onChange={(e) => handleChangeInput('loginId', e.target.value)}
              mb={'10px'}
            />
          </FormHelper>
          <FormHelper
            errorText="비밀번호를 입력해주세요."
            isInvalid={false}
            mb={'10px'}
          >
            <InputBox
              type="password"
              placeholder="비밀번호"
              value={request.password}
              onChange={(e) => handleChangeInput('password', e.target.value)}
              error={errorMsg}
            />
          </FormHelper>
          <CheckBox
            children={'자동로그인'}
            onClick={() => toggleCheckbox()}
            checked={checkbox}
          />
          <Flex
            w={'100%'}
            bgColor={ColorRed}
            borderRadius={'10px'}
            h={'50px'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={'30px'}
            mb={'15px'}
            cursor={'pointer'}
            onClick={handleClickLogin}
          >
            <Text color={ColorWhite} fontWeight={800} fontSize={'16px'}>
              로그인
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default page;
