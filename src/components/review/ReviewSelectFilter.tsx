import React, { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import SearchInput from '@/components/common/SearchInput';
import SelectBox from '../common/SelectBox/SelectBox';

import {
  ColorBlack,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { ReviewListParamsType } from '@/app/apis/review/ReviewApi.type';

interface Props {
  request: ReviewListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<ReviewListParamsType>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
function ReviewFiterSelect({ request, setRequest, search, setSearch }: Props) {
  const [searchSelect, setSearchSelect] = useState('');
  const searchSelectList = ['상품명', '닉네임', '아이디'];

  useEffect(() => {
    if (request.searchType == '') {
      setSearchSelect('');
    }
  }, [request]);
  useEffect(() => {
    if (searchSelect != '') {
      setRequest({
        ...request,
        searchType:
          searchSelect == '상품명'
            ? 'orderTitle'
            : searchSelect == '닉네임'
            ? 'nickName'
            : 'emailAddress',
      });
    }
  }, [searchSelect]);
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
            답변상태값
          </Text>
          <Flex mb={'30px'} flexWrap={'wrap'}>
            <Box
              bgColor={request.reply == '' ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.reply == '' ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, reply: '' })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.reply == '' ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                전체
              </Text>
            </Box>

            <Flex
              bgColor={request.reply == 'false' ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={
                request.reply == 'false' ? ColorRed : ColorInputBorder
              }
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              justifyContent={'center'}
              // w={'115px'}
              onClick={() => setRequest({ ...request, reply: 'false' })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.reply == 'false' ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                미답변
              </Text>
            </Flex>
            <Box
              bgColor={request.reply == 'true' ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={
                request.reply == 'true' ? ColorRed : ColorInputBorder
              }
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, reply: 'true' })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.reply == 'true' ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                답변완료
              </Text>
            </Box>
          </Flex>
          <Text
            fontSize={'16px'}
            fontWeight={700}
            color={ColorBlack}
            mb={'10px'}
          >
            통합검색
          </Text>
          <Flex gap={'10px'}>
            <Box width={'190px'}>
              <SelectBox
                placeholder="검색분류선택"
                width={'190px'}
                list={searchSelectList}
                select={searchSelect}
                setSelect={setSearchSelect}
              />
            </Box>
            <SearchInput
              text={String(request.searchKeyword)}
              onChange={(e: any) =>
                setRequest({ ...request, searchKeyword: e })
              }
              placeholder="검색어를 입력해주세요."
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
            노출상태
          </Text>
          <Flex>
            <Box
              bgColor={request.level == 0 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.level == 0 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
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
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, level: 1 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                lineHeight={'15px'}
                color={request.level == 1 ? ColorWhite : ColorGray700}
              >
                노출함
              </Text>
            </Box>
            <Box
              bgColor={request.level == 2 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.level == 2 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
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
            <Box
              bgColor={request.level == 3 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.level == 3 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, level: 3 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                lineHeight={'15px'}
                color={request.level == 3 ? ColorWhite : ColorGray700}
              >
                블라인드
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ReviewFiterSelect;
