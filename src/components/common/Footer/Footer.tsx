import Image from 'next/image';
import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { ColorFooterBack, ColorWhite } from '@/utils/_Palette';

const data = {
  compony: 'GATE26',
  componyUser: '홍길동',
  num: '111-22-33',
  num2: '제2019-생태로-0000',
  address: '서울특별시 서울로 209번길 12',
};
function Footer() {
  return (
    <Box
      backgroundColor={ColorFooterBack}
      w={'100%'}
      px={140}
      pt={'40px'}
      pb={'54px'}
      // position={'sticky'}
      // bottom={0}
    >
      <Flex justifyContent={'space-between'}>
        <Flex flexDirection={'row'} alignItems={'flex-start'}>
          <Image
            src={'/images/Footer/icon_footer_logo.png'}
            width={140}
            height={29}
            alt="로고"
          />
          <Flex ml={'48px'} flexDirection={'column'}>
            <Flex flexDirection={'row'} pb={'5px'}>
              <Text
                color={ColorWhite}
                fontSize={'15px'}
                fontWeight={200}
                pr={'5px'}
              >
                회사명 : {data.compony}
              </Text>
              <Text
                color={ColorWhite}
                fontSize={'15px'}
                fontWeight={200}
                px={'5px'}
              >
                |
              </Text>
              <Text
                color={ColorWhite}
                fontSize={'15px'}
                fontWeight={200}
                pr={'5px'}
              >
                대표 : {data.componyUser}
              </Text>
            </Flex>
            <Flex flexDirection={'row'} pb={'5px'}>
              <Text
                color={ColorWhite}
                fontSize={'15px'}
                fontWeight={200}
                pr={'5px'}
              >
                사업자등록번호 : {data.num}
              </Text>
            </Flex>
            <Flex flexDirection={'row'} pb={'5px'}>
              <Text
                color={ColorWhite}
                fontSize={'15px'}
                fontWeight={200}
                pr={'5px'}
              >
                제 통신판매업신고번호 : {data.num2}
              </Text>
            </Flex>
            <Flex flexDirection={'row'} pb={'10px'}>
              <Text
                color={ColorWhite}
                fontSize={'15px'}
                fontWeight={200}
                pr={'5px'}
              >
                주소 : {data.address}
              </Text>
            </Flex>
            <Flex>
              <Text color={ColorWhite} fontSize={'15px'} fontWeight={200}>
                Copyright ⓒ 2024 GATE26. All rights reserced.
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Text color={ColorWhite} fontSize={'15px'} fontWeight={200}>
            서비스이용약관
          </Text>
          <Text
            color={ColorWhite}
            fontSize={'15px'}
            fontWeight={200}
            px={'5px'}
          >
            |
          </Text>
          <Text color={ColorWhite} fontSize={'15px'} fontWeight={200}>
            개인정보처리방침
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;
