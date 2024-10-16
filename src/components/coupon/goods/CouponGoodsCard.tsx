import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorTextGray,
} from '@/utils/_Palette';

import { DashDate, getImagePath, imgPath, intComma } from '@/utils/format';
import ToastComponent from '@/components/common/Toast/ToastComponent';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { CouponDataType } from '@/app/apis/coupon/CouponApi.type';
import { useCouponDeleteMutation } from '@/app/apis/coupon/CouponApi.mutation';

interface headerProps {
  id: string;
  name: string;
  width: string;
}
interface Props {
  header: Array<headerProps>;
  item: CouponDataType;
  index: number;
  pageNo: number;
  totalCount: number;
}
function CouponGoodsCard({ header, item, index, pageNo, totalCount }: Props) {
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
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
  //쿠폰 삭제
  const { mutate: deleteMutate } = useCouponDeleteMutation({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          setGoodsInfo({
            goodsCouponState: true,
          });
          // router.back();
          ToastComponent('쿠폰이 삭제되었습니다.');
        } else {
          ToastComponent('삭제 되지 않았습니다.');
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
            {item.levelName}
          </Text>
        </Flex>
        <Flex
          w={header[2]?.width}
          alignItems={'flex-start'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Flex gap={'10px'} ml={'10px'}>
            <Box
              flexShrink={0}
              borderRadius={'10px'}
              width={'60px'}
              height={'60px'}
              overflow={'hidden'}
            >
              <Image
                src={
                  item?.itemRef.item?.images.length > 0
                    ? getImagePath(
                        item.itemRef.item?.images[0]?.thumbnailImagePath,
                      )
                    : '/images/header/icon_header_user.png'
                }
                width={'60px'}
                height={'60px'}
                objectFit={'cover'}
                alt="파트너사 이미지"
              />
            </Box>
            <Flex flexDirection={'column'}>
              <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
                {item.itemRef?.item?.title}
              </Text>
              <Text
                color={ColorTextGray}
                fontWeight={400}
                fontSize={'12px'}
                textDecoration={'line-through'}
              >
                {intComma(item.itemRef?.item.priceNet)}원
              </Text>
              <Flex>
                <Text color={ColorRed} fontWeight={600} fontSize={'14px'}>
                  {item.itemRef?.item.priceDcPer}%
                </Text>
                <Text color={ColorBlack} fontWeight={700} fontSize={'14px'}>
                  {intComma(item.itemRef?.item.price)}원
                </Text>
              </Flex>
            </Flex>
          </Flex>
          {/* <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
            {item.title}
          </Text> */}
        </Flex>
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
        <Flex
          w={header[4]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.dcType == 1
              ? `${intComma(item.priceDc)}원`
              : `${item.percentDc}%`}
          </Text>
        </Flex>
        <Flex
          w={header[5]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {DashDate(item.startDate)}
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            ~{DashDate(item.endDate)} 까지
          </Text>
        </Flex>

        <Flex
          w={header[6]?.width}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <Flex
              borderRadius={'6px'}
              borderColor={ColorGray400}
              borderWidth={1}
              px={'15px'}
              py={'7px'}
              cursor={'pointer'}
              onClick={() =>
                router.push(`/coupon/goods/detail?id=${item.couponId}`)
              }
            >
              <Text fontSize={'12px'} fontWeight={500} color={ColorGray700}>
                수정하기
              </Text>
            </Flex>
            <Flex
              borderRadius={'6px'}
              borderColor={ColorGray400}
              borderWidth={1}
              px={'15px'}
              py={'7px'}
              cursor={'pointer'}
              onClick={() => {
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '쿠폰 응모 삭제',
                  message: `쿠폰을 삭제 하시겠습니까?`,
                  type: 'confirm',
                  okButtonName: '확인',
                  cbOk: () => {
                    deleteMutate(String(item.couponId));
                    setLoadingModal(true);
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

export default CouponGoodsCard;
