'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Box, Flex, Image, Text, useToast, Grid, GridItem, Textarea } from '@chakra-ui/react';

// import goodsApi from '@/apis/goods/GoodsApi';
import { usePatchUpdateGoodsStatusMutation } from '@/app/apis/goods/GoodsApi.mutation';
import moment from 'moment';
import {
  CategoryResProps,
  GoodsAttributeListProps,
  GoodsBasicProps,
  GoodsListItemImageProps,
  GoodsPoliciesListProps,
  GoodsSchedulesListProps,
  LocationResProps,
  OptionProps,
  PatchUpdateGoodsStatusParmaType,
  optionInputsProps,
} from '@/app/apis/goods/GoodsApi.type';

import {
  ColoLineGray,
  ColorBlack,
  ColorBlack00,
  ColorDataTableBorderTop,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorRequireRed,
  ColorWhite,
} from '@/utils/_Palette';

import goodsApi from '@/app/apis/goods/GoodsApi';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import RadioComponent from '@/components/common/CustomRadioButton/RadioComponent';
import PartnerImageComponent from './PartnerImageComponents';
import { useForm } from "react-hook-form";
import SelectBox from '@/components/common/SelectBox/SelectBox';
import { AdminStatusInputType, PartnersParamsType } from '@/app/apis/partners/PartnersApi.type';
import { useItemResignPartner, useItemRestorePartner, useItemStopPartner } from '@/app/apis/partners/PartnersApi.mutation';

function PartnerConnectInfo({
  info
}: {
  info: PartnersParamsType;
}) {
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const [check, setCheck] = useState(1);
  const [select, setSelect] = useState(['정상', '정지']);

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<AdminStatusInputType>();
  const onSubmit = (data:any) => console.log(data);

  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  
  useEffect(() => {
    if(info){
      setValue('status', info.status);
      setValue('adminMemo', info.adminMemo);

      if(info.status == 3){
        setSelect(['정상', '정지', '탈퇴']);
      }
    }
  }, [info]);

  //정지
  const { mutate: PartnerStop } = useItemStopPartner({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          toast({ description: '정지 처리되었습니다.', status: 'success' });
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
        }
      },
    },
  });

  // 정상
  const { mutate: PartnerRestore } = useItemRestorePartner({
    options: {
      onSuccess: (res) => {
        setLoadingModal(false);
        if (res.success == true) {
          toast({ description: '정상 처리되었습니다.', status: 'success' });
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
      {info && (
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
      <Flex mt={'30px'} flexDirection={'column'}>
        <Text fontWeight={'semibold'} fontSize={'18px'} color={ColorBlack}>기본정보</Text>
        <Flex w={'100%'} h={'2px'} bgColor={ColorDataTableBorderTop} mt={'10px'} mb={'30px'}></Flex>
        <Flex flexDirection={'row'} pb={'20px'} width={'100%'}>
          <Text
              w={'165px'}
              flexShrink={0}
              color={ColorBlack}
              fontWeight={600}
              fontSize={'15px'}
              display={'inline'}
            >
              관리자 메모
          </Text>
          <Flex flexDirection={'column'} width={'100%'}>
            <Textarea
              placeholder="상세설명을 입력해주세요."
              _placeholder={{ color: ColorGray700 }}
              color={ColorBlack}
              borderColor={ColorGray400}
              onChange={(e) => {setValue('adminMemo', e.target.value)}}
              maxLength={500}
              height={150}
              value={watch('adminMemo')}
              disabled={''}
              {...register('adminMemo')}
            />
          </Flex>
        </Flex>
        <Grid templateColumns='repeat(2, 1fr)'>
          <GridItem>
          <Flex flexDirection={'row'} pb={'20px'} alignItems={'center'}>
            <Text
              w={'165px'}
              flexShrink={0}
              color={ColorBlack}
              fontWeight={600}
              fontSize={'15px'}
              // mb={'20px'} // error 있을 때
            >
              가입일시
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.createdDate ? moment(info.createdDate).format('YYYY-MM-DD') : '-'}
            </Text>
          </Flex>
          </GridItem>
          <GridItem>
          <Flex flexDirection={'row'} pb={'20px'} alignItems={'center'}>
            <Text
              w={'165px'}
              flexShrink={0}
              color={ColorBlack}
              fontWeight={600}
              fontSize={'15px'}
              // mb={'20px'} // error 있을 때
            >
              로그인 일시
            </Text>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {info.loginDate ? moment(info.loginDate).format('YYYY-MM-DD') : '-'}
            </Text>
          </Flex>
          </GridItem>
        </Grid>
        <Flex flexDirection={'row'} pb={'20px'} width={'48%'}>
          <Text
            w={'165px'}
            flexShrink={0}
            color={ColorBlack}
            fontWeight={600}
            fontSize={'15px'}
          >
            회원상태
          </Text>
          <Flex w={'100%'}>
          <SelectBox
              placeholder="검색분류선택"
              width={'100%'}
              list={select}
              select={watch('status') == 1 ? '정상' : watch('status') == 2 ? '정지' : watch('status') == 3 ? '탈퇴요청' : '탈퇴'}
              setSelect={(e) => {
                if(e == '정상'){
                  setValue('status', 1);
                } else if(e == '정지'){
                  setValue('status', 2);
                } else if(e == '탈퇴'){
                  setValue('status', 10);
                }
              }}
            />
          </Flex>
        </Flex>
        <Flex flexDirection={'row'} pb={'20px'}>
          <Text
            w={'165px'}
            flexShrink={0}
            color={ColorBlack}
            fontWeight={600}
            fontSize={'15px'}
          >
            탈퇴요청일시
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
          {info.resignRequestDate ? moment(info.resignRequestDate).format('YYYY-MM-DD') : '-'}
          </Text>
        </Flex>
        <Flex flexDirection={'row'} pb={'20px'} width={'50%'}>
          <Text
            w={'165px'}
            flexShrink={0}
            color={ColorBlack}
            fontWeight={600}
            fontSize={'15px'}
          >
            탈퇴요청사유
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {info.resignRequestReason ? info.resignRequestReason : '-'}
          </Text>
        </Flex>
        
        <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'} justifyContent={'center'} mt={'40px'}>
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
              text="확인"
              borderColor={ColorRed}
              color={ColorWhite}
              px="44px"
              py="13px"
              bgColor={ColorRed}
              fontSize="15px"
              onClick={() => {
                console.log(watch('adminMemo'));
                if(watch('status') == 1){
                  PartnerRestore({
                    partnerId: info.partnerId,
                    adminMemo: watch('adminMemo'),
                  });
                } else if(watch('status') == 2){
                  PartnerStop({
                    partnerId: info.partnerId,
                    adminMemo: watch('adminMemo'),
                  });
                } else {
                  PartnerResign({
                    partnerId: info.partnerId,
                    adminMemo: watch('adminMemo'),
                  });
                }
              }}
            />
          </Flex>
        </Flex>
        </>
      )}
    </>
  );
}

export default PartnerConnectInfo;
