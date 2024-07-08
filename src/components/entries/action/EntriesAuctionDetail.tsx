'use client';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';

import {
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import EntriesStateComponent from '@/components/entries/detail/EntriesStateComponent';
import TitleComponent from '@/components/entries/detail/TitleComponent';
import EntriesDateComponent from '@/components/entries/detail/EntriesDateComponent';
import EntriesWinnerContComponent from '@/components/entries/detail/EntriesWinnerContComponent';
import MinusMileComponent from '@/components/entries/detail/MinusMileComponent';
import OpenDateComponent from '@/components/entries/detail/OpenDateComponent';
import EditorDetailComponent from '@/components/entries/detail/EditorDetailComponent';
import EntriesStatusComponent from '@/components/entries/detail/EntriesStatusComponent';
import EntriesCountComponent from '@/components/entries/detail/EntriesCountComponent';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useEntryDeleteMutation,
  usePatchEntryModifyMutation,
} from '@/app/apis/entries/EntriesApi.mutation';
import ToastComponent from '@/components/common/Toast/ToastComponent';
import { useQuery } from 'react-query';
import entriesApi from '@/app/apis/entries/EntriesApi';
import {
  EntriesDetailType,
  EntriesResType,
} from '@/app/apis/entries/EntriesApi.type';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import EntriesImageComponent from '@/components/entries/detail/EntriesImageComponent';
import dayjs from 'dayjs';

