'use client';
import React, { Suspense, useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import ImageButton from '@/components/common/ImageButton';
import Pagination from '@/components/common/Pagination';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import ApplyCard from './ApplyCard';
import {
  PartUserType,
  ParticipantListType,
} from '@/app/apis/entries/EntriesApi.type';
import { useSearchParams } from 'next/navigation';
import { useGetEntryWinnerListMutation } from '@/app/apis/entries/EntriesApi.mutation';
import Image from 'next/image';

export const Applyrheader = [
  {
    name: '번호',
    width: '9%',
  },
  {
    name: '아이디',
    width: '21%',
  },
  {
    name: '이름',
    width: '15%',
  },
  {
    name: '휴대폰번호',
    width: '25%',
  },
  {
    name: '응모일',
    width: '30%',
  },
];
const data = [
  {
    id: 5,
    userId: '아이디',
    name: '이름',
    phone: '휴대폰번호',
    date: '2024-06-08 00:00:00',
  },
  {
    id: 4,
    userId: '아이디',
    name: '이름',
    phone: '휴대폰번호',
    date: '2024-06-08 00:00:00',
  },
  {
    id: 3,
    userId: '아이디',
    name: '이름',
    phone: '휴대폰번호',
    date: '2024-06-08 00:00:00',
  },
  {
    id: 2,
    userId: '아이디',
    name: '이름',
    phone: '010-8787-2323',
    date: '2024-06-08 00:00:00',
  },
  {
    id: 1,
    userId: '아이디',
    name: '이름',
    phone: '휴대폰번호',
    date: '2024-06-08 00:00:00',
  },
];
interface ItemProps {
  id: number;
  userId: string;
  name: string;
  phone: string;
  date: string;
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
function ApplyTable() {
  const [list, setList] = useState<ParticipantListType>();
  const [request, setRequest] = useState<ReqLoungeProps>({
    pageNo: 0,
    pageSize: 5,
  });
  const paginationProps = {
    currentPage: request.pageNo,
    limit: request.pageSize,
    total: 20,
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
  console.log('getEntryId', getEntryId);

  const Obj = {
    pageNo: request.pageNo + 1,
    pageSize: request.pageSize,
    entryId: Number(getEntryId),
  };

  const { mutate: winnerList, isLoading } = useGetEntryWinnerListMutation({
    options: {
      onSuccess: (res) => {
        console.log('res.', res);
        console.log('data.', res.data);
        setList(res.data);
      },
    },
  });

  useEffect(() => {
    if (getEntryId) {
      winnerList(Obj);
    }
  }, [getEntryId]);
  return (
    <Suspense>
      <Box>
        <Flex
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'15px'}
        >
          <Flex gap={'10px'} alignItems={'center'}>
            <Text fontSize={'18px'} fontWeight={600} color={ColorBlack}>
              응모자명단
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              응모수
            </Text>
            <Text color={ColorRed} fontWeight={700} fontSize={'16px'}>
              {list !== undefined && list.totalCount}
            </Text>
          </Flex>
          {list !== undefined && list.totalCount !== 0 && (
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
          )}
        </Flex>
        {list !== undefined && list.totalCount !== 0 ? (
          <Box mb={'20px'}>
            <Flex
              flexDirection={'row'}
              justifyContent={'center'}
              w={'100%'}
              borderTopWidth={1}
              borderBottomWidth={1}
              borderTopColor={ColorDataTableBorderTop}
              borderBottomColor={ColorGrayBorder}

              // alignItems={'center'}
            >
              {Applyrheader.map((item: DataTableHeaderProps, index: number) => {
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
                  <ApplyCard
                    key={index}
                    item={item}
                    header={Applyrheader}
                    index={index}
                    totalCount={list.totalCount}
                    pageNo={list.pageNo}
                  />
                );
              })}
            {paginationProps && (
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
    </Suspense>
  );
}

export default ApplyTable;
