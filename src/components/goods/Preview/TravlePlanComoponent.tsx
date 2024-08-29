import React, { useState } from 'react';

import { Box, Flex, Image, Skeleton, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorLineGray,
} from '@/utils/_Palette';
import { getImagePath } from '@/utils/format';
import { scheduleDTO } from '@/app/apis/goods/GoodsApi.type';

export interface detailType {
  info: Array<scheduleDTO>;
}

function TravlePlanComoponent({ info }: detailType) {
  const [onImage, setOnImage] = useState(true); // 이미지 로드

  return (
    <>
      {info[0]?.startDay != '' && info[0]?.startTime != '' && (
        <>
          <Box h={'10px'} w={'100%'} bgColor={ColorLineGray}></Box>
          <Box mx={'16px'} my={'20px'}>
            <Text color={ColorBlack} fontSize={'18px'} fontWeight={700}>
              여행일정
            </Text>
            {info &&
              info?.length > 0 &&
              info.map((item, index) => {
                return (
                  <Box
                    pb={'20px'}
                    borderBottomColor={ColorGrayBorder}
                    borderBottomWidth={info?.length - 1 == index ? 0 : 1}
                  >
                    <Text
                      color={ColorBlack}
                      fontSize={'15px'}
                      fontWeight={700}
                      mb={'10px'}
                      mt={'18px'}
                      cursor={'pointer'}
                    >
                      {item.location}
                    </Text>
                    <Flex justifyContent={'space-between'} mb={'10px'}>
                      <Text
                        color={ColorGray700}
                        fontSize={'15px'}
                        fontWeight={400}
                      >
                        진행일자
                      </Text>
                      <Text
                        color={ColorGray700}
                        fontSize={'15px'}
                        fontWeight={400}
                        width={'80%'}
                        textAlign={'right'}
                      >
                        {item.startDay}
                      </Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} mb={'10px'}>
                      <Text
                        color={ColorGray700}
                        fontSize={'15px'}
                        fontWeight={400}
                      >
                        시간대
                      </Text>
                      <Text
                        color={ColorGray700}
                        fontSize={'15px'}
                        fontWeight={400}
                        width={'80%'}
                        textAlign={'right'}
                      >
                        {item.startTime}
                      </Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} mb={'10px'}>
                      <Text
                        color={ColorGray700}
                        fontSize={'15px'}
                        fontWeight={400}
                      >
                        소요시간
                      </Text>
                      <Text
                        color={ColorGray700}
                        fontSize={'15px'}
                        fontWeight={400}
                        width={'80%'}
                        textAlign={'right'}
                      >
                        {item.durationTime}
                      </Text>
                    </Flex>
                    <Flex mb={'10px'} flexDirection={'column'}>
                      <Text
                        color={ColorGray700}
                        fontSize={'15px'}
                        fontWeight={400}
                        mb={'10px'}
                      >
                        여행설명
                      </Text>
                      <Text
                        color={ColorGray700}
                        fontSize={'15px'}
                        fontWeight={400}
                        width={'100%'}
                      >
                        {item.info}
                      </Text>
                    </Flex>
                    {item.images.length > 0 &&
                      item.images[0].imagePath != '' && (
                        <Box
                          w={'100%'}
                          height={'185px'}
                          borderRadius={'10px'}
                          overflow={'hidden'}
                        >
                          <Skeleton
                            w={'100%'}
                            height={'185px'}
                            isLoaded={!onImage}
                          >
                            <Image
                              src={`${getImagePath(item.images[0].imagePath)}`}
                              objectFit={'contain'}
                              w={'100%'}
                              height={'185px'}
                              onLoad={() => setOnImage(false)}
                              onError={() => {}}
                            />
                          </Skeleton>
                        </Box>
                      )}
                  </Box>
                );
              })}
          </Box>
        </>
      )}
    </>
  );
}

export default TravlePlanComoponent;
