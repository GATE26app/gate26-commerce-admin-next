'use client';
import React, { ReactElement, useEffect, useState } from 'react';

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
import {
  getSendBirdToken,
  getToken,
  setSendBirdToken,
  setToken,
  setUserInfo,
} from '@/utils/localStorage/token';
import { usePostLoginMutation } from '../apis/auth/AuthApi.mutation';

import { useUserZuInfo } from '@/_store/UserZuInfo';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import sendBirdApi from '../apis/sendbird/SendBirdApi';
import moment from 'moment';
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
  const { setUserZuInfo, userZuInfo } = useUserZuInfo((state) => state);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [sendBirdTokenState, setSendBirdTokenState] = useState(false);

  //샌드버드 토큰 발급
  const { data: SendBirdTokenData, error } = useQuery(
    ['GET_GOODSDETAIL'],
    () => sendBirdApi.getSendBirdToken(),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!sendBirdTokenState,
    },
  );
  console.log('sendBirdTokenState', sendBirdTokenState);
  useEffect(() => {
    if (SendBirdTokenData !== undefined) {
      console.log('SendBirdTokenData', SendBirdTokenData);
      setSendBirdToken({
        sendBird: SendBirdTokenData.data?.token,
        expiresAt: SendBirdTokenData.data?.expires_at,
        user_id: SendBirdTokenData.data?.user_id,
      });
      router.push('/');
    }
  }, [SendBirdTokenData]);

  const { mutate: loginMutate, isLoading } = usePostLoginMutation({
    options: {
      onSuccess: (res: any) => {
        if (res.success == true) {
          const data = res.data;
          document.cookie = `auth=${data?.accessToken}`;
          const param = {
            access: data?.accessToken ? data?.accessToken : '',
            refresh: data?.refreshToken ? data?.refreshToken : '',
          };
          setToken(param);
          setUserZuInfo({
            accessToken: data?.accessToken ? data?.accessToken : '',
            refreshToken: data?.refreshToken ? data?.refreshToken : '',
          });
          localStorage.setItem('loginId', request.loginId);
          if (localStorage.getItem('loginId') !== request.loginId) {
            setSendBirdTokenState(true);
          } else {
            if (getSendBirdToken().expiresAt / 1000 < moment().unix()) {
              console.log('샌드버드 토큰 재발급');
              // ReTokenFun();
              setSendBirdTokenState(true);
            } else {
              setSendBirdTokenState(false);
              router.push('/');
            }
          }
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
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      // enter 했을 때의 코드 작성
      // if(e.keyCode === 13) 도 사용가능하다.
      handleClickLogin();
    }
  };
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
              onKeyDown={handleKeyDown}
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
