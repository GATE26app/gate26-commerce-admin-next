import React, { useEffect, useRef, useState } from 'react';

import { Box, Flex, Image, Skeleton, Text, useToast } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray700,
  ColorInputBack,
  ColorRed,
  ColorSippingBackGray,
  ColorTextBlack,
  ColorTextGray,
  ColorYellow,
} from '@/utils/_Palette';
import { getImagePath, intComma } from '@/utils/format';

import CategoryModal from './Modal/CategoryModal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { commercePreviewProductDataType } from '@/app/apis/goods/GoodsApi.type';
import { usePartnerZuInfo } from '@/_store/PatnerInfo';

export interface detailType {
  info: commercePreviewProductDataType;
  loading?: boolean;
}
function BasicInfo({ info, loading }: detailType) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const { partnerZuInfo } = usePartnerZuInfo((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [onImage, setOnImage] = useState(false);
  const [slide, setSlide] = useState(1);
  const [clickImage, setClickImage] = useState<string>('');

  return (
    <>
      {info ? (
        <Flex ref={anchorRef} flexDirection={'column'}>
          <Flex style={{ width: '445px' }} position={'relative'}>
            {info.images.length > 0 ? (
              <Swiper
                // loop={true} // 슬라이드 루프
                spaceBetween={50} // 슬라이스 사이 간격
                slidesPerView={1} // 보여질 슬라이스 수
                height={445}
                // navigation={true} // prev, next button
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
                }}
                onSlideChange={(e) => setSlide(e.activeIndex + 1)}
              >
                {info.images.map((item, index) => {
                  return (
                    <SwiperSlide
                      onClick={() =>
                        item.imagePath
                          ? setClickImage(item.imagePath)
                          : setClickImage(item.thumbnailImagePath)
                      }
                      key={index}
                    >
                      <Image
                        src={
                          onImage
                            ? '/images/no_img.png'
                            : item.imagePath
                            ? `${getImagePath(item?.imagePath)}`
                            : `${getImagePath(item?.thumbnailImagePath)}`
                        }
                        width={'445px'}
                        h={'445px'}
                        objectFit={'cover'}
                        onError={() => setOnImage(true)}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <Image
                src={'/images/no_img.png'}
                width={'100%'}
                h={'500px'}
                objectFit={'cover'}
              />
            )}

            <Flex
              width={'40px'}
              height={'20px'}
              borderRadius={'10px'}
              bgColor={'#1A1A1A80'}
              position={'absolute'}
              top={'16px'}
              right={'16px'}
              zIndex={9}
            >
              <Flex
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Text color={'white'} fontSize={'13px'}>
                  <span>{slide}</span>
                  <span>{` / ${info?.images?.length}`}</span>
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <CategoryModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            category={info.categories}
            location={info.locations}
          />
          <Flex px={'16px'} py={'17px'} flexDirection={'column'}>
            <Flex alignItems={'flex-start'} justifyContent={'space-between'}>
              <Flex flexDirection={'column'}>
                <Flex flexDirection={'row'} flexWrap={'wrap'}>
                  {info.categories.length > 0 && (
                    <Flex
                      flexDirection={'row'}
                      mb={'5px'}
                      alignItems={'center'}
                      cursor={'pointer'}
                      mr={3}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <Text
                        fontWeight={400}
                        fontSize={'13px'}
                        color={ColorGray700}
                        mr="5px"
                      >
                        {info?.categories[0].title}
                      </Text>
                      <Image
                        src="/images/commerce/icon_more_category.png"
                        w={'10px'}
                        h={'10px'}
                      />
                    </Flex>
                  )}
                </Flex>
                <Flex flexDirection={'row'} flexWrap={'wrap'}>
                  {info.locations.length > 0 && (
                    <Flex
                      alignItems={'center'}
                      mr={3}
                      cursor={'pointer'}
                      onClick={() => setIsOpen(!isOpen)}
                      mb={'15px'}
                    >
                      <Text
                        fontWeight={400}
                        fontSize={'13px'}
                        color={ColorGray700}
                        mr="5px"
                      >
                        {info.locations[0].title}
                      </Text>
                      <Image
                        src="/images/commerce/icon_more_category.png"
                        w={'10px'}
                        h={'10px'}
                        onClick={() => setIsOpen(!isOpen)}
                      />
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Flex>
            <Text fontWeight={700} fontSize={'20px'} color={ColorBlack}>
              {info.title}
            </Text>
            <Flex alignItems={'center'} gap={'5px'} mb={'6px'}>
              <Image
                src={'/images/commerce/ico_star_on.png'}
                width={'18px'}
                height={'18px'}
              />
              <Text
                color={ColorYellow}
                fontSize={'16px'}
                fontWeight={700}
                mt={'5px'}
              >
                5
              </Text>
              <Text
                color={ColorGray700}
                fontSize={'12px'}
                fontWeight={400}
                mt={'3px'}
              >
                5
              </Text>
            </Flex>
            {info.priceDcPer > 0 && (
              <Text
                color={ColorGray700}
                fontSize={'14px'}
                fontWeight={500}
                textDecoration={'line-through'}
              >
                {intComma(info.priceNet.toFixed(0))}원
              </Text>
            )}

            <Flex gap={'5px'}>
              {info.priceDcPer > 0 && (
                <Text fontSize={'20px'} fontWeight={700} color={ColorRed}>
                  {`${info.priceDcPer}%`}
                </Text>
              )}
              <Text color={ColorTextBlack} fontSize={'20px'} fontWeight={700}>
                {intComma(info.price)}원
              </Text>
            </Flex>
            {info?.type == 1 && (
              <Flex
                justifyContent={'space-between'}
                mt={'10px'}
                bgColor={ColorSippingBackGray}
                px={'10px'}
                py={'8px'}
                borderRadius={'10px'}
              >
                <Text fontSize={'15px'} color={ColorTextGray}>
                  배송비
                </Text>
                {partnerZuInfo.shippingType == 1 ? (
                  <Text fontSize={'15px'} color={ColorTextGray}>
                    무료배송
                  </Text>
                ) : partnerZuInfo.shippingType == 2 ? (
                  <Text fontSize={'15px'} color={ColorTextGray}>
                    {intComma(partnerZuInfo.shippingFee)}원
                  </Text>
                ) : partnerZuInfo.shippingType == 3 ? (
                  <Text fontSize={'15px'} color={ColorTextGray}>
                    {intComma(partnerZuInfo.shippingFee)}원 (
                    {intComma(partnerZuInfo.shippingMinAmount)}원 이상 구매시
                    무료배송)
                  </Text>
                ) : (
                  <></>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      ) : (
        <Flex ref={anchorRef} flexDirection={'column'}>
          {/* <Skeleton w={'100%'} h={anchorRef.current?.offsetWidth}></Skeleton>
          <Flex px={'16px'} py={'17px'} flexDirection={'column'}>
            <Skeleton h={'18px'} w={'20%'} borderRadius={4}></Skeleton>
            <Skeleton h={'18px'} w={'25%'} borderRadius={4} mt={1}></Skeleton>
            <Skeleton h={'22px'} w={'100%'} borderRadius={4} mt={1}></Skeleton>
            <Skeleton
              h={'20px'}
              w={'30%'}
              isLoaded={loading}
              borderRadius={4}
              mt={1}
            ></Skeleton>
            <Skeleton h={'22px'} w={'50%'} borderRadius={4} mt={1}></Skeleton>
          </Flex> */}
        </Flex>
      )}
    </>
  );
}

export default BasicInfo;
