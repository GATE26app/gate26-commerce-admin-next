'use client';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import Footer from '@/components/common/Footer/Footer';
import MainHeader from '@/components/common/Header/MainHeader';
import MenuBar from '@/components/common/MenuBar/MenuBar';

import { ColorMainBackBule, ColorWhite } from '@/utils/_Palette';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Flex flexDirection={'row'} width={'100vw'} minH={'100vh'}>
      <MenuBar />
      <Flex
        bgColor={ColorMainBackBule}
        flexDirection={'column'}
        width="calc(100% - 340px)"
        justifyContent={'space-between'}
      >
        <Box>
          <MainHeader />
          <Box
            backgroundColor={ColorWhite}
            mx={'60px'}
            mb={'60px'}
            px={'60px'}
            pb={'60px'}
            borderRadius={'16px'}
          >
            {children}
          </Box>
        </Box>

        <Footer />
      </Flex>
    </Flex>
  );
}
