import Image from 'next/image';
import React, { SyntheticEvent, useState } from 'react';
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
import { formatDateDot, imgPath } from '@/utils/format';
import ReviewModal from '../common/Modal/ReviewModal';
import { useDeleteReviewMutation } from '@/app/apis/review/ReviewApi.mutation';
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
function ReviewCard({ header, item, index, pageNo, totalCount }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [reviewModal, setReviewModal] = useState(false);
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

  // const { openCustomModal } = useCustomModalHandlerContext();
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);

  //리뷰 삭제
  const { mutate: deleteReviewMutate } = useDeleteReviewMutation({
    options: {
      onSuccess: (res) => {
        console.log('리뷰 삭제 res', res);
        setLoadingModal(false);
        if (res.success == true) {
          setGoodsInfo({
            reviewState: true,
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
          // console.log('error 상품 생성 에러', res.code);
        }
        // setList(res.data);
        // setGoodsInfo({
        //   reviewState: false,
        // });
      },
    },
  });
  const handleDelete = () => {
    console.log('삭제모달');
    setOpenAlertModal(true);
    setModalState({
      ...ModalState,
      title: '리뷰 삭제',
      message: '삭제하시겠습니까?',
      type: 'confirm',
      okButtonName: '확인',
      cbOk: () => {
        deleteReviewMutate(item.review.reviewId);
        setLoadingModal(true);
        // window.history.back();
      },
    });
  };
  return (
    <>
      {reviewModal && (
        <ReviewModal
          isOpen={reviewModal}
          onClose={() => setReviewModal(false)}
          reviewId={item.review?.reviewId}
          // onSubmit={onSubmitCancel}
        />
      )}
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      <Flex
        minW={'1550px'}
        flexDirection={'row'}
        justifyContent={'center'}
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
            {/* {item.itemCode} */}
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
            w={'80px'}
            minWidth={'80px'}
            h={'80px'}
            borderRadius={'10px'}
            position={'relative'}
            overflow={'hidden'}
            ml={'10px'}
          >
            <img
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
              }}
              src={
                item.orderThumbnailImagePath !== null ||
                item.orderThumbnailImagePath !== ''
                  ? `${imgPath()}${item.orderThumbnailImagePath}`
                  : '/images/no_img.png'
              }
              onError={addDefaultImg}
              alt="이미지 업로드"
            />
          </Box>
          {/* 상품정보 */}
          <Flex flexDirection={'column'}>
            <Flex mb={'5px'} flexDirection={'row'} flexShrink={0}>
              <Text
                color={ColorBlack}
                fontSize={'14px'}
                fontWeight={600}
                flexShrink={0}
                mr={'10px'}
              >
                {item.orderCategoryTitle}
              </Text>
              <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
                {item.orderTitle}
              </Text>
            </Flex>
            <Flex gap={'10px'} flexShrink={0}>
              <Text
                flexShrink={0}
                color={ColorGray700}
                fontWeight={600}
                fontSize={'14px'}
                w={'50px'}
              >
                예약일
              </Text>
              <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
                {item.orderDateTimeOfUse !== undefined
                  ? formatDateDot(item.orderDateTimeOfUse)
                  : '-'}
              </Text>
            </Flex>
            <Flex gap={'10px'}>
              <Text
                color={ColorGray700}
                fontWeight={600}
                fontSize={'14px'}
                w={'49px'}
              >
                선택옵션
              </Text>
              <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
                {item.orderOptionTitle} * {item.orderCnt}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w={header[2]?.width} gap={'10px'}>
          <Box
            w={'80px'}
            minWidth={'80px'}
            h={'80px'}
            borderRadius={'10px'}
            position={'relative'}
            overflow={'hidden'}
            ml={'10px'}
          >
            <img
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
              }}
              src={
                item.review?.images.length > 0
                  ? `${imgPath()}${item.review?.images[0].thumbnailImagePath}`
                  : '/images/no_img.png'
              }
              onError={addDefaultImg}
              alt="이미지 업로드"
            />
          </Box>
          {/* 상품정보 */}
          <Flex flexDirection={'column'}>
            <Text
              color={ColorGray700}
              fontSize={'14px'}
              fontWeight={400}
              wordBreak={'break-word'}
              overflow={'hidden'}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {item.review.content}
            </Text>
            <Flex gap={'5px'} flexShrink={0} alignItems={'center'}>
              <Image
                width={14}
                height={14}
                src={'/images/Page/ico_star_on.png'}
                alt="데이터 없음"
              />
              <Text color={ColorBlack} fontWeight={400} fontSize={'14px'}>
                {item.review.star}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* 결제정보 */}
        <Flex
          w={header[3]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
            {item.user.nickName}
          </Text>
        </Flex>
        {/* 예약자정보 */}
        <Flex
          w={header[4]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Flex flexDirection={'column'} alignItems={'center'}>
            <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
              {item.review.writeDate !== undefined
                ? formatDateDot(item.review.writeDate)
                : '-'}
            </Text>
          </Flex>
        </Flex>
        <Flex
          w={header[5]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'10px'}
        >
          {item.review?.replyDate !== null ? (
            <Flex
              borderRadius={'5px'}
              backgroundColor={ColorRed50}
              px={'6px'}
              py={'4px'}
            >
              <Text fontSize={'14px'} fontWeight={600} color={ColorRed}>
                답변완료
              </Text>
            </Flex>
          ) : (
            <Flex
              borderRadius={'5px'}
              backgroundColor={ColorGray500}
              px={'6px'}
              py={'4px'}
            >
              <Text fontSize={'14px'} fontWeight={600} color={ColorBlack}>
                미답변
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex
          w={header[6]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Flex flexDirection={'column'} alignItems={'center'}>
            <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
              {item.review.levelName}
            </Text>
          </Flex>
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
            onClick={() => setReviewModal(true)}
          >
            <Text fontSize={'12px'} fontWeight={500} color={ColorGray700}>
              상세보기
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

export default ReviewCard;
