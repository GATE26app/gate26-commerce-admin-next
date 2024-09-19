import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';
import {
  ColorGray400,
  ColorGrayBorder,
  ColorMainBackBule,
} from '@/utils/_Palette';

interface headerProps {
  id: string;
  name: string;
  width: string;
}

interface Props {
  header: Array<headerProps>;
}

function CouponPartnerSkeletonCard({ header }: Props) {
  return (
    <>
      <Flex
        minW={'1200px'}
        flexDirection={'row'}
        justifyContent={'center'}
        py={'20px'}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
      >
        <Flex
          w={header[0]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Skeleton
            height="18px"
            w={'50%'}
            borderRadius={'10px'}
            startColor={ColorGray400}
            endColor={ColorMainBackBule}
          />
        </Flex>
        <Flex
          w={header[1]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Skeleton
            height="18px"
            w={'60%'}
            borderRadius={'10px'}
            startColor={ColorGray400}
            endColor={ColorMainBackBule}
          />
        </Flex>
        <Flex
          w={header[2]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Skeleton
            height="18px"
            w={'70%'}
            borderRadius={'10px'}
            startColor={ColorGray400}
            endColor={ColorMainBackBule}
          />
        </Flex>
        {/* 결제정보 */}
        <Flex
          w={header[3]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Skeleton
            height="18px"
            w={'50%'}
            borderRadius={'10px'}
            startColor={ColorGray400}
            endColor={ColorMainBackBule}
          />
        </Flex>
        {/* 예약자정보 */}
        <Flex
          w={header[4]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Skeleton
            height="18px"
            w={'50%'}
            borderRadius={'10px'}
            startColor={ColorGray400}
            endColor={ColorMainBackBule}
          />
        </Flex>
        <Flex
          w={header[5]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'10px'}
        >
          <Skeleton
            height="18px"
            w={'50%'}
            borderRadius={'10px'}
            startColor={ColorGray400}
            endColor={ColorMainBackBule}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default CouponPartnerSkeletonCard;
