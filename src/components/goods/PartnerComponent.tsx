import { useGetGoodsPartnersListMutation } from '@/app/apis/goods/GoodsApi.mutation';
import {
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import SearchInput from '../common/SearchInput';
import {
  GoodsBasicProps,
  PartnerType,
  PartnersParamsType,
} from '@/app/apis/goods/GoodsApi.type';
import Image from 'next/image';
import { getImagePath, imgPath } from '@/utils/format';
import { usePartnerZuInfo } from '@/_store/PatnerInfo';
interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
}
function PartnerComponent({ list, setList }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const { partnerZuInfo, setPartnerZuInfo } = usePartnerZuInfo(
    (state) => state,
  );
  const [searchPartner, setSearchPartner] = useState('');
  // const [partnerList, setPartnerList] = useState<Array<PartnerType>>([]);
  const [partnerList, setPartnerList] = useState<Array<PartnersParamsType>>([]);
  const [clickPartner, setClickPartner] = useState<PartnerType>();
  const { mutate: GoodsPartnersList, isLoading } =
    useGetGoodsPartnersListMutation({
      options: {
        onSuccess: (res) => {
          setPartnerList(res.data.partners);

          setList({
            ...list,
            partnerId: res.data.partners[0].partnerId,
          });
          // setList(res.data);
          // setGoodsInfo({
          //   partnerState: false,
          // });
        },
      },
    });
  useEffect(() => {
    if (searchPartner) {
      let obj = {
        pageNo: 0,
        pageSize: 10,
        searchKeyword: searchPartner,
      };
      GoodsPartnersList(obj);
    }
    if (searchPartner == '') {
      setPartnerList([]);
    }
  }, [searchPartner]);

  const onDeleteClick = () => {
    setClickPartner(undefined);
    setList({
      ...list,
      partnerId: '',
    });
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
          파트너사
        </Text>
        <Text color={ColorRed} fontWeight={800} ml={'3px'} lineHeight={'12px'}>
          *
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
        <Flex mb={'20px'} gap={'10px'} flexWrap={'wrap'}>
          <Flex flexDirection={'column'} gap={'6px'}>
            <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
              파트너사
            </Text>
            <Flex w={'100%'} gap={'10px'}>
              <Box>
                <Flex
                  borderColor={ColorInputBorder}
                  bgColor={ColorWhite}
                  alignItems={'center'}
                  width={'311px'}
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
                      value={searchPartner}
                      onChange={(e: any) => setSearchPartner(e.target.value)}
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
                      borderBottomRadius={
                        partnerList.length > 0 ? '0px' : '10px'
                      }
                      fontSize={'15px'}
                      outline={'none'}
                    />
                  </InputGroup>
                </Flex>

                {partnerList.length > 0 && (
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
                    {partnerList.map((item, index) => {
                      return (
                        <Flex
                          key={index}
                          alignItems={'center'}
                          gap={'10px'}
                          py={'13px'}
                          px={'15px'}
                          borderBottomWidth={
                            partnerList.length - 1 == index ? 0 : 1
                          }
                          borderBottomColor={ColorInputBorder}
                        >
                          <Box borderRadius={'50px'} overflow={'hidden'}>
                            <Image
                              src={
                                item?.images.length > 0
                                  ? getImagePath(
                                      item?.images[0].thumbnailImagePath,
                                    )
                                  : '/images/header/icon_header_user.png'
                              }
                              width={24}
                              height={24}
                              alt="파트너사 이미지"
                            />
                          </Box>
                          <Text
                            fontSize={'15px'}
                            fontWeight={400}
                            color={ColorBlack}
                            onClick={() => {
                              setPartnerList([]);
                              setClickPartner(item);
                              setPartnerZuInfo(item);
                              setSearchPartner('');
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
              {clickPartner && (
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
                        clickPartner?.images.length > 0
                          ? getImagePath(
                              clickPartner?.images[0]?.thumbnailImagePath,
                            )
                          : '/images/header/icon_header_user.png'
                      }
                      width={24}
                      height={24}
                      alt="파트너사 이미지"
                    />
                  </Box>
                  <Text fontSize={'15px'} fontWeight={400} color={ColorBlack}>
                    {clickPartner?.title}
                  </Text>
                  <Image
                    src={'/images/Page/icon_delete_category.png'}
                    width={16}
                    height={16}
                    alt="파트너스 삭제"
                    onClick={() => onDeleteClick()}
                  />
                </Flex>
              )}
            </Flex>
            {/* {
              partnerList
            } */}
            {/* <CategorySelectBox
              placeholder="1차 카테고리 선택"
              width={'311px'}
              list={CategoryList}
              select={selectCate1}
              setSelect={setSelectCate1}
              onClick={onClickFirstCate}
              disable={goodsInfo.LogItemDisable}
            /> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PartnerComponent;
