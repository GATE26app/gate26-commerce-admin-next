import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorGray100,
  ColorInputBorder,
  ColorWhite,
} from '@/utils/_Palette';
import { CouponDataType } from '@/app/apis/coupon/CouponApi.type';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import RadioComponent from '@/components/common/CustomRadioButton/RadioComponent';
import SearchInput from '@/components/common/SearchInput';
import {
  PartnerType,
  PartnersParamsType,
} from '@/app/apis/goods/GoodsApi.type';
import { imgPath } from '@/utils/format';

interface Props {
  CouponData: CouponDataType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataType>>;
}
function CouponPermission({ CouponData, setCouponData }: Props) {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState<Array<PartnersParamsType>>([]);
  const [clickData, setClickData] = useState<PartnerType>();
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
    }
  };
  const onDeleteClick = () => {
    setClickData(undefined);
  };
  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderBottomWidth={0}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
      >
        <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
          발급대상
        </Text>
      </Flex>
      <Flex
        px={'30px'}
        py={'20px'}
        w={'100%'}
        flexDirection={'column'}
        borderWidth={1}
        borderColor={ColorGray400}
        borderBottomRadius={'12px'}
      >
        <Text color={ColorBlack} fontWeight={600} fontSize={'16px'} mb={'9px'}>
          검색
        </Text>
        <Flex>
          <Box mr={'10px'}>
            <Flex w={'312px'}>
              <SearchInput
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="파트너사명, 사업자번호 검색"
              />
            </Flex>
            {searchList.length > 0 && (
              <Box
                width={'311px'}
                maxHeight={'190px'}
                overflowY={'auto'}
                borderBottomRadius={'10px'}
                borderWidth={1}
                borderTopWidth={0}
                borderColor={ColorInputBorder}
                position={'absolute'}
                bgColor={ColorWhite}
              >
                {searchList.map((item, index) => {
                  return (
                    <Flex
                      key={index}
                      alignItems={'center'}
                      gap={'10px'}
                      py={'13px'}
                      px={'15px'}
                      borderBottomWidth={searchList.length - 1 == index ? 0 : 1}
                      borderBottomColor={ColorInputBorder}
                    >
                      <Box borderRadius={'50px'} overflow={'hidden'}>
                        <Image
                          src={
                            item?.images.length > 0
                              ? imgPath() + item?.images[0].thumbnailImagePath
                              : '/images/header/icon_header_user.png'
                          }
                          width={'24px'}
                          height={'24px'}
                          alt="파트너사 이미지"
                        />
                      </Box>
                      <Text
                        fontSize={'15px'}
                        fontWeight={400}
                        color={ColorBlack}
                        onClick={() => {
                          setSearchList([]);
                          setClickData(item);
                          setSearch('');
                        }}
                      >
                        {item.title}
                      </Text>
                    </Flex>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* {clickData && ( */}
          <Flex
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={ColorInputBorder}
            px={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'10px'}
          >
            <Box borderRadius={'50px'} overflow={'hidden'}>
              <Image
                src={
                  // clickData?.images.length > 0
                  //   ? imgPath() + clickData?.images[0]?.thumbnailImagePath
                  //   :
                  '/images/header/icon_header_user.png'
                }
                width={'24px'}
                height={'24px'}
                alt="파트너사 이미지"
              />
            </Box>
            <Text fontSize={'15px'} fontWeight={400} color={ColorBlack}>
              {/* {clickData?.title} */}
              파트너사명
            </Text>
            <Image
              src={'/images/Page/icon_delete_category.png'}
              width={'16px'}
              height={'16px'}
              alt="파트너스 삭제"
              onClick={() => onDeleteClick()}
            />
          </Flex>
          {/* )} */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CouponPermission;
