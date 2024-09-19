import React, { useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ColorBlack } from '@/utils/_Palette';
import { getImagePath } from '@/utils/format';
import { usePartnerZuInfo } from '@/_store/PatnerInfo';

function SellerInfo() {
  const { partnerZuInfo } = usePartnerZuInfo((state) => state);
  const [onImage, setOnImage] = useState(false);

  return (
    <Box mx={'16px'} my={'20px'}>
      <Text color={ColorBlack} fontSize={'18px'} fontWeight={700}>
        판매자 정보
      </Text>
      <Box pt={'20px'}>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={'15px'}
        >
          <Flex alignItems={'center'} cursor={'pointer'}>
            <Box borderRadius={'50%'} overflow={'hidden'}>
              <Image
                src={
                  partnerZuInfo?.images?.length > 0
                    ? partnerZuInfo?.images[0]?.thumbnailImagePath !== '' &&
                      partnerZuInfo?.images[0]?.thumbnailImagePath !== null
                      ? `${getImagePath(
                          partnerZuInfo?.images[0]?.thumbnailImagePath,
                        )}`
                      : '/images/commerce/no_image.png'
                    : '/images/commerce/no_image.png'
                }
                w={'55px'}
                h={'55px'}
                onError={() => setOnImage(true)}
              />
            </Box>
            <Text
              fontSize={'16px'}
              color={ColorBlack}
              fontWeight={600}
              ml={'12px'}
            >
              {partnerZuInfo?.title}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default SellerInfo;
