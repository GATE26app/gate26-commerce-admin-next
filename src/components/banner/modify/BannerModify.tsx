import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import bannerApi from '@/app/apis/banner/BannerApi';
import {
  useBannerCreateMutation,
  useBannerDeleteMutation,
  useBannerModifyMutation,
} from '@/app/apis/banner/BannerApi.mutation';
import { BannerListItemType } from '@/app/apis/banner/BannerApi.type';
import DateComponent from '@/components/banner/add/DateComponent';
import ImageComponent from '@/components/banner/add/ImageComponent';
import LinkComponent from '@/components/banner/add/LinkComponent';
import OrderComponent from '@/components/banner/add/OrderComponent';
import StatusComponent from '@/components/banner/add/StatusComponent';
import TitleComponent from '@/components/banner/add/TitleComponent';
import CustomButton from '@/components/common/CustomButton';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import {
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
function BannerModify() {
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const searchParams = useSearchParams();
  const getBannerId = searchParams.get('id');
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

  const [BannerInfo, setBannerInfo] = useState<BannerListItemType>({
    type: 0,
    level: 0,
    sort: 0,
    title: '',
    target: '',
    openDate: '',
    endDate: '',
    images: [
      {
        imagePath: '',
        thumbnailImagePath: '',
      },
    ],
    bannerId: 0,
    createdDate: '',
    modifiedDate: '',
  });
  //배너상세
  const { data: detailData } = useQuery(
    ['GET_BANNERDETAIL', getBannerId],
    () => bannerApi.getBannersDetail(getBannerId == null ? '0' : getBannerId),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
    },
  );
  const { mutate: ModifyItemMutate, isLoading } = useBannerModifyMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: '배너 수정',
            message: '배너가 수정되었습니다.',
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              router.back();
              // window.history.back();
            },
          });
        } else {
          // ToastComponent('등록에 실패하였습니다.');
          console.log('error 배너 수정 에러', res.code);
        }
      },
    },
  });

  useEffect(() => {
    if (detailData) {
      console.log('detailData', detailData);
      setBannerInfo({
        type: detailData.data.type,
        level: detailData.data.level,
        sort: detailData.data.sort,
        title: detailData.data.title,
        target: detailData.data.target,
        openDate: detailData.data.openDate,
        endDate: detailData.data.endDate,
        images: detailData.data.images,
        bannerId: detailData.data.bannerId,
        createdDate: detailData.data.createdDate,
        modifiedDate: detailData.data.modifiedDate,
      });
    }
  }, [detailData]);
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
      const obj = {
        bannerId: BannerInfo.bannerId,
        data: {
          type: BannerInfo.type,
          level: BannerInfo.level,
          sort: BannerInfo.sort,
          title: BannerInfo.title,
          target: BannerInfo.target,
          openDate: BannerInfo.openDate,
          endDate: BannerInfo.endDate,
          images: BannerInfo.images,
        },
      };
      ModifyItemMutate(obj);
    }
  };

  //배너 삭제
  const { mutate: deleteBannerMutate } = useBannerDeleteMutation({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          router.back();
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
        deleteBannerMutate(BannerInfo.bannerId);
        setLoadingModal(true);
        // window.history.back();
      },
    });
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
                  title: '선착순 응모 수정',
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

        {detailData?.success && (
          <>
            <Flex
              w={'100%'}
              flexDirection={'column'}
              position={'relative'}
              borderRadius={'12px'}
              backgroundColor={'#FAFAFA'}
              borderColor={'#D1D4DD'}
              borderWidth={1}
              px={'32px'}
              py={'30px'}
              mb={'30px'}
            >
              <Flex w={'100%'} alignItems={'center'} gap={'15px'}>
                <Text
                  color={'#1A1A1A'}
                  fontWeight={'semibold'}
                  fontSize={'15px'}
                >
                  등록일
                </Text>
                <Text fontSize={'16px'} color={'#1A1A1A'}>
                  {BannerInfo?.createdDate
                    ? moment(BannerInfo?.createdDate).format('YYYY-MM-DD')
                    : '-'}
                </Text>
              </Flex>
              <Flex
                h={'1px'}
                backgroundColor={'#D1D4DD'}
                w={'100%'}
                my={'15px'}
              ></Flex>
              <Flex w={'100%'} alignItems={'center'} gap={'15px'}>
                <Text
                  color={'#1A1A1A'}
                  fontWeight={'semibold'}
                  fontSize={'15px'}
                >
                  수정일
                </Text>
                <Text fontSize={'16px'} color={'#1A1A1A'}>
                  {BannerInfo?.modifiedDate
                    ? moment(BannerInfo?.modifiedDate).format('YYYY-MM-DD')
                    : '-'}
                </Text>
              </Flex>
            </Flex>
            <Box
            // px={'60px'}
            // pb={'60px'}
            // bgColor={ColorWhite}
            // borderBottomRadius={'16px'}
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
              <Flex justifyContent={'flex-end'}>
                <CustomButton
                  text="삭제하기"
                  borderColor={'#292A2E'}
                  color={'#292A2E'}
                  px="44px"
                  py="13px"
                  bgColor={ColorWhite}
                  fontSize="15px"
                  onClick={() => handleDelete()}
                />
              </Flex>
            </Box>
          </>
        )}
      </Flex>
    </>
  );
}

export default BannerModify;
