import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

// import { useGoodsDeleteMutation } from '@/apis/goods/GoodsApi.mutation';
import { customModalSliceAction } from '@/features/customModal/customModalSlice';

import CustomButton from '@/components/common/CustomButton';

import {
  ColorBlack,
  ColorBlue,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import { DataTableHeaderProps, ListProps } from './PartnerDataTable';
import GoodsItemCard from './GoodsItemCard';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useGoodsDeleteMutation } from '@/app/apis/goods/GoodsApi.mutation';
import { useRouter } from 'next/navigation';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import PartnerItemCard from './PartnerItemCard';
import SelectBox from '@/components/common/SelectBox/SelectBox';

// import { useGoodsStateZuInfo } from '_store/StateZuInfo';
// import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface Props {
  header: Array<DataTableHeaderProps>;
  // item: any ;
  // index: number;
  // pageNo: number;
  // totalCount: number;
  // setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
function PartnerPayCard({
  header,
  // item,
  // index,
  // pageNo,
  // totalCount,
  // setOnSubmit,
}: Props) {
  // const dispatch = useDispatch();
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

  // const { openCustomModal } = useCustomModalHandlerContext();
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  // const { mutate: deleteMutate, isLoading } = useGoodsDeleteMutation({
  //   options: {
  //     onSuccess: (res) => {
  //       setLoadingModal(false);
  //       if (res.success == true) {
  //         setGoodsInfo({
  //           goodState: true,
  //         });
  //       } else {
  //         toast({
  //           position: 'top',
  //           duration: 3000,
  //           render: () => (
  //             <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
  //               {'삭제가 되지 않았습니다.'}
  //             </Box>
  //           ),
  //         });
  //         // console.log('error 상품 생성 에러', res.code);
  //       }
  //     },
  //   },
  // });
  const handleDelete = (itemCode: string, itemId: string) => {
    const body = {
      itemCode: itemCode,
      itemId: itemId,
    };
    setOpenAlertModal(true);
    setModalState({
      ...ModalState,
      title: '상품 삭제',
      message: '삭제하시겠습니까?',
      type: 'confirm',
      okButtonName: '확인',
      cbOk: () => {
        deleteMutate(body);
        setLoadingModal(true);
        // window.history.back();
      },
    });
    // dispatch(
    //   customModalSliceAction.setMessage({
    //     title: '상품 삭제',
    //     message: `삭제하시겠습니까?`,
    //     type: 'confirm',
    //     okButtonName: '삭제',
    //     cbOk: () => {
    //       deleteMutate(body);

    //       // setOnSubmit(true);
    //       // setSelectState(type);
    //       // removeAdminInfo(row.userId as string);
    //     },
    //   }),
    // );
    // openCustomModal();
  };
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
        minW={'900px'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        py={'20px'}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
      >
        <Flex
          w={`${header[0]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {/* {item.itemCode} */}
            1
          </Text>
        </Flex>
        <Flex
          w={`${header[1]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            국내
          </Text>
        </Flex>
        <Flex
          w={`${header[2]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            파트너사명
          </Text>
        </Flex>
        <Flex
          w={`${header[3]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            id12345@navewr.com
          </Text>
        </Flex>

        <Flex
          w={`${header[4]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            김이름
          </Text>
        </Flex>
        <Flex
          w={`${header[5]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            01012345678
          </Text>
        </Flex>
        <Flex
          w={`${header[6]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={'bold'} color={ColorBlack}>
            승인
          </Text>
        </Flex>

      </Flex>
    </>
  );
}

export default PartnerPayCard;
