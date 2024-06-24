import React, { ReactElement, Suspense, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ColorBlack00, ColorWhite } from '@/utils/_Palette';
import EntreisWinnerDetailComponent from '@/components/entries/winnerInquiry/detail/EntreisWinnerDetailComponent';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import entriesApi from '@/app/apis/entries/EntriesApi';
import { EntriesDetailType } from '@/app/apis/entries/EntriesApi.type';

function EntriesWinnerDetail() {
  const searchParams = useSearchParams();
  const getEntryId = searchParams.get('id');
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  // //상세조회
  const [getEntriesData, setGetEntriesData] = useState<EntriesDetailType>({
    entryId: 0,
    status: 0,
    statusName: '',
    type: 0,
    typeName: '',
    level: 0,
    levelName: '',
    title: '',
    content: '',
    winnerCnt: 0,
    openDate: '',
    startDate: '',
    endDate: '',
    point: 0,
    limitCnt: 0,
    totalParticipantCnt: 0,
    totalWinnerCnt: 0,
    images: [],
  });
  //응모상세
  const { data: detailData, isLoading } = useQuery(
    ['GET_GOODSDETAIL', getEntryId],
    () => entriesApi.getEntriesDetail(String(getEntryId)),
    {
      staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      refetchInterval: false, // 자동 새로 고침 비활성화
      onSuccess: ({ data }) => {
        console.log('data', data);
        setGetEntriesData(data);
      },
    },
  );
  return (
    <>
      <Flex
        w={'100%'}
        flexDirection={'column'}
        position={'relative'}
        borderRadius={'16px'}
      >
        <Flex
          justifyContent={'space-between'}
          pt={'60px'}
          pb={'15px'}
          position={'sticky'}
          top={'89px'}
          bgColor={ColorWhite}
          zIndex={999}
        >
          <Flex alignItems={'center'}>
            <Image
              src={'/images/Page/subtopicon05.png'}
              width={'20px'}
              height={'20px'}
              alt="당첨자상세"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              당첨자상세
            </Text>
          </Flex>
        </Flex>

        {!isLoading && (
          <Box
            // px={'60px'}
            // pb={'60px'}
            bgColor={ColorWhite}
            borderBottomRadius={'16px'}
          >
            <EntreisWinnerDetailComponent data={getEntriesData} />
          </Box>
        )}
      </Flex>
    </>
  );
}

export default EntriesWinnerDetail;