function EntriesAuctionDetail() {
  const router = useRouter();
  const toast = useToast();
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
  //수정시 사용
  const [EntriesData, setEntriesData] = useState<EntriesResType>({
    type: 2,
    level: 0,
    title: '',
    content: '',
    winnerCnt: 0,
    openDate: '',
    endDate: '',
    images: [],
    limitCnt: 0,
    point: 0,
  });
  // //상세조회
  const [getEntriesData, setGetEntriesData] = useState<EntriesDetailType>();

  //응모상세
  const { data: detailData } = useQuery(
    ['GET_GOODSDETAIL', getEntryId],
    () => entriesApi.getEntriesDetail(getEntryId == null ? '0' : getEntryId),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      onSuccess: ({ data }) => {
        setEntriesData({
          type: data.type,
          level: data.level,
          title: data.title,
          content: data.content,
          winnerCnt: data.winnerCnt,
          openDate: data.openDate,
          endDate: data.endDate,
          images: data.images,
          limitCnt: data.limitCnt,
          point: data.point,
        });
      },
    },
  );

  useEffect(() => {
    if (detailData?.success == true) {
      setGetEntriesData(detailData.data);
    }
  }, [detailData?.success]);
  const { mutate: optionModifyMutate, isLoading } = usePatchEntryModifyMutation(
    {
      options: {
        onSuccess: (res) => {
          if (res.success == true) {
            setOpenAlertModal(true);
            setModalState({
              ...ModalState,
              title: '응모 수정',
              message: '응모가 수정되었습니다.',
              type: 'alert',
              okButtonName: '확인',
              cbOk: () => {
                router.back();
                // window.history.back();
              },
            });
          } else {
            setOpenAlertModal(true);
            setModalState({
              ...ModalState,
              title: '응모 수정',
              message: `${res.message}`,
              type: 'alert',
              okButtonName: '확인',
              cbOk: () => {
                router.back();
                // window.history.back();
              },
            });
          }
        },
      },
    },
  );

  const handleClick = () => {
    const obj = {
      data: EntriesData,
      entryId: Number(getEntryId),
    };
    const startTime = dayjs(EntriesData.openDate);
    const endTime = dayjs(EntriesData.endDate);
    if (EntriesData.title == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'상품응모명을 입력해주세요.'}
          </Box>
        ),
      });
    } else if (EntriesData.openDate == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'상품응모 시작일을 선택해주세요.'}
          </Box>
        ),
      });
    } else if (EntriesData.endDate == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'상품응모 종료일을 선택해주세요.'}
          </Box>
        ),
      });
    } else if (
      Math.sign(endTime.diff(startTime)) == -1 ||
      Math.sign(endTime.diff(startTime)) == 0
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'상품응모 종료일을 다시 확인해주세요.'}
          </Box>
        ),
      });
    } else if (EntriesData.winnerCnt == 0) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'당첨자수를 선택해주세요.'}
          </Box>
        ),
      });
    } else if (EntriesData.content == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'상세설명을 입력해주세요.'}
          </Box>
        ),
      });
    } else if (EntriesData.images.length == 0) {
      setOpenAlertModal(false);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'이미지를 추가 해주세요.'}
          </Box>
        ),
      });
    } else {
      optionModifyMutate(obj);
    }
  };
  useEffect(() => {
    setLoadingModal(isLoading);
  }, [isLoading]);

  //응모삭제
  const { mutate: deleteMutate } = useEntryDeleteMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          // setGoodsInfo({
          //   goodState: true,
          // });
          router.back();
          ToastComponent('응모가 삭제되었습니다.');
        } else {
          ToastComponent('삭제가 되지 않았습니다.');
          // console.log('error 상품 생성 에러', res.code);
        }
      },
    },
  });
  return (
    <>
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />

      <LoadingModal
        children={isLoadingModal}
        isOpen={isLoadingModal}
        onClose={() => setLoadingModal(false)}
      />
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
          top={'72px'}
          bgColor={ColorWhite}
          zIndex={999}
        >
          <Flex alignItems={'center'}>
            <Image
              src={'/images/Page/subtopicon05.png'}
              width={'20px'}
              height={'20px'}
              alt="상품관리"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              경매 상품응모 등록 / 수정
            </Text>
          </Flex>
          <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <CustomButton
              text="목록"
              borderColor={ColorGray400}
              color={ColorGray700}
              px="44px"
              py="13px"
              bgColor={ColorWhite}
              fontSize="15px"
              onClick={() => router.back()}
            />

            <CustomButton
              text="수정"
              borderColor={ColorRed}
              color={ColorWhite}
              px="44px"
              py="13px"
              bgColor={ColorRed}
              fontSize="15px"
              onClick={() => {
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '경매 응모 수정',
                  message: `응모를 수정 하시겠습니까?`,
                  type: 'confirm',
                  okButtonName: '확인',
                  cbOk: () => {
                    handleClick();
                    // window.history.back();
                  },
                });
              }}
            />
          </Flex>
        </Flex>
        {detailData?.success == true ? (
          <Box
            // px={'60px'}
            // pb={'60px'}
            bgColor={ColorWhite}
            borderBottomRadius={'16px'}
          >
            <EntriesStateComponent data={detailData?.data} />
            <TitleComponent
              EntriesData={EntriesData}
              setEntriesData={setEntriesData}
            />
            <EntriesDateComponent
              EntriesData={EntriesData}
              setEntriesData={setEntriesData}
            />
            <EntriesWinnerContComponent
              EntriesData={EntriesData}
              setEntriesData={setEntriesData}
            />
            <MinusMileComponent
              EntriesData={EntriesData}
              setEntriesData={setEntriesData}
            />
            <EntriesCountComponent
              EntriesData={EntriesData}
              setEntriesData={setEntriesData}
            />
            {/* <OpenDateComponent
              EntriesData={EntriesData}
              setEntriesData={setEntriesData}
            /> */}
            <EditorDetailComponent
              EntriesData={EntriesData}
              setEntriesData={setEntriesData}
            />
            <EntriesStatusComponent
              EntriesData={EntriesData}
              setEntriesData={setEntriesData}
            />
            <EntriesImageComponent
              EntriesData={EntriesData}
              setEntriesData={setEntriesData}
            />
            <Flex justifyContent={'flex-end'}>
              <CustomButton
                text="삭제하기"
                borderColor={ColorGray900}
                bgColor={ColorWhite}
                color={ColorGray900}
                fontSize="15px"
                px="31px"
                py="13px"
                onClick={() => {
                  setOpenAlertModal(true);
                  setModalState({
                    ...ModalState,
                    title: '선착순 응모 삭제',
                    message: `응모를 삭제 하시겠습니까?`,
                    type: 'confirm',
                    okButtonName: '확인',
                    cbOk: () => {
                      deleteMutate(String(getEntriesData?.entryId));
                      // window.history.back();
                    },
                  });
                }}
              />
            </Flex>
          </Box>
        ) : (
          <></>
        )}
      </Flex>
    </>
  );
}

export default EntriesAuctionDetail;
