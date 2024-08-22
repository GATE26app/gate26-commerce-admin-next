import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useToast,
} from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';

import styled from '@emotion/styled';
import {
  ColoLineGray,
  ColorBlack,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorGrayBorder,
  ColorInputBorder,
  ColorWhite,
} from '@/utils/_Palette';
import ButtonModal from './ButtonModal';
import ReviewGoodsInfo from './review/ReviewGoodsInfo';
import SelectBox from '../SelectBox/SelectBox';
import './reviewStyle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from 'react-query';
import reviewApi from '@/app/apis/review/ReviewApi';
import { formatDateDash, imgPath } from '@/utils/format';
import {
  useDeleteReviewCommentMutation,
  useDeleteReviewMutation,
  useReviewShowMutation,
} from '@/app/apis/review/ReviewApi.mutation';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
interface AlertModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  reviewId: string;

  // onSubmit: (text: string) => void;
  // title: string;
  // info?: InfoProps;
}

function ReviewModal({
  onClose,
  reviewId,
  // onSubmit,
  ...props
}: AlertModalProps) {
  const toast = useToast();
  const [reload, setReload] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'confirm',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const StateArr = ['노출', '노출안함', '블라인드'];
  const [select, setSelect] = useState('');

  //리뷰 상세
  const {
    data: ReviewData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ['orderItem', String(reviewId)],
    () => reviewApi.getReviewDetail(String(reviewId)),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!reviewId,
    },
  );

  useEffect(() => {
    if (ReviewData) {
      setSelect(ReviewData?.data.review.levelName);
    }
  }, [ReviewData]);

  //리뷰 노출 여부
  const { mutate: showReviewMutate } = useReviewShowMutation({
    options: {
      onSuccess: (res) => {
        if (res.success) {
          onClose();
          toast({
            position: 'top',
            duration: 2000,
            status: 'success',
            description: '노출상태가 변경되었습니다.',
            // render: () => (
            //   <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            //     {'노출상태가 변경되었습니다.'}
            //   </Box>
            // ),
          });
          setGoodsInfo({
            reviewState: true,
          });
        } else {
          setSelect(String(ReviewData?.data.review.levelName));
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
        }
      },
    },
  });

  const changeReviewState = (data: string) => {
    if (data == '노출') {
      const obj = {
        reviewId: reviewId,
        state: 'show',
      };
      showReviewMutate(obj);
    } else if (data == '노출안함') {
      const obj = {
        reviewId: reviewId,
        state: 'hide',
      };
      showReviewMutate(obj);
    } else if (data == '블라인드') {
      const obj = {
        reviewId: reviewId,
        state: 'blind',
      };
      showReviewMutate(obj);
    }
  };

  //리뷰 댓글 삭제
  const { mutate: deleteReplyMutate } = useDeleteReviewCommentMutation({
    options: {
      onSuccess: (res) => {
        setReload(true);
        // setList(res.data);
        // setGoodsInfo({
        //   reviewState: false,
        // });
      },
    },
  });

  useEffect(() => {
    //reload 가 true일때 (댓글 작성시) 재시작
    if (reload) {
      refetch();
      setTimeout(() => {
        //1초후 false처리
        setReload(false);
      }, 1000);
    }
  }, [reload]);

  return (
    <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      <ModalOverlay />
      <Content maxW={1024} h={760} overflowX={'auto'}>
        <Header>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={'17px'}
            mt={'30px'}
          >
            <Text fontSize={'18px'} fontWeight={700} color={ColorBlack}>
              리뷰 상세
            </Text>
            <Image
              src={'/images/Page/ico_modal_close.png'}
              width={'20px'}
              height={'20px'}
              alt="모달 close"
              onClick={onClose}
            />
          </Flex>
        </Header>
        <ModalBody>
          <Flex
            flexDirection={'row'}
            borderBottomColor={ColoLineGray}
            borderBottomWidth={1}
            pb={'20px'}
            mb={'34px'}
            alignItems={'center'}
          >
            <Text
              color={ColorBlack}
              fontWeight={600}
              fontSize={'15px'}
              w={'92px'}
              flexShrink={0}
            >
              노출상태
            </Text>
            <SelectBox
              placeholder="노출상태"
              width={'170px'}
              list={StateArr}
              select={select}
              setSelect={setSelect}
              onClick={(data: string) => {
                setSelect(data);
                changeReviewState(data);
                // setEntriesData({ ...EntriesData, winnerCnt: Number(data) });
              }}
            />
          </Flex>
          {ReviewData?.data !== undefined && (
            <ReviewGoodsInfo data={ReviewData?.data} />
          )}

          {/* 리뷰 내역 */}

          <Flex flexDirection={'column'} pt={'30px'} pb={'20px'}>
            <Flex pb={'10px'}>
              <Text
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                w={'150px'}
              >
                작성일
              </Text>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {ReviewData?.data?.review.writeDate !== null
                  ? formatDateDash(ReviewData?.data.review.writeDate)
                  : '-'}
              </Text>
            </Flex>
            <Flex pb={'10px'}>
              <Text
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                w={'150px'}
              >
                작성자
              </Text>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {ReviewData?.data.user.nickName}
              </Text>
            </Flex>
            <Flex>
              <Text
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                w={'150px'}
              >
                별점
              </Text>
              <Flex alignItems={'center'} gap={'5px'}>
                <Image
                  width={'14px'}
                  height={'14px'}
                  src={'/images/Page/ico_star_on.png'}
                  alt="데이터 없음"
                />
                <Text color={ColorBlack} fontWeight={400} fontSize={'14px'}>
                  {ReviewData?.data.review.star}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex pb={'30px'}>
            <Swiper
              pagination={true}
              // pagination={pagination}
              modules={[Pagination]}
              className="mySwiper"
            >
              {ReviewData?.data?.review?.images !== undefined &&
                ReviewData?.data?.review?.images.length > 0 &&
                ReviewData?.data?.review?.images.map((item) => {
                  return (
                    <SwiperSlide>
                      <Box borderRadius={'12px'} overflow={'hidden'}>
                        <Image
                          width={'100%'}
                          src={imgPath() + item.imagePath}
                        />
                      </Box>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </Flex>
          <Flex>
            <Text>{ReviewData?.data.review.content}</Text>
          </Flex>

          {/* 답변 */}
          <Flex flexDirection={'column'} mt={'40px'}>
            {ReviewData?.data?.review?.replyContent && (
              <Flex flexDirection={'column'}>
                <Flex
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Text fontSize={'15px'} fontWeight={600} color={ColorBlack}>
                    파트너사명
                  </Text>
                  <Box
                    borderWidth={1}
                    borderColor={ColorInputBorder}
                    px={'20px'}
                    py={'5px'}
                    borderRadius={'6px'}
                    onClick={() => {
                      setOpenAlertModal(true);
                      setModalState({
                        ...ModalState,
                        title: '댓글 삭제',
                        message: '댓글을 삭제하시곘습니까?',
                        type: 'alert',
                        okButtonName: '확인',
                        cbOk: () => {
                          deleteReplyMutate(reviewId);
                          // onDeleteImg(1);
                          // window.history.back();
                        },
                      });
                    }}
                  >
                    <Text
                      color={ColorGray700}
                      fontWeight={400}
                      fontSize={'12px'}
                    >
                      삭제
                    </Text>
                  </Box>
                </Flex>
                <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                  {ReviewData?.data?.review?.replyContent}
                </Text>
              </Flex>
            )}
          </Flex>
        </ModalBody>
        <Flex
          zIndex={99}
          // mx={'30px'}
          pb={'40px'}
          pt={'20px'}
          alignItems={'center'}
          justifyContent={'center'}
          // flexDirection={'column'}
          position={'sticky'}
          bottom={0}
          backgroundColor={ColorWhite}
          gap={'10px'}
        >
          <CustomButton
            text="목록"
            px="116px"
            bgColor={ColorWhite}
            borderColor={ColorGray900}
            fontSize="16px"
            color={ColorGray900}
            py="15px"
            fontWeight={700}
            onClick={onClose}
          />
          <CustomButton
            text="저장"
            px="116px"
            bgColor={ColorGray900}
            borderColor={ColorGray900}
            fontSize="16px"
            color={ColorWhite}
            py="15px"
            fontWeight={700}
            // onClick={handleClickOK}
          />
        </Flex>
      </Content>
    </Modal>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 0px 30px 0px;
    border-radius: 10px;
    .chakra-modal {
      &__header {
        padding: 0px 24px;
        text-align: center;
        /* color: #ff5942; */
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        letter-spacing: -0.02em;
      }
      &__body {
        /* padding: 10px 20px 20px 20px; */
        /* text-align: center; */
        /* white-space: break-spaces; */
        /* color: #757983; */

        /* font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 27px;
        letter-spacing: -0.02em; */
      }
      &__footer {
        padding: 0;
        display: flex;
        background-color: '#292A2E';
        /* justify-content: space-between; */
        .button {
          cursor: pointer;

          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: '10px';
          color: #292a2e;
          border: 1px solid '#292A2E';
          font-family: 'Pretendard';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 27px;
          letter-spacing: -0.02em;
        }
      }
    }
  }
`;
const Header = styled(ModalHeader)`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 99;
  /* padding-top: 30px; */
  /* height: 95px; */
`;
export default ReviewModal;
