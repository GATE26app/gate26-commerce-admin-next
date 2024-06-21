'use client';
import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';

import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { useRouter } from 'next/navigation';
import { EntriesDetailType } from '@/app/apis/entries/EntriesApi.type';
import { DashDate, intComma } from '@/utils/format';
import { useEntryDeleteMutation } from '@/app/apis/entries/EntriesApi.mutation';
import ToastComponent from '@/components/common/Toast/ToastComponent';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';

interface Props {
  data: EntriesDetailType;
}
function EntriesLeftComponent({ data }: Props) {
  const router = useRouter();
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

  //응모삭제
  const { mutate: deleteMutate } = useEntryDeleteMutation({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          // setGoodsInfo({
          //   entryState: true,
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
    <Box position={'sticky'} top={'205px'}>
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
        bgColor={ColorGray50}
        borderRadius={'12px'}
        p={'40px'}
        flexDirection={'column'}
        gap={'20px'}
      >
        <Flex alignItems={'center'} flexDirection={'row'}>
          <Text
            w={'150px'}
            flexShrink={0}
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
          >
            상태값
          </Text>
          <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
            {data.statusName}
          </Text>
        </Flex>
        <Flex alignItems={'flex-start'} flexDirection={'row'}>
          <Text
            w={'150px'}
            flexShrink={0}
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
          >
            상품응모명
          </Text>
          <Flex gap={'10px'}>
            <Text
              fontWeight={600}
              fontSize={'15px'}
              color={ColorRed}
              flexShrink={0}
            >
              {data.typeName}
            </Text>
            <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
              {data.title}
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems={'center'} flexDirection={'row'}>
          <Text
            w={'150px'}
            flexShrink={0}
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
          >
            응모기간
          </Text>
          <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
            {DashDate(data.startDate)} ~ {DashDate(data.endDate)}
          </Text>
        </Flex>
        <Flex alignItems={'center'} flexDirection={'row'}>
          <Text
            w={'150px'}
            flexShrink={0}
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
          >
            당첨자수
          </Text>
          <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
            {intComma(data.winnerCnt)}
          </Text>
        </Flex>
        <Flex alignItems={'center'} flexDirection={'row'}>
          <Text
            w={'150px'}
            flexShrink={0}
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
          >
            오픈일
          </Text>
          <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
            {DashDate(data.openDate)}
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent={'center'} mt={'40px'} gap={'10px'}>
        {/* <CustomButton
          text="삭제"
          bgColor={ColorWhite}
          fontSize="15px"
          borderColor={ColorGray400}
          borderRadius="10px"
          py="13px"
          px="67px"
          color={ColorBlack}
          onClick={() => {
            setOpenAlertModal(true);
            setModalState({
              ...ModalState,
              title: '응모 삭제',
              message: `응모를 삭제 하시겠습니까?`,
              type: 'confirm',
              okButtonName: '확인',
              cbOk: () => {
                deleteMutate(String(data.entryId));
                setLoadingModal(true);
                // window.history.back();
              },
            });
          }}
        /> */}
        <CustomButton
          text="목록"
          bgColor={ColorWhite}
          fontSize="15px"
          borderColor={ColorGray400}
          borderRadius="10px"
          py="13px"
          px="67px"
          color={ColorBlack}
          onClick={() => router.back()}
        />
      </Flex>
    </Box>
  );
}

export default EntriesLeftComponent;
