import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorGray100,
  ColorInputBorder,
  ColorWhite,
} from '@/utils/_Palette';
import {
  CouponDataResType,
  CouponDataType,
  PartnerDetailDTOType,
  PartnerSearchDTOType,
  PartnerType,
  UserSearchDTOType,
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
import RadioComponent from '@/components/common/CustomRadioButton/RadioComponent';
import useIntersectionObserver from '@/app/apis/useIntersectionObserver';
import { useGetPartnerLitQuery } from '@/app/apis/coupon/CouponApi.query';
import { getImagePath, imgPath, imgUserPath } from '@/utils/format';

interface Props {
  CouponData: CouponDataResType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataResType>>;
  ClickPartner: string;
  setClickPartner: React.Dispatch<React.SetStateAction<string>>;
}
function CouponPermissionPartner({
  CouponData,
  setCouponData,
  ClickPartner,
  setClickPartner,
}: Props) {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [list, setList] = useState<Array<PartnerSearchDTOType>>([]);
  const [clickData, setClickData] = useState<PartnerType>();
  const [searchObj, setSearchObj] = useState({
    pageNo: 1,
    pageSize: 10,
    searchKeyword: '',
  });

  const {
    data: userListData,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetPartnerLitQuery(searchObj);

  useEffect(() => {
    if (userListData !== undefined) {
      if (list.length < userListData?.pages[0].data.totalCount) {
        if (list.length == 0) {
          setList(
            userListData?.pages[Number(userListData?.pages.length) - 1].data
              .partners,
          );
        } else if (
          list.length > 0 &&
          userListData?.pages[Number(userListData?.pages.length) - 1].data
            .partners.length > 0 &&
          searchObj.pageNo > 1
        ) {
          setList((list) => [
            ...list,
            ...userListData?.pages[Number(userListData?.pages.length) - 1].data
              .partners,
          ]);
        }
      }
    }
    if (searchObj.searchKeyword == '') {
      setList([]);
    }
  }, [userListData]);

  const isFetchingFirstPage = isFetching && !isFetchingNextPage;
  const fetchNextPageTarget = useIntersectionObserver(() => {
    if (list.length > 0) {
      setSearchObj({
        ...searchObj,
        pageSize: 10,
        pageNo: searchObj.pageNo + 1,
      });
    }
  });

  const onClickData = (id: string, item: PartnerType) => {
    setClickPartner(id);
    setClickData(item);
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
        <Flex flexDirection={'row'} alignItems={'center'}>
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
              zIndex={999}
            >
              {list && list.length > 0 && (
                <Box width={'400px'}>
                  {list.map((item, index) => {
                    return (
                      <Flex
                        key={index}
                        alignItems={'center'}
                        gap={'10px'}
                        py={'13px'}
                        px={'15px'}
                        borderBottomWidth={list.length - 1 == index ? 0 : 1}
                        borderBottomColor={ColorInputBorder}
                      >
                        <Box borderRadius={'50px'} overflow={'hidden'}>
                          <Image
                            src={
                              item?.images.length > 0 &&
                              item?.images[0].thumbnailImagePath
                                ? getImagePath(
                                    item?.images[0].thumbnailImagePath,
                                  )
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
                            onClickData(item.partnerId, item);
                          }}
                        >
                          {item.title}
                        </Text>
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
              alignItems={'center'}
              justifyContent={'center'}
              gap={'10px'}
              ml={'10px'}
            >
              <Box borderRadius={'50px'} overflow={'hidden'}>
                <Image
                  src={
                    clickData?.images.length > 0
                      ? getImagePath(clickData?.images[0]?.thumbnailImagePath)
                      : '/images/header/icon_header_user.png'
                  }
                  width={'24px'}
                  height={'24px'}
                  alt="파트너사 이미지"
                />
              </Box>
              <Text fontSize={'15px'} fontWeight={400} color={ColorBlack}>
                {clickData?.title}
              </Text>
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

export default CouponPermissionPartner;
