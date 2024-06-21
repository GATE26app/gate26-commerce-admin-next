import React, { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

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
import { EntriesListResType } from '@/app/apis/entries/EntriesApi.type';

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  request: EntriesListResType;
  setRequest: React.Dispatch<React.SetStateAction<EntriesListResType>>;
}
function EntriesWinnerFilterBox({
  search,
  setSearch,
  request,
  setRequest,
}: Props) {
  const [searchSelect, setSearchSelect] = useState('');
  const searchSelectList = ['아이디', '응모명'];
  //status 0=>오픈예정, 1=>진행중, 2=>종료 3 => 전체
  //level 1=>노출, 2=>미노출
  //type  0=> 전체 1=>선착순, 2 => 경매

  useEffect(() => {
    if (request.searchType == '') {
      setSearchSelect('');
    }
  }, [request]);
  useEffect(() => {
    if (searchSelect != '') {
      setRequest({
        ...request,
        searchType: searchSelect == '아이디' ? 'emailAddress' : 'title',
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
            구분
          </Text>
          <Flex mb={'30px'} gap={'10px'}>
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.type == 0 ? ColorRed : ColorInputBorder}
              bgColor={request.type == 0 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="전체"
              fontSize={'15px'}
              color={request.type == 0 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, type: 0 })}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.type == 1 ? ColorRed : ColorInputBorder}
              bgColor={request.type == 1 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="선착순"
              fontSize={'15px'}
              color={request.type == 1 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, type: 1 })}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.type == 2 ? ColorRed : ColorInputBorder}
              bgColor={request.type == 2 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="경매"
              fontSize={'15px'}
              color={request.type == 2 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, type: 2 })}
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
            상태값
          </Text>
          <Flex mb={'30px'} gap={'10px'} flexWrap={'wrap'}>
            <Box
              bgColor={request.status == null ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.status == null ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              cursor={'pointer'}
              onClick={() =>
                setRequest({ ...request, pageNo: 0, status: null })
              }
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.status == null ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                전체
              </Text>
            </Box>
            <Box
              bgColor={request.status == 0 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.status == 0 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, pageNo: 0, status: 0 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.status == 0 ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                오픈예정
              </Text>
            </Box>
            <Box
              bgColor={request.status == 1 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.status == 1 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, pageNo: 0, status: 1 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.status == 1 ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                진행중
              </Text>
            </Box>
            <Box
              bgColor={request.status == 2 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.status == 2 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, pageNo: 0, status: 2 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.status == 2 ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                종료
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Box w={'50%'}>
        <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
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
            onClick={() => setRequest({ ...request, pageNo: 0, level: 0 })}
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
            onClick={() => setRequest({ ...request, pageNo: 0, level: 1 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              lineHeight={'15px'}
              color={request.level == 1 ? ColorWhite : ColorGray700}
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
            mr={'10px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, pageNo: 0, level: 2 })}
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
      <Box w={'50%'} mr={'15px'} mt={'30px'}>
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
              setSelect={setSearchSelect}
            />
          </Box>
          <SearchInput
            value={request.searchKeyword}
            onChange={(e: any) =>
              setRequest({ ...request, searchKeyword: e.target.value })
            }
            placeholder="검색어를 입력해주세요."
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default EntriesWinnerFilterBox;
