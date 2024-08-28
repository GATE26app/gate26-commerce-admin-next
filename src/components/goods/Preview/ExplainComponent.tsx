import Image from 'next/image';
import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray400,
  ColorGrayBgBOx,
  ColorGrayBorder,
  ColorLineGray,
  ColorWhite,
} from '@/utils/_Palette';
import { commercePreviewProductDataType } from '@/app/apis/goods/GoodsApi.type';

interface detailType {
  info: commercePreviewProductDataType;
}

function ExplainComponent({ info }: detailType) {
  const [more, setMore] = useState(false);

  return (
    <>
      <>
        <Flex
          px={'22px'}
          py={'15px'}
          flexDirection={'column'}
          maxHeight={
            more || info?.content == '' || info?.content == null ? '' : '590px'
          }
          pb={more ? '90px' : '20px'}
          position={'relative'}
          overflow={'hidden'}
        >
          {info && info?.attributes.length > 0 && (
            <>
              {info?.attributes.map((item, idx) => {
                return (
                  <Flex alignItems={'center'} mb={'15px'} key="idx">
                    <Image
                      src={
                        item.code === 1
                          ? '/images/commerce/ico_ex_move.png'
                          : item.code === 2
                          ? '/images/commerce/ico_airplane.png'
                          : item.code === 3
                          ? '/images/commerce/ico_time.png'
                          : '/images/commerce/ico_launage.png'
                      }
                      width={24}
                      height={24}
                      alt="이미지"
                    />
                    <Text
                      color={ColorBlack}
                      fontSize={'16px'}
                      fontWeight={600}
                      w={'85px'}
                      ml={'10px'}
                    >
                      {item.codeName}
                    </Text>
                    <Text color={ColorBlack} fontWeight={400} fontSize={'16px'}>
                      {item.title}
                    </Text>
                  </Flex>
                );
              })}
            </>
          )}
          <Flex
            borderTopColor={ColorGrayBorder}
            borderTopWidth={info?.attributes.length > 0 ? 1 : 0}
            pt={'15px'}
            flexDirection={'column'}
          ></Flex>
          {info?.basicInfo != '' && info?.basicInfo !== null && (
            <Box
              bgColor={ColorGrayBgBOx}
              borderRadius={'10px'}
              p={'10px'}
              mb={'10px'}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={ColorBlack}
                whiteSpace={'pre-wrap'}
              >
                {info?.basicInfo}
              </Text>
            </Box>
          )}
          {info?.detailInfo != '' && info?.detailInfo !== null && (
            <Box
              bgColor={ColorGrayBgBOx}
              borderRadius={'10px'}
              p={'10px'}
              mt={'15px'}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={ColorBlack}
                whiteSpace={'pre-wrap'}
              >
                {info?.detailInfo}
              </Text>
            </Box>
          )}
          {info?.content != '' && info?.content !== null && (
            <>
              <Flex
                mt={'15px'}
                flexDirection={'column'}
                dangerouslySetInnerHTML={{ __html: info?.content }}
              ></Flex>
              <Flex
                flexDirection={'row'}
                alignItems={'center'}
                gap={'10px'}
                justifyContent={'center'}
                py={'18.5px'}
                // pt={'20px'}
                borderRadius={'10px'}
                borderWidth={1}
                borderColor={ColorGray400}
                bgColor={ColorWhite}
                position={'absolute'}
                bottom={'18px'}
                w={'90%'}
                onClick={() => setMore(!more)}
                // mb={more ? '100px' : '20px'}
                boxShadow={!more ? '0px 10px 20px 30px white' : ''}
              >
                <Text color={ColorBlack} fontSize={'15px'} fontWeight={500}>
                  상품 설명 {more ? '접기' : '더보기'}
                </Text>
                {more ? (
                  <Image
                    src={'/images/commerce/ico_accordian_up.png'}
                    width={18}
                    height={18}
                    alt="아코디언 업"
                  />
                ) : (
                  <Image
                    src={'/images/commerce/ico_accordian_down.png'}
                    width={18}
                    height={18}
                    alt="아코디언 다운"
                  />
                )}
              </Flex>
            </>
          )}
        </Flex>
      </>
    </>
  );
}

export default ExplainComponent;
