import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorWhite,
  ColorTextGray,
  ColorRed,
} from '@/utils/_Palette';
import {
  CouponDataResType,
  CouponDataType,
  GoodsSearchDTOType,
  ImageRefType,
} from '@/app/apis/coupon/CouponApi.type';
import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '@/app/apis/useIntersectionObserver';
import {
  useGetGoodsLitQuery,
  useGetPartnerLitQuery,
} from '@/app/apis/coupon/CouponApi.query';
import { getImagePath, imgPath, imgUserPath, intComma } from '@/utils/format';
interface Props {
  CouponData: CouponDataResType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataResType>>;
  ClickGood: string;
  setClickGood: React.Dispatch<React.SetStateAction<string>>;
}

function CouponPermissionGoods({
  CouponData,
  setCouponData,
  ClickGood,
  setClickGood,
}: Props) {
  const [list, setList] = useState<Array<GoodsSearchDTOType>>([]);
  const [clickData, setClickData] = useState<ImageRefType>();
  const [searchObj, setSearchObj] = useState({
    pageNo: 1,
    pageSize: 10,
    searchKeyword: '',
  });

  // useEffect(() => {
  //   if (CouponData.partner !== undefined) {
  //     setClickData(CouponData.itemRef);
  //     setClickGood(CouponData.partner?.partnerId);
  //   }
  // }, [CouponData.partner]);

  const {
    data: userListData,
    error,
    hasNextPage,
  } = useGetGoodsLitQuery(searchObj);

  useEffect(() => {
    if (userListData !== undefined) {
      if (list.length < userListData?.pages[0].data.totalCount) {
        if (list.length == 0) {
          setList(
            userListData?.pages[Number(userListData?.pages.length) - 1].data
              .items,
          );
        } else if (
          list.length > 0 &&
          userListData?.pages[Number(userListData?.pages.length) - 1].data.items
            .length > 0 &&
          searchObj.pageNo > 1
        ) {
          setList((list) => [
            ...list,
            ...userListData?.pages[Number(userListData?.pages.length) - 1].data
              .items,
          ]);
        }
      }
    }
    if (searchObj.searchKeyword == '') {
      setList([]);
    }
  }, [userListData]);

  const fetchNextPageTarget = useIntersectionObserver(() => {
    if (list.length > 0) {
      setSearchObj({
        ...searchObj,
        pageSize: 10,
        pageNo: searchObj.pageNo + 1,
      });
    }
  });

  const onClickData = (id: string, item: GoodsSearchDTOType) => {
    setClickGood(id);
    setClickData({
      itemCode: item.itemCode,
      item: {
        itemId: item.itemId,
        title: item.title,
        priceNet: item.priceNet,
        priceDcPer: item.priceDcPer,
        price: item.price,
        images: item.images,
      },
    });
    setSearchObj({
      ...searchObj,
      searchKeyword: '',
    });
    setList([]);
  };

  //사용지 삭제
  const onDeleteClick = () => {
    setClickData();
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
          발급처
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
        <Flex flexDirection={'row'} alignItems={'flex-start'}>
          <Flex position={'relative'}>
            <Flex
              w={'400px'}
              borderColor={ColorInputBorder}
              bgColor={ColorWhite}
              alignItems={'center'}
            >
              <InputGroup alignItems={'center'} h={'45px'}>
                <InputLeftElement
                  pointerEvents="none"
                  alignItems={'center'}
                  h={'45px'}
                >
                  <Image
                    src={'/images/Page/input_search.png'}
                    width={18}
                    height={18}
                    alt="select arrow"
                  />
                </InputLeftElement>
                <Input
                  value={searchObj.searchKeyword}
                  onChange={(e: any) => {
                    setList([]);
                    setSearchObj({
                      ...searchObj,
                      pageNo: 1,
                      searchKeyword: e.target.value,
                    });
                  }}
                  placeholder="검색어를 입력해주세요."
                  h={'45px'}
                  errorBorderColor="warning.500"
                  variant="outline"
                  backgroundColor={ColorWhite}
                  color="black"
                  _disabled={{
                    backgroundColor: 'gray.100',
                    color: ColorGray700,
                  }}
                  _placeholder={{ color: ColorGray700 }}
                  // borderWidth={0}
                  // borderRadius={partnerList.length > 0'10px'}
                  borderTopRadius={'10px'}
                  borderBottomRadius={list.length > 0 ? '0px' : '10px'}
                  fontSize={'15px'}
                  outline={'none'}
                />
              </InputGroup>
            </Flex>
            <Flex
              width={'400px'}
              maxHeight={'200px'}
              overflowY={'auto'}
              borderBottomRadius={'10px'}
              borderWidth={list.length > 0 ? 1 : 0}
              borderTopWidth={0}
              borderColor={ColorInputBorder}
              position={'absolute'}
              bgColor={ColorWhite}
              top={'45px'}
              zIndex={99}
            >
              {list && list.length > 0 && (
                <Box width={'400px'}>
                  {list.map((item, index) => {
                    console.log('item', item);
                    return (
                      <Flex
                        key={index}
                        px={'10px'}
                        py={'9px'}
                        // justifyContent={'center'}
                        gap={'10px'}
                        ml={'10px'}
                        onClick={() => {
                          onClickData(item.itemCode, item);
                        }}
                      >
                        <Box
                          flexShrink={0}
                          borderRadius={'10px'}
                          overflow={'hidden'}
                        >
                          <Image
                            src={
                              item?.images.length > 0
                                ? getImagePath(
                                    item.images[0]?.thumbnailImagePath,
                                  )
                                : '/images/Page/no_data.png'
                            }
                            width={'60px'}
                            height={'60px'}
                            alt="파트너사 이미지"
                          />
                        </Box>
                        <Flex flexDirection={'column'}>
                          <Text
                            fontSize={'14px'}
                            fontWeight={400}
                            color={ColorBlack}
                          >
                            {item.title}
                          </Text>
                          <Text
                            color={ColorTextGray}
                            fontWeight={400}
                            fontSize={'12px'}
                            textDecoration={'line-through'}
                          >
                            {intComma(item.priceNet)}원
                          </Text>
                          <Flex>
                            <Text
                              color={ColorRed}
                              fontWeight={600}
                              fontSize={'14px'}
                            >
                              {item.priceDcPer}%
                            </Text>
                            <Text
                              color={ColorBlack}
                              fontWeight={700}
                              fontSize={'14px'}
                            >
                              {intComma(item.price)}원
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    );
                  })}
                </Box>
              )}
              {hasNextPage && <Box ref={fetchNextPageTarget} bgColor={'red'} />}
            </Flex>
          </Flex>
          {clickData && (
            <Flex
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={ColorInputBorder}
              px={'10px'}
              py={'9px'}
              justifyContent={'space-between'}
              gap={'10px'}
              ml={'10px'}
              width={'260px'}
            >
              <Flex flexDirection={'row'}>
                <Box borderRadius={'10px'} overflow={'hidden'} mr={'10px'}>
                  <Image
                    src={
                      clickData?.item.images.length > 0
                        ? getImagePath(
                            clickData?.item.images[0]?.thumbnailImagePath,
                          )
                        : '/images/header/icon_header_user.png'
                    }
                    width={'60px'}
                    height={'60px'}
                    objectFit={'cover'}
                    alt="파트너사 이미지"
                  />
                </Box>
                <Flex flexDirection={'column'}>
                  <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
                    {clickData?.item.title}
                  </Text>
                  <Text
                    color={ColorTextGray}
                    fontWeight={400}
                    fontSize={'12px'}
                    textDecoration={'line-through'}
                  >
                    {intComma(clickData?.item.priceNet)}원
                  </Text>
                  <Flex>
                    <Text color={ColorRed} fontWeight={600} fontSize={'14px'}>
                      {clickData?.item.priceDcPer}%
                    </Text>
                    <Text color={ColorBlack} fontWeight={700} fontSize={'14px'}>
                      {intComma(clickData?.item.price)}원
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Image
                src={'/images/Page/icon_delete_category.png'}
                width={'16px'}
                height={'16px'}
                alt="파트너스 삭제"
                onClick={() => onDeleteClick()}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CouponPermissionGoods;
