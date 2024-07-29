import {
  ColorGray400,
  ColorGrayBorder,
  ColorMainBackBule,
} from '@/utils/_Palette';
import { Box, Flex, Skeleton } from '@chakra-ui/react';
import React from 'react';
interface DataTableHeaderProps {
  name: string;
  width: number;
}
interface Props {
  header: Array<DataTableHeaderProps>;
}
function PartnerPaySkeletonCard({ header }: Props) {
  return (
    <Flex
      minW={'900px'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      py={'20px'}
      borderBottomColor={ColorGrayBorder}
      borderBottomWidth={1}
    >
      <Flex
        w={`${header[0]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Skeleton
          height="18px"
          w={'80%'}
          borderRadius={'10px'}
          startColor={ColorGray400}
          endColor={ColorMainBackBule}
        />
      </Flex>
      <Flex
        w={`${header[1]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
      >
        <Skeleton
          height="18px"
          w={'70%'}
          borderRadius={'10px'}
          startColor={ColorGray400}
          endColor={ColorMainBackBule}
        />
      </Flex>
      <Flex
        w={`${header[2]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Skeleton
          height="18px"
          w={'80%'}
          borderRadius={'10px'}
          startColor={ColorGray400}
          endColor={ColorMainBackBule}
        />
      </Flex>
      <Flex
        w={`${header[3]?.width}%`}
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
      <Flex
        w={`${header[4]?.width}%`}
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
      <Flex
        w={`${header[5]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Skeleton
          height="18px"
          width={'70%'}
          borderRadius={'10px'}
          startColor={ColorGray400}
          endColor={ColorMainBackBule}
        />
      </Flex>
      <Flex
        w={`${header[6]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Skeleton
          height="18px"
          width={'70%'}
          borderRadius={'10px'}
          startColor={ColorGray400}
          endColor={ColorMainBackBule}
        />
      </Flex>
    </Flex>
  );
}

export default PartnerPaySkeletonCard;
