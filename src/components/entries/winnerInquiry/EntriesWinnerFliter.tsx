import React, { useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';

import {
  ColorBlack,
  ColorGray50,
  ColorGray600,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import EntriesWinnerFilterBox from './EntriesWinnerFilterBox';
import ImageButton from '@/components/common/ImageButton';
import { EntriesListResType } from '@/app/apis/entries/EntriesApi.type';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useRouter } from 'next/navigation';
import { useWinnerFilterZuInfo } from '@/_store/WinnerFIlterInfo';
interface Props {
  request: EntriesListResType;
  setRequest: React.Dispatch<React.SetStateAction<EntriesListResType>>;
}
function EntriesWinnerFliter({ request, setRequest }: Props) {
  const { winnerFilterInfo, setWinnerFilterInfo } = useWinnerFilterZuInfo(
    (state) => state,
  );
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [search, setSearch] = useState('');
  return (
    <Flex
      bgColor={ColorGray50}
      borderRadius={'12px'}
      p={'40px'}
      flexDirection={'column'}
    >
      <Flex>
        <EntriesWinnerFilterBox
          request={request}
          setRequest={setRequest}
          search={search}
          setSearch={setSearch}
        />
        {/* <LeftBox
          filter_1={filter_1}
          filter_2={filter_2}
          setFilter_1={setFilter_1}
          setFilter_2={setFilter_2}
          search={search}
          setSearch={setSearch}
        />
        <RightBox filter_3={filter_3} setFilter_3={setFilter_3} /> */}
      </Flex>
      <Flex justifyContent={'center'} mt={'45px'} gap={'10px'}>
        <ImageButton
          img="/images/Page/icon_reload.png"
          backgroundColor={ColorWhite}
          px={'48px'}
          text="초기화"
          onClick={() => {
            setRequest({
              ...request,
              status: null,
              level: 0,
              type: 0,
              searchKeyword: '',
              searchType: '',
            });
            setGoodsInfo({
              winnerState: true,
            });
          }}
          borderColor={ColorGrayBorder}
          TextColor={ColorGray600}
          imgWidth={'15px'}
          imgHeight={'15px'}
          fontSize={'15px'}
          py="13px"
        />
        <CustomButton
          text="검색"
          fontSize="15px"
          color={ColorWhite}
          bgColor={ColorRed}
          borderColor={ColorRed}
          py="14px"
          px="67px"
          onClick={() => {
            setWinnerFilterInfo({
              ...winnerFilterInfo,
              pageNo: request.pageNo !== undefined ? request.pageNo : 0,
              searchType:
                request.searchType !== undefined ? request.searchType : '',
              searchKeyword:
                request.searchKeyword !== undefined
                  ? request.searchKeyword
                  : '',
              status: request.status !== undefined ? request.status : 0,
              level: request.level !== undefined ? request.level : 0,
              type: request.type !== undefined ? request.type : 0,
            });
            router.push(`/entries/winnerInquiry?page=1`);
            setGoodsInfo({
              winnerState: true,
            });
          }}
        />
        {/* <Button size="sm" text="검색" width={'160px'} /> */}
      </Flex>
    </Flex>
  );
}

export default EntriesWinnerFliter;
