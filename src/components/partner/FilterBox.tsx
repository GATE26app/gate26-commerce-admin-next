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
import { PartnerListParamGetType } from '@/app/apis/partners/PartnersApi.type';

interface Props {
  request: PartnerListParamGetType;
  setRequest: React.Dispatch<React.SetStateAction<PartnerListParamGetType>>;
}
function FilterBox({ request, setRequest }: Props) {
  const [searchSelect, setSearchSelect] = useState('');
  const searchSelectList = ['파트너사명', '아이디', '대표자', '연락처/연락망'];

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
            회원승인
          </Text>
          <Flex gap={'10px'}>
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.level == 0 ? ColorRed : ColorInputBorder}
              bgColor={request.level == 0 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="전체"
              fontSize={'15px'}
              color={request.level == 0 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, level: 0 })}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.level == 1 ? ColorRed : ColorInputBorder}
              bgColor={request.level == 1 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="대기"
              fontSize={'15px'}
              color={request.level == 1 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, level: 1 })}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.level == 2 ? ColorRed : ColorInputBorder}
              bgColor={request.level == 2 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="승인"
              fontSize={'15px'}
              color={request.level == 2 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, level: 2 })}
            />
            <CustomButton
              px={'14px'}
              py={'11px'}
              borderColor={request.level == 3 ? ColorRed : ColorInputBorder}
              bgColor={request.level == 3 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              text="반려"
              fontSize={'15px'}
              color={request.level == 3 ? ColorWhite : ColorGray700}
              onClick={() => setRequest({ ...request, level: 3 })}
            />
          </Flex>
        </Flex>
        {/* <Flex flexDirection={'column'} flexWrap={'wrap'} w={'50%'}>
          <Text
            fontSize={'16px'}
            fontWeight={700}
            color={ColorBlack}
            mb={'10px'}
          >
            계좌정보
          </Text>
          <Flex>
            <Box
              bgColor={request.pay_type == 0 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.pay_type == 0 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, pay_type: 0 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.pay_type == 0 ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                전체
              </Text>
            </Box>
            <Box
              bgColor={request.pay_type == 1 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.pay_type == 1 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, pay_type: 1 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.pay_type == 1 ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                대기
              </Text>
            </Box>
            <Box
              bgColor={request.pay_type == 2 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.pay_type == 2 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, pay_type: 2 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.pay_type == 2 ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                승인
              </Text>
            </Box>
            <Box
              bgColor={request.pay_type == 3 ? ColorRed : ColorWhite}
              borderRadius={'10px'}
              borderWidth={1}
              borderColor={request.pay_type == 3 ? ColorRed : ColorInputBorder}
              py={'11px'}
              px={'14px'}
              mr={'10px'}
              cursor={'pointer'}
              onClick={() => setRequest({ ...request, pay_type: 3 })}
            >
              <Text
                fontSize={'15px'}
                fontWeight={400}
                color={request.pay_type == 3 ? ColorWhite : ColorGray700}
                lineHeight={'15px'}
              >
                반려
              </Text>
            </Box>
          </Flex>
        </Flex> */}
      </Flex>

      <Box w={'50%'} mt={'30px'}>
        <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
          회원상태
        </Text>
        <Flex mb={'30px'} gap={'10px'} flexWrap={'wrap'}>
          <Box
            bgColor={request.status == 0 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.status == 0 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, status: 0 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.status == 0 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              전체
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
            onClick={() => setRequest({ ...request, status: 1 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.status == 1 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              정상
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
            onClick={() => setRequest({ ...request, status: 2 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.status == 2 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              정지
            </Text>
          </Box>
          <Box
            bgColor={request.status == 3 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.status == 3 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, status: 3 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.status == 3 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              탈퇴요청
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
                    item == '파트너사명'
                      ? 'title'
                      : '아이디'
                      ? 'loginId'
                      : '대표자'
                      ? 'nameOfRepresentative'
                      : '연락처'
                      ? 'hp'
                      : '연락망'
                      ? 'authEmail'
                      : ''
                });
              }}
            />
          </Box>
          <SearchInput
            value={request.searchKeyword}
            onChange={(e: any) => {
              setRequest({ ...request, searchKeyword: e.target.value })
            }}
            placeholder="검색어를 입력해주세요."
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default FilterBox;
