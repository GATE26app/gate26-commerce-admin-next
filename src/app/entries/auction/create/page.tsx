'use client';
import React, { ReactElement, useEffect, useState } from 'react';

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
import { useRouter } from 'next/navigation';
import EntriesStateComponent from '@/components/entries/detail/EntriesStateComponent';
import TitleComponent from '@/components/entries/detail/TitleComponent';
import EntriesDateComponent from '@/components/entries/detail/EntriesDateComponent';
import EntriesWinnerContComponent from '@/components/entries/detail/EntriesWinnerContComponent';
import MinusMileComponent from '@/components/entries/detail/MinusMileComponent';
import OpenDateComponent from '@/components/entries/detail/OpenDateComponent';
import EditorDetailComponent from '@/components/entries/detail/EditorDetailComponent';
import EntriesStatusComponent from '@/components/entries/detail/EntriesStatusComponent';
import {
  EntriesImageType,
  EntriesResType,
} from '@/app/apis/entries/EntriesApi.type';
import EntriesImageComponent from '@/components/entries/detail/EntriesImageComponent';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import { usePutCreateEntriesMutation } from '@/app/apis/entries/EntriesApi.mutation';
import ToastComponent from '@/components/common/Toast/ToastComponent';
import EntriesCountComponent from '@/components/entries/detail/EntriesCountComponent';
import dayjs from 'dayjs';

function page() {
  const router = useRouter();
  const toast = useToast();
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

  const [EntriesData, setEntriesData] = useState<EntriesResType>({
    type: 2,
    level: 0,
    title: '',
    content: '',
    winnerCnt: 0,
    limitCnt: 0,
    openDate: '',
    endDate: '',
    point: 0,
    images: [],
  });

  const { mutate: CreateItemMutate, isLoading } = usePutCreateEntriesMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: '경매 응모 등록',
            message: '경매 응모가 등록되었습니다.',
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              router.back();
              // window.history.back();
            },
          });
        } else {
          ToastComponent('등록에 실패하였습니다.');
        }
      },
      onError: (req) => {
        console.log(req);
      },
    },
  });

  const handleClick = () => {
    const startTime = dayjs(EntriesData.openDate);
    const endTime = dayjs(EntriesData.endDate);
    const nowTime = dayjs(new Date());

    const startTimeDifference = startTime.diff(nowTime, 'minutes'); //현재시간과 시작시간 비교 5분 차이 나야함
    const endTimeDifference = endTime.diff(startTime, 'minutes'); //시작시간과 종료시간 비교 5분 차이 나야함

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
    } else if (startTimeDifference <= 4) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'시작 시간을 현재 시간 5분 이후 시간으로 선택해주세요.'}
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
    }
    // else if (
    //   Math.sign(endTime.diff(startTime)) == -1 ||
    //   Math.sign(endTime.diff(startTime)) == 0
    // ) {
    //   toast({
    //     position: 'top',
    //     duration: 2000,
    //     render: () => (
    //       <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
    //         {'상품응모 종료일을 다시 확인해주세요.'}
    //       </Box>
    //     ),
    //   });
    // }
    else if (endTimeDifference <= 4) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'종료 시간을 시작시간 5분 이후 시간으로 선택해주세요.'}
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
      CreateItemMutate(EntriesData);
    }
  };
  useEffect(() => {
    setLoadingModal(isLoading);
  }, [isLoading]);
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
              경매 상품응모 등록
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
              text="확인"
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
                  title: '경매 응모 등록',
                  message: `응모를 등록 하시겠습니까?`,
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

        <Box
          // px={'60px'}
          // pb={'60px'}
          bgColor={ColorWhite}
          borderBottomRadius={'16px'}
        >
          {/* <EntriesStateComponent /> */}
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
          <EntriesImageComponent
            EntriesData={EntriesData}
            setEntriesData={setEntriesData}
          />
          <EntriesStatusComponent
            EntriesData={EntriesData}
            setEntriesData={setEntriesData}
          />
        </Box>
      </Flex>
    </>
  );
}

export default page;
