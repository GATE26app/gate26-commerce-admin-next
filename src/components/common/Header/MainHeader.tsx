'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import {
  ColorBlack,
  ColorGray400,
  ColorMainBackBule,
  ColorWhite,
} from '@/utils/_Palette';
import { useRouter } from 'next/navigation';
import { useUserZuInfo } from '@/_store/UserZuInfo';
import { deleteToken } from '@/utils/localStorage/token';

function MainHeader() {
  const router = useRouter();
  const [alram, setAlram] = useState(false);
  const [chat, setChat] = useState(false);
  const [logout, setLogout] = useState(false);
  const { deleteUserZuInfo } = useUserZuInfo((state) => state);
  const onLogout = () => {
    deleteUserZuInfo();
    deleteToken();
    document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    router.push('/login');
  };
  return (
    <Flex
      justifyContent={'flex-end'}
      py={'20px'}
      pr={'60px'}
      alignItems={'center'}
      cursor={'pointer'}
      position={'sticky'}
      bgColor={ColorMainBackBule}
      top={'0px'}
      zIndex={999}
    >
      <Flex
        alignItems={'center'}
        onClick={() => setLogout(!logout)}
        position={'relative'}
      >
        <Image
          src={'/images/header/icon_header_user.png'}
          width={32}
          height={32}
          alt="로고"
        />
        <Text
          fontWeight={700}
          fontSize={'16px'}
          color={ColorBlack}
          pl={'10px'}
          pr={'5px'}
        >
          관리자님 반갑습니다.
        </Text>
        <Image
          src={'/images/header/icon_arrow_down.png'}
          width={10}
          height={10}
          alt="로고"
          priority={true}
        />
        {logout && (
          <Flex
            position={'absolute'}
            bgColor={ColorWhite}
            top={8}
            right={0}
            borderWidth={1}
            borderColor={ColorGray400}
            px={'20px'}
            py={'10px'}
            borderRadius={'8px'}
            onClick={() => onLogout()}
          >
            <Text>로그아웃</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default MainHeader;
