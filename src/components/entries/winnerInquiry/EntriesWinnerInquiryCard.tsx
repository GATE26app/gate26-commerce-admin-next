import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorBlue,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
  ColorclickBlue,
} from '@/utils/_Palette';

import { ItemProps } from './EntruesWinnerInquiryTable';
import { EntriesListType } from '@/app/apis/entries/EntriesApi.type';
import { DashDate, intComma } from '@/utils/format';
import { useEntryDeleteMutation } from '@/app/apis/entries/EntriesApi.mutation';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import ToastComponent from '@/components/common/Toast/ToastComponent';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';

// import { ItemProps } from './CancelDataTable';

interface headerProps {
  id: string;
  name: string;
  width: string;
}
interface Props {
  header: Array<headerProps>;
  item: EntriesListType;
  index: number;
  pageNo: number;
  totalCount: number;
}
function EntriesWinnerInquiryCard({
  header,
  item,
  index,
  pageNo,
  totalCount,
}: Props) {
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
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
          setGoodsInfo({
            winnerState: true,
          });
          // router.back();
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
        minW={'1200px'}
        flexDirection={'row'}
        justifyContent={'center'}
        py={'20px'}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
      >
        <Flex
          w={header[0]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {totalCount - (pageNo - 1) * 10 - index}
          </Text>
        </Flex>
        <Flex
          w={header[1]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
            {item.statusName}
          </Text>
        </Flex>
        <Flex
          w={header[2]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
            {item.typeName}
          </Text>
        </Flex>
        {/* 결제정보 */}
        <Flex
          w={header[3]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.title}
          </Text>
        </Flex>
        {/* 예약자정보 */}
        <Flex
          w={header[4]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {intComma(item.winnerCnt)}
          </Text>
        </Flex>
        <Flex
          w={header[5]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'10px'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {DashDate(item.openDate)}
          </Text>
        </Flex>
        <Flex
          w={header[6]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Flex mb={'5px'} flexDirection={'column'} flexShrink={0}>
            <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
              {DashDate(item.startDate)}~
            </Text>
            <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
              {DashDate(item.endDate)}
            </Text>
          </Flex>
        </Flex>
        <Flex
          w={header[7]?.width}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Flex flexDirection={'row'} gap={'10px'}>
            <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
              {intComma(item.totalParticipantCnt)}
            </Text>
            <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
              /
            </Text>
            <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
              {intComma(item.totalWinnerCnt)}
            </Text>
          </Flex>
        </Flex>
        <Flex
          w={header[8]?.width}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <Flex
              borderRadius={'6px'}
              borderColor={ColorGray400}
              borderWidth={1}
              px={'15px'}
              pt={'7px'}
              pb={'6px'}
              cursor={'pointer'}
              onClick={() =>
                router.push(`/entries/winnerInquiry/detail?id=${item.entryId}`)
              }
            >
              <Text fontSize={'12px'} fontWeight={500} color={ColorGray700}>
                상세보기
              </Text>
            </Flex>
            <Flex
              borderRadius={'6px'}
              borderColor={ColorGray400}
              borderWidth={1}
              px={'15px'}
              pt={'7px'}
              pb={'6px'}
              onClick={() => {
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '선착순 응모 삭제',
                  message: `응모를 삭제 하시겠습니까?`,
                  type: 'confirm',
                  okButtonName: '확인',
                  cbOk: () => {
                    deleteMutate(String(item.entryId));
                    setLoadingModal(true);
                    // window.history.back();
                  },
                });
              }}
            >
              <Text fontSize={'12px'} fontWeight={500} color={ColorGray700}>
                삭제하기
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default EntriesWinnerInquiryCard;
