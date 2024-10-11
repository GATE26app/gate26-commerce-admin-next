import Image from 'next/image';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

// import { useGoodsDeleteMutation } from '@/apis/goods/GoodsApi.mutation';
import { customModalSliceAction } from '@/features/customModal/customModalSlice';

import CustomButton from '@/components/common/CustomButton';

import {
  ColorBlack,
  ColorGray400,
  ColorGray500,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorRed50,
  ColorWhite,
} from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useGoodsDeleteMutation } from '@/app/apis/goods/GoodsApi.mutation';
import { useRouter } from 'next/navigation';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import { DashDate, formatDateDot, getImagePath, imgPath } from '@/utils/format';
import ReviewModal from '../common/Modal/ReviewModal';
import { useDeleteReviewMutation } from '@/app/apis/review/ReviewApi.mutation';
import SelectBox from '../common/SelectBox';
import {
  useBannerDeleteMutation,
  useBannerHideMutation,
  useBannerShowMutation,
} from '@/app/apis/banner/BannerApi.mutation';

interface DataTableHeaderProps {
  name: string;
  width: number;
}
interface Props {
  header: Array<DataTableHeaderProps>;
  item: any;
  index: number;
  pageNo: number;
  totalCount: number;
}
function BannerCard({ header, item, index, pageNo, totalCount }: Props) {
  const router = useRouter();
  const toast = useToast();
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };
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
  const [show, setShow] = useState('');
  useEffect(() => {
    if (item) {
      setShow(item.levelName);
    }
  }, [item]);

  // const { openCustomModal } = useCustomModalHandlerContext();
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);

  //배너 노출상태 변경
  const { mutate: changeShowMutate } = useBannerShowMutation({
    options: {
      onSuccess: (res) => {
        console.log('res', res);
        setLoadingModal(false);
        if (res.success == true) {
          setGoodsInfo({
            bannerState: true,
          });
        }
      },
    },
  });
  //배너 노출상태 변경
  const { mutate: changeHideMutate } = useBannerHideMutation({
    options: {
      onSuccess: (res) => {
        console.log('res', res);
        setLoadingModal(false);
        if (res.success == true) {
          setGoodsInfo({
            bannerState: true,
          });
        }
      },
    },
  });
  //배너 삭제
  const { mutate: deleteBannerMutate } = useBannerDeleteMutation({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          setGoodsInfo({
            bannerState: true,
          });
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'삭제가 되지 않았습니다.'}
              </Box>
            ),
          });
        }
      },
    },
  });
  const handleDelete = () => {
    setOpenAlertModal(true);
    setModalState({
      ...ModalState,
      title: '배너 삭제',
      message: '삭제하시겠습니까?',
      type: 'confirm',
      okButtonName: '확인',
      cbOk: () => {
        deleteBannerMutate(item.bannerId);
        setLoadingModal(true);
        // window.history.back();
      },
    });
  };

  return (
    <>
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      <Flex
        minW={'1340px'}
        flexDirection={'row'}
        // justifyContent={'center'}
        py={'20px'}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
      >
        <Flex
          w={`${header[0]?.width}`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {totalCount - (pageNo - 1) * 10 - index}
          </Text>
        </Flex>
        <Flex
          w={header[1]?.width}
          flexDirection={'row'}
          gap={'5px'}
          cursor={'pointer'}
        >
          <Box
            w={'100%'}
            // minWidth={'233px'}
            h={'80px'}
            borderRadius={'10px'}
            position={'relative'}
            overflow={'hidden'}
            ml={'10px'}
          >
            <img
              style={{
                width: '100%',
                height: '80px',
                objectFit: 'cover',
              }}
              src={
                item.images[0].imagePath !== null ||
                item.images[0].imagePath !== ''
                  ? getImagePath(item.images[0].imagePath)
                  : '/images/no_img.png'
              }
              onError={addDefaultImg}
              alt="이미지 업로드"
            />
          </Box>
        </Flex>
        <Flex
          w={`${header[2]?.width}`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.title}
          </Text>
        </Flex>
        <Flex
          w={`${header[3]?.width}`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {DashDate(item.createdDate)}
          </Text>
        </Flex>
        <Flex
          w={`${header[4]?.width}`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.sort + 1}
          </Text>
          {/* <SelectBox
            placeholder="검색분류선택"
            width={'113px'}
            list={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            select={'1'}
            setSelect={(item) => {}}
          /> */}
        </Flex>
        <Flex
          w={`${header[5]?.width}`}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {DashDate(item.openDate)}~
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {DashDate(item.endDate)}
          </Text>
        </Flex>
        <Flex
          w={`${header[6]?.width}`}
          alignItems={'center'}
          justifyContent={'center'}
          zIndex={9999}
        >
          <SelectBox
            placeholder="검색분류선택"
            width={'113px'}
            list={['노출', '비노출']}
            select={show}
            className={'custom_select'}
            setSelect={(data) => {
              if (data == '노출') {
                changeShowMutate(item.bannerId);
              } else {
                changeHideMutate(item.bannerId);
              }
            }}
          />
        </Flex>
        <Flex
          w={header[7]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Flex
            px={'15px'}
            py={'7px'}
            borderRadius={'6px'}
            mb={'6px'}
            borderWidth={1}
            borderColor={ColorInputBorder}
            onClick={() => router.push(`/banner/modify?id=${item.bannerId}`)}
          >
            <Text fontSize={'12px'} fontWeight={500} color={ColorGray700}>
              수정하기
            </Text>
          </Flex>
          <Flex
            px={'15px'}
            py={'7px'}
            borderRadius={'6px'}
            borderWidth={1}
            borderColor={ColorInputBorder}
            cursor={'pointer'}
            onClick={() => handleDelete()}
          >
            <Text fontSize={'12px'} fontWeight={500} color={ColorGray700}>
              삭제하기
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default BannerCard;
