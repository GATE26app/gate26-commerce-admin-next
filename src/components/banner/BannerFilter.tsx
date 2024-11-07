import React from 'react';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import {
  ColorBlack,
  ColorBlack00,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import SearchInput from '../common/SearchInput';
import CustomButton from '../common/CustomButton';
import { useRouter } from '../../../node_modules/next/navigation';
import { BannerListParamsType } from '@/app/apis/banner/BannerApi.type';
import SelectBox from '../common/SelectBox';

interface Props {
  request: BannerListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<BannerListParamsType>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BannerFilter({
  request,
  setRequest,
  setOnSubmit,
}: Props) {
  const router = useRouter();
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      // enter 했을 때의 코드 작성
      // if(e.keyCode === 13) 도 사용가능하다.
      setRequest({ ...request, searchKeyword: e.target.value });
    }
  };
  return (
    <>
      <Flex justifyContent={'space-between'} mt={'26px'}>
        <Flex w={'420px'}>
          <SearchInput
            value={String(request.searchKeyword)}
            onChange={(e) =>
              setRequest({ ...request, searchKeyword: e.target.value })
            }
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력해주세요."
          />
        </Flex>
        <CustomButton
          text="신규등록"
          fontSize="15px"
          color={ColorWhite}
          bgColor={ColorRed}
          borderColor={ColorRed}
          py="14px"
          px="48px"
          onClick={() => router.push('/banner/add')}
        />
      </Flex>
      <Flex
        w={'100%'}
        borderRadius={'12px'}
        backgroundColor={'#FAFAFA'}
        alignItems={'center'}
        px={'40px'}
        py={'20px'}
        mt={'26px'}
      >
        <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mr={'40px'}>
          노출상태
        </Text>
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
      </Flex>
    </>
  );
}
