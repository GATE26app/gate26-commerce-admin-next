import { partnerType } from '@/app/apis/order/OrderApi.type';
import { ColorBlack, ColorGray50 } from '@/utils/_Palette';
import { getImagePath, imgPath } from '@/utils/format';
import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface Props {
  info: partnerType;
}
function PartnerInfo({ info }: Props) {
  return (
    <>
      <Flex
        bgColor={ColorGray50}
        borderRadius={'12px'}
        px={'40px'}
        py={'30px'}
        flexDirection={'column'}
        mb={'20px'}
      >
        <Flex flexDirection={'column'}>
          <Flex flexWrap={'wrap'}>
            <Text
              // textStyle="textSm"
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              // pb={'10px'}
              w={'160px'}
            >
              파트너사
            </Text>
            <Flex mr={'10px'}>
              <Box borderRadius={'50px'} overflow={'hidden'}>
                <Image
                  src={
                    info?.thumbnailImagePath !== null &&
                    info?.thumbnailImagePath !== undefined
                      ? getImagePath(info?.thumbnailImagePath)
                      : '/images/header/icon_header_user.png'
                  }
                  width={24}
                  height={24}
                  alt="파트너사 이미지"
                />
              </Box>
            </Flex>
            <Text fontWeight={600} fontSize={'15px'} color={ColorBlack}>
              {info?.title}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default PartnerInfo;
