'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { Box, Flex, Image, Text, useToast, Grid, GridItem, Textarea } from '@chakra-ui/react';

// import goodsApi from '@/apis/goods/GoodsApi';
import { usePatchUpdateGoodsStatusMutation } from '@/app/apis/goods/GoodsApi.mutation';
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

function PartnerConnectInfo() {
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const [check, setCheck] = useState(1);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data:any) => console.log(data);

  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
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
      <Flex flexDirection={'column'}>
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
              onChange={(e) => {}}
              maxLength={500}
              height={150}
              value={''}
              disabled={''}
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
              2021-05-05
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
              2021-05-05
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
              list={['탈퇴요청']}
              select={'탈퇴요청'}
              setSelect={() => {}}
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
          2024-01-01 00:00
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
          회원상태 - 탈퇴요청시 판매자가 입력한 탈퇴요청사유 노출
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
              onClick={() => {}}
            />
          </Flex>
        </Flex>
    </>
  );
}

export default PartnerConnectInfo;
