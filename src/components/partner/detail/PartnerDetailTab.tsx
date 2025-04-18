import React from 'react';
import { useQuery } from 'react-query';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import {
  ColorGray50,
  ColorGray700,
  ColorRed,
  ColorRed50,
} from '@/utils/_Palette';

export default function PartnerDetailTab({
  setTab,
  onTab,
}: {
  setTab: number;
  onTab: (t: number) => void;
}) {
  const [tab, setTabV] = React.useState(1);

  React.useEffect(() => {
    setTabV(setTab);
  }, [setTab]);

  return (
    <Flex
      bgColor={ColorGray50}
      borderRadius={'12px'}
      width={'500px'}
      flexDirection={'row'}
      alignItems={'center'}
      py={'10px'}
      height={'64px'}
      px={'10px'}
      mt={'60px'}
    >
      <Flex
        width={'33.3%'}
        bgColor={tab == 1 ? ColorRed50 : 'transparent'}
        borderRadius={'12px'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        onClick={() => onTab(1)}
      >
        <Text
          fontSize={'16px'}
          fontWeight={'semibold'}
          color={tab == 1 ? ColorRed : ColorGray700}
        >
          기본정보
        </Text>
      </Flex>
      <Flex
        width={'33.3%'}
        bgColor={tab == 2 ? ColorRed50 : 'transparent'}
        borderRadius={'12px'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        onClick={() => onTab(2)}
      >
        <Text
          fontSize={'16px'}
          fontWeight={'semibold'}
          color={tab == 2 ? ColorRed : ColorGray700}
        >
          접속정보
        </Text>
      </Flex>
      <Flex
        width={'33.3%'}
        bgColor={tab == 3 ? ColorRed50 : 'transparent'}
        borderRadius={'12px'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        onClick={() => onTab(3)}
      >
        <Text
          fontSize={'16px'}
          fontWeight={'semibold'}
          color={tab == 3 ? ColorRed : ColorGray700}
        >
          배송비정책
        </Text>
      </Flex>
      <Flex
        width={'33.3%'}
        bgColor={tab == 4 ? ColorRed50 : 'transparent'}
        borderRadius={'12px'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        onClick={() => onTab(4)}
      >
        <Text
          fontSize={'16px'}
          fontWeight={'semibold'}
          color={tab == 4 ? ColorRed : ColorGray700}
        >
          서비스수수료
        </Text>
      </Flex>
    </Flex>
  );
}
