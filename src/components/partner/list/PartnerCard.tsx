import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
import moment from 'moment';
import { DataTableHeaderProps, ListProps } from './PartnerDataTable';
import GoodsItemCard from './GoodsItemCard';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useGoodsDeleteMutation } from '@/app/apis/goods/GoodsApi.mutation';
import { useRouter } from 'next/navigation';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import PartnerItemCard from './PartnerItemCard';
import SelectBox from '@/components/common/SelectBox/SelectBox';
import { PartnersParamsType } from '@/app/apis/partners/PartnersApi.type';
import {
  useItemApprovePartner,
  useItemRejectPartner,
  useItemResignPartner,
  useItemRestorePartner,
  useItemStopPartner,
} from '@/app/apis/partners/PartnersApi.mutation';

// import { useGoodsStateZuInfo } from '_store/StateZuInfo';
// import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface Props {
  header: Array<DataTableHeaderProps>;
  item: PartnersParamsType;
  index: number;
  pageNo: number;
  totalCount: number;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
function PartnerCard({
  header,
  item,
  index,
  pageNo,
  totalCount,
  setOnSubmit,
}: Props) {
  // const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [select, setSelect] = useState(['정상', '정지']);
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

  useEffect(() => {
    if (item) {
      if (item.level == 3) {
        setSelect(['정상', '정지', '탈퇴']);
      }
    }
  }, [item]);

  const { mutate: PartnerApprove } = useItemApprovePartner({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          toast({ description: '링크가 복사되었습니다.', status: 'success' });
          setGoodsInfo({
            partnerState: true,
          });
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
          // console.log('error 상품 생성 에러', res.code);
        }
      },
    },
  });

  //반려
  const { mutate: PartnerReject } = useItemRejectPartner({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          setGoodsInfo({
            partnerState: true,
          });
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
          // console.log('error 상품 생성 에러', res.code);
        }
      },
    },
  });

  //정지
  const { mutate: PartnerStop } = useItemStopPartner({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          toast({ description: '정지 처리되었습니다.', status: 'success' });
          setGoodsInfo({
            partnerState: true,
          });
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
          // console.log('error 상품 생성 에러', res.code);
        }
      },
    },
  });

  //탈퇴
  const { mutate: PartnerResign } = useItemResignPartner({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          toast({ description: '탈퇴 처리되었습니다.', status: 'success' });
          setGoodsInfo({
            partnerState: true,
          });
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
          // console.log('error 상품 생성 에러', res.code);
        }
      },
    },
  });

  //반려
  const { mutate: PartnerRestore } = useItemRestorePartner({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          toast({ description: '정상 처리되었습니다.', status: 'success' });
          setGoodsInfo({
            partnerState: true,
          });
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
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
        minW={'1340px'}
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
            {totalCount - (pageNo - 1) * 10 - index}
          </Text>
        </Flex>
        <Flex
          w={`${header[1]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.typeName}
          </Text>
        </Flex>
        <Flex
          w={`${header[2]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.title}
          </Text>
        </Flex>
        <Flex
          w={`${header[3]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.loginId}
          </Text>
        </Flex>

        <Flex
          w={`${header[4]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.nameOfRepresentative}
          </Text>
        </Flex>
        <Flex
          w={`${header[5]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text
            fontSize={'14px'}
            fontWeight={400}
            color={ColorBlack}
            textAlign={'center'}
          >
            {item.type == 1 ? item.hp : item.authEmail}
          </Text>
        </Flex>
        <Flex
          w={`${header[6]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text
            fontSize={'14px'}
            fontWeight={'bold'}
            color={
              item.level == 1
                ? ColorBlue
                : item.level == 2
                ? ColorBlack
                : ColorRed
            }
          >
            {item.levelName}
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          w={`${header[7]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text
            fontSize={'14px'}
            fontWeight={400}
            color={ColorBlack}
            textAlign={'center'}
          >
            {item.requestDate
              ? moment(item.requestDate).format('YYYY-MM-DD')
              : '-'}
          </Text>
          <Text
            fontSize={'14px'}
            fontWeight={400}
            color={ColorBlack}
            textAlign={'center'}
          >
            {item.processDate
              ? moment(item.processDate).format('YYYY-MM-DD')
              : '-'}
          </Text>
        </Flex>
        {/* <Flex
          w={`${header[8]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={'bold'} color={ColorRed}>
            {item.statusName}
          </Text>
        </Flex> */}
        {/* <Flex
          w={`${header[8]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack} textAlign={'center'}>
          {item.modifiedDate ? moment(item.modifiedDate).format('YYYY-MM-DD') : '-'}
          {item.processDate ? moment(item.processDate).format('YYYY-MM-DD') : '-'}
          </Text>
        </Flex> */}
        <Flex
          w={`${header[8]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
          zIndex={999}
        >
          <SelectBox
            placeholder="정상"
            width={'120px'}
            list={select}
            select={item.statusName}
            setSelect={(e) => {
              console.log(e);
              if (e == '정지') {
                PartnerStop({
                  partnerId: item.partnerId,
                  adminMemo: '',
                });
              } else if (e == '정상') {
                PartnerRestore({
                  partnerId: item.partnerId,
                  adminMemo: '',
                });
              } else if (e == '탈퇴') {
                PartnerResign({
                  partnerId: item.partnerId,
                  adminMemo: '',
                });
              }
            }}
          />
        </Flex>
        <Flex
          w={`${header[9]?.width}%`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CustomButton
            text="상세보기"
            px="15px"
            py="7.5px"
            fontSize="15px"
            color={ColorGray700}
            borderColor={ColorGray400}
            bgColor={ColorWhite}
            onClick={() =>
              router.push(`/partner/detail?partnerId=${item.partnerId}`)
            }
          />
        </Flex>
      </Flex>
    </>
  );
}

export default PartnerCard;
