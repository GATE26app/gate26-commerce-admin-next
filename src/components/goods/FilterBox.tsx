import React, { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { GoodsListParamGetType } from '@/app/apis/goods/GoodsApi.type';

import CustomButton from '@/components/common/CustomButton';
import SearchInput from '@/components/common/SearchInput';
import SelectBox from '@/components/common/SelectBox/SelectBox';

import {
  ColorBlack,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

interface Props {
  request: GoodsListParamGetType;
  setRequest: React.Dispatch<React.SetStateAction<GoodsListParamGetType>>;
}
function FilterBox({ request, setRequest }: Props) {
  const [searchSelect, setSearchSelect] = useState('');
  const searchSelectList = ['상품코드', '상품명', '상품카테고리'];
  useEffect(() => {
    if (request.searchType == '') {
      setSearchSelect('');
    }
  }, [request]);
  return (
    <Flex flexDirection={'column'} w={'100%'}>
      <Flex flexDirection={'row'} flexWrap={'wrap'}>
        <Flex flexDirection={'column'} w={'50%'}>
          <Text
            fontSize={'16px'}
            fontWeight={700}
            color={ColorBlack}
            mb={'10px'}
          >
            상품승인
          </Text>
          <Flex gap={'10px'}>
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.status == null ? ColorRed : ColorInputBorder}
              bgColor={request.status == null ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="전체"
              fontSize={'15px'}
              color={request.status == null ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, status: null })}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.status == 2 ? ColorRed : ColorInputBorder}
              bgColor={request.status == 2 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="대기"
              fontSize={'15px'}
              color={request.status == 2 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, status: 2 })}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.status == 1 ? ColorRed : ColorInputBorder}
              bgColor={request.status == 1 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="승인"
              fontSize={'15px'}
              color={request.status == 1 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, status: 1 })}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.status == 3 ? ColorRed : ColorInputBorder}
              bgColor={request.status == 3 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="반려"
              fontSize={'15px'}
              color={request.status == 3 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, status: 3 })}
            />
          </Flex>
        </Flex>
        <Flex flexDirection={'column'} flexWrap={'wrap'} w={'50%'}>
          <Text
            fontSize={'16px'}
            fontWeight={700}
            color={ColorBlack}
            mb={'10px'}
          >
            판매상태
          </Text>
          <Flex>
            <Box
              bgColor={request.forSale == 0 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.forSale == 0 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, forSale: 0 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.forSale == 0 ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                전체
              </Text>
            </Box>
            <Box
              bgColor={request.forSale == 1 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.forSale == 1 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, forSale: 1 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                lineHeight={'15px'}
                color={request.forSale == 1 ? ColorWhite : ColorGray700}
              >
                판매
              </Text>
            </Box>
            <Box
              bgColor={request.forSale == 2 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.forSale == 2 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, forSale: 2 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.forSale == 2 ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                판매안함
              </Text>
            </Box>
            <Box
              bgColor={request.forSale == 10 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.forSale == 10 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, forSale: 10 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                lineHeight={'15px'}
                color={request.forSale == 10 ? ColorWhite : ColorGray700}
              >
                품절
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Box w={'50%'} mt={'30px'}>
        <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
          상품노출
        </Text>
        <Flex mb={'30px'} gap={'10px'} flexWrap={'wrap'}>
          <Box
            bgColor={request.level == 0 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.level == 0 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, level: 0 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.level == 0 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              전체
            </Text>
          </Box>
          <Box
            bgColor={request.level == 1 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.level == 1 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, level: 1 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.level == 1 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              노출
            </Text>
          </Box>
          <Box
            bgColor={request.level == 2 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.level == 2 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, level: 2 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.level == 2 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              노출안함
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box w={'50%'} mr={'15px'}>
        <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
          통합검색
        </Text>
        <Flex gap={'10px'}>
          <Box width={'190px'}>
            <SelectBox
              placeholder="검색분류선택"
              width={'190px'}
              list={searchSelectList}
              select={searchSelect}
              setSelect={(item) => {
                setSearchSelect(item);
                setRequest({
                  ...request,
                  searchType:
                    item == '상품코드'
                      ? 'itemCode'
                      : '상품명'
                      ? 'title'
                      : '상품카테고리'
                      ? 'category'
                      : '',
                });
              }}
            />
          </Box>
          <SearchInput
            value={request.searchKeyword}
            onChange={(e: any) => {
              setRequest({ ...request, searchKeyword: e.target.value });
            }}
            placeholder="검색어를 입력해주세요."
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default FilterBox;
