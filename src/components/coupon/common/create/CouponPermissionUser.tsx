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
import { useGetUserLitQuery } from '@/app/apis/coupon/CouponApi.query';
import { imgUserPath } from '@/utils/format';

interface Props {
  CouponData: CouponDataResType;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataResType>>;
  ClickUserList: string[];
  setClickUserList: React.Dispatch<React.SetStateAction<string[]>>;
}

function CouponPermissionUser({
  CouponData,
  setCouponData,
  ClickUserList,
  setClickUserList,
}: Props) {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [list, setList] = useState<Array<UserSearchDTOType>>([]);
  const [clickData, setClickData] = useState<Array<UserSearchDTOType>>([]);
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
  } = useGetUserLitQuery(searchObj);

  useEffect(() => {
    if (userListData !== undefined) {
      if (list.length < userListData?.pages[0].data.totalCount) {
        if (list.length == 0) {
          setList(
            userListData?.pages[Number(userListData?.pages.length) - 1].data
              .users,
          );
        } else if (
          list.length > 0 &&
          userListData?.pages[Number(userListData?.pages.length) - 1].data.users
            .length > 0 &&
          searchObj.pageNo > 1
        ) {
          setList((list) => [
            ...list,
            ...userListData?.pages[Number(userListData?.pages.length) - 1].data
              .users,
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
  // console.log('fetchNextPageTarget', fetchNextPageTarget);

  const onClickData = (id: string, item: UserSearchDTOType) => {
    if (clickData.some((arr) => arr.userId == id) == false) {
      setSearchObj({
        ...searchObj,
        searchKeyword: '',
      });
      setList([]);
      setClickData([...clickData, item]);
      setClickUserList([...ClickUserList, item.userId]);
    } else {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            이미 등록된 나라/도시입니다.
          </Box>
        ),
      });
    }
  };

  //사용지 삭제
  const onDeleteClick = (idx: string) => {
    if (clickData.some((arr) => arr.userId === idx)) {
      setClickData(clickData.filter((item) => idx !== item.userId));
      setList(list.filter((item) => idx !== item.userId));
      setClickUserList(ClickUserList.filter((item) => idx !== item));
    }
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
        <Flex flexDirection={'row'} gap={'120px'}>
          <RadioComponent
            text="전체회원"
            checked={CouponData.access == 0 ? true : false}
            onClick={() => {
              setCouponData({
                ...CouponData,
                access: 0,
              });
            }}
          />
          <RadioComponent
            text="회원선택"
            checked={CouponData.access == 1 ? true : false}
            onClick={() => {
              setCouponData({
                ...CouponData,
                access: 1,
              });
            }}
          />
        </Flex>
        {CouponData.access == 1 && (
          <>
            <Text
              color={ColorBlack}
              fontWeight={600}
              fontSize={'16px'}
              mb={'9px'}
              mt={'30px'}
            >
              검색
            </Text>
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
                                item?.profileImagePath
                                  ? imgUserPath() + item?.profileImagePath
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
                              onClickData(item.userId, item);
                            }}
                          >
                            {item.nickName}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Box>
                )}
                {hasNextPage && (
                  <Box ref={fetchNextPageTarget} bgColor={'red'} />
                )}
              </Flex>
            </Flex>
            <Flex
              backgroundColor={ColorGray100}
              borderRadius={'12px'}
              p={'20px'}
              mt={'20px'}
            >
              <Flex
                flexDirection={'column'}
                alignItems={'flex-end'}
                flexShrink={0}
              >
                <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
                  선택한 회원아이디
                </Text>
                <Flex
                  borderWidth={1}
                  borderColor={ColorGray400}
                  px={'5px'}
                  py={'5px'}
                  mt={'6px'}
                  borderRadius={'6px'}
                  alignItems={'center'}
                  gap={'5px'}
                  onClick={() => {
                    setClickData([]);
                    setClickUserList([]);
                  }}
                >
                  <Image
                    src="/images/Page/icon_reload.png"
                    w={'12px'}
                    h={'12px'}
                  />
                  <Text color={ColorGray700} fontSize={'12px'} fontWeight={400}>
                    초기화
                  </Text>
                </Flex>
              </Flex>
              <Flex alignItems={'flex-start'} pl={'20px'} flexWrap={'wrap'}>
                {clickData.length > 0 &&
                  clickData.map((item, index) => {
                    return (
                      <Flex
                        key={index}
                        alignItems={'center'}
                        gap={'5px'}
                        pr={'20px'}
                      >
                        <Text
                          color={ColorBlack}
                          fontWeight={400}
                          fontSize={'16px'}
                        >
                          {item.nickName}
                        </Text>
                        <Image
                          src={'/images/Page/icon_delete_category.png'}
                          width={'16px'}
                          height={'16px'}
                          alt="카테고리 삭제"
                          onClick={() => onDeleteClick(item.userId)}
                        />
                      </Flex>
                    );
                  })}
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default CouponPermissionUser;
