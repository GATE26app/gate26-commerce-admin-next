import React, { Suspense, useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import WinnerCard from './WinnerCard';
import ImageButton from '@/components/common/ImageButton';
import Pagination from '@/components/common/Pagination';
import {
  useGetEntryParticipantListMutation,
  useGetEntryWinnerListMutation,
} from '@/app/apis/entries/EntriesApi.mutation';
import { useSearchParams } from 'next/navigation';
import {
  PartUserType,
  ParticipantListType,
} from '@/app/apis/entries/EntriesApi.type';
import Image from 'next/image';

export const winnerheader = [
  {
    name: '번호',
    width: '10%',
  },
  {
    name: '아이디',
    width: '30%',
  },
  {
    name: '이름',
    width: '30%',
  },
  {
    name: '휴대폰번호',
    width: '30%',
  },
];
const data = [
  {
    id: 5,
    userId: '아이디',
    name: '이름',
    phone: '휴대폰번호',
  },
  {
    id: 4,
    userId: '아이디',
    name: '이름',
    phone: '휴대폰번호',
  },
  {
    id: 3,
    userId: '아이디',
    name: '이름',
    phone: '휴대폰번호',
  },
  {
    id: 2,
    userId: '아이디',
    name: '이름',
    phone: '휴대폰번호',
  },
  {
    id: 1,
    userId: '아이디',
    name: '이름',
    phone: '휴대폰번호',
  },
];
interface ItemProps {
  id: number;
  userId: string;
  name: string;
  phone: string;
}
interface DataTableHeaderProps {
  name: string;
  width: string;
}
interface ReqLoungeProps {
  pageNo: number;
  pageSize: number;
}
export type { DataTableHeaderProps, ItemProps };
function WinnerTable() {
  const [list, setList] = useState<ParticipantListType>();
  const [request, setRequest] = useState<ReqLoungeProps>({
    pageNo: 0,
    pageSize: 5,
  });

  const paginationProps = {
    currentPage: request.pageNo,
    limit: request.pageSize,
    total: list?.totalCount == undefined ? 0 : list?.totalCount,
    onPageNumberClicked: (page: number) => handleChangeInput('page', page),
    onPreviousPageClicked: (page: number) => handleChangeInput('page', page),
    onNextPageClicked: (page: number) => handleChangeInput('page', page),
  };

  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };
    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      // setPage(value as number);
      newRequest.pageNo = Number(value);
    }
    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }
    setRequest(newRequest);
  }

  const searchParams = useSearchParams();
  const getEntryId = searchParams.get('id');

  const Obj = {
    pageNo: request.pageNo + 1,
    pageSize: request.pageSize,
    entryId: Number(getEntryId),
  };

  const { mutate: winnerList, isLoading } = useGetEntryWinnerListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        // setGoodsInfo({
        //   goodState: false,
        // });
      },
    },
  });

  useEffect(() => {
    if (getEntryId) {
      winnerList(Obj);
    }
  }, [getEntryId]);

  return (
    <Box>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={'15px'}
      >
        <Flex gap={'10px'} alignItems={'center'}>
          <Text fontSize={'18px'} fontWeight={600} color={ColorBlack}>
            당첨자
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            당첨자수
          </Text>
          <Text color={ColorRed} fontWeight={700} fontSize={'16px'}>
            {list !== undefined && list.totalCount}
          </Text>
        </Flex>
        {/* {list !== undefined && list.totalCount !== 0 && (
          <ImageButton
            img="/images/Page/excel_icon.png"
            backgroundColor={ColorWhite}
            borderColor={ColorGrayBorder}
            text="엑셀 다운로드"
            TextColor={ColorGray700}
            fontSize="14px"
            imgHeight="20px"
            imgWidth="20px"
            px="14px"
            py="10px"
            onClick={() => console.log('엑셀다운로드')}
          />
        )} */}
      </Flex>
      {list !== undefined && list.totalCount !== 0 ? (
        <Box>
          <Flex
            flexDirection={'row'}
            w={'100%'}
            borderTopWidth={1}
            borderBottomWidth={1}
            borderTopColor={ColorDataTableBorderTop}
            borderBottomColor={ColorGrayBorder}
            justifyContent={'center'}
          >
            {winnerheader.map((item: DataTableHeaderProps, index: number) => {
              return (
                <Flex
                  w={item.width}
                  alignItems={'center'}
                  justifyContent={'center'}
                  h={'59px'}
                >
                  <Text
                    color={ColorBlack}
                    fontSize={'15px'}
                    fontWeight={700}
                    whiteSpace={'pre-wrap'}
                    textAlign={'center'}
                    key={index}
                  >
                    {item.name}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
          {list &&
            list.users.map((item: PartUserType, index: number) => {
              return (
                <WinnerCard
                  key={index}
                  item={item}
                  header={winnerheader}
                  index={index}
                  totalCount={list.totalCount}
                  pageNo={list.pageNo}
                />
              );
            })}
          {list && paginationProps && (
            <Flex justifyContent="center" alignItems="center">
              <Pagination
                currentPage={request.pageNo}
                limit={request.pageSize}
                total={paginationProps.total}
                onPageNumberClicked={paginationProps.onPageNumberClicked}
                onPreviousPageClicked={paginationProps.onPreviousPageClicked}
                onNextPageClicked={paginationProps.onNextPageClicked}
              />
            </Flex>
          )}
        </Box>
      ) : (
        <Flex
          bgColor={ColorGray100}
          mt={'20px'}
          py={'42px'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image
            width={80}
            height={80}
            src={'/images/Page/no_data.png'}
            alt="데이터 없음"
          />
          <Text fontSize={'14px'} fontWeight={'400'} color={ColorBlack}>
            조회한 내용이 없습니다.
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export default WinnerTable;
