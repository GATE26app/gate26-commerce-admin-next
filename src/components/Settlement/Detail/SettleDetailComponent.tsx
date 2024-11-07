'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import {
  ColorBlack,
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import DetailBox from './DetailBox';
import SettleDetailList from './SettleDetailList';
import SearchInput from '@/components/common/SearchInput';
import ImageButton from '@/components/common/ImageButton';
import settlementApi from '@/app/apis/settlement/SettlementApi';
import { getToken } from '@/utils/localStorage/token/index';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import CustomButton from '@/components/common/CustomButton';
import AddSettleItem from './Modal/AddSettleItem';

const data = {
  totalCount: 1,
  data: [
    {
      name: 'test',
    },
  ],
};

function SettleDetailComponent() {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const getSettleId = searchParams.get('getSettleId');
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [request, setRequest] = useState<any>({
    pageNo: 0,
    pageSize: 10,
    searchKeyword: '',
    searchType: '',
  });
  const {
    data: settleData,
    isLoadingSettle,
    error,
    refetch,
  } = useQuery(
    ['settleItem', String(getSettleId)],
    () => settlementApi.getSettleDetail(getSettleId, search),
    {
      staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!getSettleId,
    },
  );

  useEffect(() => {
    refetch();
  }, [search]);

  useEffect(() => {
    console.log('settleData', settleData, getSettleId);
  }, [settleData]);

  const f_excel_down = async () => {
    setIsLoading(true);
    console.log(settleData.data.items);
    if (settleData && settleData.data.items.length <= 0) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'다운받을 수 있는 데이터가 없습니다.'}
          </Box>
        ),
      });
      setIsLoading(false);
    } else {
      const url = `/backoffice/admin/download-settlements/${getSettleId}${
        search != '' ? `?searchKeyword=${search}` : ''
      }`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-AUTH-TOKEN': `${getToken().access}`,
          },
        });
        if (!response.ok) {
          setIsLoading(false);
          throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;

        let fileName = '알수없는파일';
        try {
          const contentDisposition = response.headers.get('Content-Disposition');

          if (contentDisposition && contentDisposition.includes('filename*=')) {
            fileName = contentDisposition
              .split(`filename*=UTF-8''`)[1]
              .split(';')[0]
              .replace(/"/g, '');
          }
          a.download = decodeURIComponent(fileName); // 다운로드할 파일의 이름
        } catch (error) {
          fileName = '알수없는파일';
        }

        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error downloading the file:', error);
      }
    }
  };
  return (
    <>
      <LoadingModal
        children={isLoading}
        isOpen={isLoading}
        onClose={() => !isLoading}
      />
      {openModal && (
        <AddSettleItem
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          type={'add'}
          data={undefined}
        />
      )}
      <Box w={'100%'} pt={'60px'}>
        <Flex justifyContent={'space-between'} mb={'26px'}>
          <Flex alignItems={'center'}>
            <Image
              src={'/images/Page/ico_calculate.png'}
              width={'20px'}
              height={'20px'}
              alt="정산상세"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              정산상세
            </Text>
          </Flex>
        </Flex>
      </Box>
      {settleData && settleData?.data && settleData?.data !== undefined && (
        <>
          <DetailBox data={settleData.data} />
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            pt={'40px'}
          >
            <Box w={'360px'}>
              <SearchInput
                text={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="검색어를 입력해주세요."
              />
            </Box>
            <Flex gap={'10px'}>
            {settleData && settleData.data.status == 0 && (
              <CustomButton
              text="항목추가"
              fontSize="15px"
              color={ColorWhite}
              bgColor={ColorRed}
              borderColor={ColorRed}
              py="14px"
              px="48px"
              onClick={() => setOpenModal(true)}
            />
            )}
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
              onClick={() => {
                f_excel_down();
              }}
            />
              </Flex>
          </Flex>
          <SettleDetailList
            data={settleData.data}
            request={request}
            setRequest={setRequest}
          />
        </>
      )}
      {/* <Flex justifyContent={'center'} mt={'20px'}>
        <CustomButton
          text="목록"
          bgColor={ColorWhite}
          fontSize="15px"
          borderColor={ColorGray400}
          borderRadius="10px"
          py="13px"
          px="117px"
          color={ColorBlack}
          onClick={() => router.back()}
        />
      </Flex> */}
    </>
  );
}

export default SettleDetailComponent;
