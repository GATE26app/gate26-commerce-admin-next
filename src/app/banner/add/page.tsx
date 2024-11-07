'use client';
import React, { ReactElement, useEffect, useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';

import {
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { useRouter } from 'next/navigation';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import OrderComponent from '@/components/banner/add/OrderComponent';
import ImageComponent from '@/components/banner/add/ImageComponent';
import StatusComponent from '@/components/banner/add/StatusComponent';
import TitleComponent from '@/components/banner/add/TitleComponent';
import DateComponent from '@/components/banner/add/DateComponent';
import LinkComponent from '@/components/banner/add/LinkComponent';
import { useBannerCreateMutation } from '@/app/apis/banner/BannerApi.mutation';
// import ToastComponent from '@/components/common/Toast/ToastComponent';

function ToastComponent(message: string) {
  const toast = useToast();
  return toast({
    position: 'top',
    duration: 2000,
    render: () => (
      <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
        {`${message}`}
      </Box>
    ),
  });
}
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

  const [BannerInfo, setBannerInfo] = useState({
    type: 0,
    level: 0,
    sort: 0,
    title: '',
    target: '',
    openDate: '',
    endDate: '',
    images: [],
  });
  const handleClick = () => {
    if (BannerInfo.openDate == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'배너 시작일을 선택해주세요.'}
          </Box>
        ),
      });
    } else if (BannerInfo.endDate == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'배너 시작일을 선택해주세요.'}
          </Box>
        ),
      });
    } else if (BannerInfo.images.length == 0) {
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
    } else if (BannerInfo.title == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'배너명을 입력해주세요.'}
          </Box>
        ),
      });
    } else if (BannerInfo.target == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'연결하실 링크를 입력해주세요.'}
          </Box>
        ),
      });
    } else {
      CreateItemMutate(BannerInfo);
    }
  };
  const { mutate: CreateItemMutate, isLoading } = useBannerCreateMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: '배너 등록',
            message: '배너가 등록되었습니다.',
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              router.back();
              // window.history.back();
            },
          });
        } else {
          ToastComponent('등록에 실패하였습니다.');
          console.log('error 배너 등록 에러', res.code);
        }
      },
    },
  });

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
              src={'/images/Page/subtopicon07.png'}
              width={'23px'}
              height={'18px'}
              alt="상품관리"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              배너 등록/관리
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
              text="저장"
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
                  title: '배너 등록',
                  message: `배너를 등록 하시겠습니까?`,
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
          <OrderComponent
            BannerInfo={BannerInfo}
            setBannerInfo={setBannerInfo}
          />
          <StatusComponent
            BannerInfo={BannerInfo}
            setBannerInfo={setBannerInfo}
          />
          <DateComponent
            BannerInfo={BannerInfo}
            setBannerInfo={setBannerInfo}
          />
          <ImageComponent
            BannerInfo={BannerInfo}
            setBannerInfo={setBannerInfo}
          />
          <TitleComponent
            BannerInfo={BannerInfo}
            setBannerInfo={setBannerInfo}
          />
          <LinkComponent
            BannerInfo={BannerInfo}
            setBannerInfo={setBannerInfo}
          />
        </Box>
      </Flex>
    </>
  );
}

export default page;
