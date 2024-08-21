'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Box,
  Flex,
  Image,
  Text,
  useToast,
  Grid,
  GridItem,
  Textarea,
} from '@chakra-ui/react';

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
import { useForm } from 'react-hook-form';
import SelectBox from '@/components/common/SelectBox/SelectBox';
import {
  PartnerAddFormType,
  PartnersParamsType,
} from '@/app/apis/partners/PartnersApi.type';
import {
  usePatchUpdatePartnerMutation,
  usePutCreatePartnerMutation,
} from '@/app/apis/partners/PartnersApi.mutation';
import ToastComponent from '@/components/common/Toast/ToastComponent';
import AddressModal from '../AddressModal';
import PartnerFileComponent from '../add/PartnerFileComponents';
import PartnerFileComponent1 from '../add/PartnerFileComponents1';
import PartnerFileComponent2 from '../add/PartnerFileComponents2';
import PartnerImageComponent from '../add/PartnerImageComponents';

function PartnerBasicInfo({ info }: { info: PartnersParamsType }) {
  const searchParams = useSearchParams();
  const partnerId = searchParams.get('partnerId');
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [check, setCheck] = useState(1);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState({
    loginId: '',
    password: '',
    password_check: '',
    hp: '',
    authEmail: '',
    tel: '',
    businessTel: '',
  });

  const { register, handleSubmit, watch, errors, setValue, getValue } =
    useForm<PartnerAddFormType>({
      mode: 'onChange',
      defaultValues: {
        status: 1,
        loginId: '',
        partnerId: partnerId,
      },
    });

  // const onSubmit = (data:any) => console.log(data);
  useEffect(() => {
    if (info) {
      setValue('password', '');
      setValue('loginId', info.loginId);
      setValue('status', info.status);
      setValue('type', Number(info.type));
      setCheck(Number(info.type));
      setValue('hp', info.hp);
      setValue('title', info.title);
      setValue('tel', info.tel);
      setValue('info', info.info);
      setValue('bank', info.bank);
      setValue('authEmail', info.authEmail);
      setValue('accountNumber', info.accountNumber);
      setValue('accountHolder', info.accountHolder);
      setValue('nameOfCompany', info.nameOfCompany);
      setValue('businessRegistrationNumber', info.businessRegistrationNumber);
      setValue('nameOfRepresentative', info.nameOfRepresentative);
      setValue('registrationNumber', info.registrationNumber);
      setValue('address', info.address);
      setValue('addressDetail', info.addressDetail);
      setValue('businessType', info.businessType);
      setValue('businessItem', info.businessItem);
      setValue('businessTel', info.businessTel);
      setValue(
        'mailOrderSalesRegistrationNo',
        info.mailOrderSalesRegistrationNo,
      );
      setValue('images', info.images);
      setValue('files', info.files);
      setValue('files1', [info.files[0]]);
      setValue('files2', [info.files[1]]);
      setValue('files3', [info.files[2]]);
    }
  }, [info, router]);

  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => onSubmit(),
    cbCancel: () => {},
  });

  const { mutate: updatePartner, isLoading } = usePatchUpdatePartnerMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: '파트너사 수정',
            message: '파트너사 수정이 완료되었습니다.',
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              // router.back();
              window.history.back();
            },
            cbCancel: () => {
              window.history.back();
            },
          });
        } else {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'수정에 실패하였습니다.'}
              </Box>
            ),
          });
        }
        setLoadingModal(false);
      },
      onError: (req) => {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'등록에 실패하였습니다.'}
            </Box>
          ),
        });
        setLoadingModal(false);
      },
    },
  });

  // 등록w
  const onSubmit = () => {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(watch());
    if (watch('loginId') == '' || watch('loginId') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'아이디를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('type') == 1 &&
      (watch('hp') == '' || watch('hp') == undefined)
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'연락처를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('type') == 2 &&
      (watch('authEmail') == '' || watch('authEmail') == undefined)
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'이메일을 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('type') == 2 && !emailRegex.test(watch('authEmail'))) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'이메일 형식에 맞게 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('images')?.length <= 0 || watch('images') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'브랜드 로고를 첨부해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('title') == '' || watch('title') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'파트너사명을 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('info') == '' || watch('info') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'소개글을 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('nameOfCompany') == '' ||
      watch('nameOfCompany') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'상호(법인)명을 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('businessType') == '' ||
      watch('businessType') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'업태를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('businessItem') == '' ||
      watch('businessItem') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'업종을 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('businessRegistrationNumber') == '' ||
      watch('businessRegistrationNumber') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'사업자 등록번호를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('mailOrderSalesRegistrationNo') == '' ||
      watch('mailOrderSalesRegistrationNo') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'통신판매업신고번호를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('nameOfRepresentative') == '' ||
      watch('nameOfRepresentative') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'대표자명을 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('registrationNumber') == '' ||
      watch('registrationNumber') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'사업자 주민번호를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('tel') == '' || watch('tel') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'대표 전화번호를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('businessTel') == '' ||
      watch('businessTel') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'사업장 전화번호를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('address') == '' || watch('address') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'주소를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('files1')?.length <= 0 || watch('files1') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'사업자등록증을 첨부해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('files2')?.length <= 0 || watch('files2') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'통신판매업신고증을 첨부해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('bank') == '' || watch('bank') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'은행명을 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('accountNumber') == '' ||
      watch('accountNumber') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'계좌번호를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (
      watch('accountHolder') == '' ||
      watch('accountHolder') == undefined
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'예금주를 입력해주세요.'}
          </Box>
        ),
      });
      return false;
    } else if (watch('files3')?.length <= 0 || watch('files3') == undefined) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'통장사본을 첨부해주세요.'}
          </Box>
        ),
      });
      return false;
    }

    if (watch('password') != '' && watch('password') != undefined) {
      const passwordRegex: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      if (
        watch('password_check') == '' ||
        watch('password_check') == undefined
      ) {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'비밀번호 확인을 입력해주세요.'}
            </Box>
          ),
        });
        return false;
      } else if (!passwordRegex.test(watch('password'))) {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {
                '비밀번호는 영문 대/소문자, 숫자, 특수문자를 조합한 8~20자를 입력해주세요.'
              }
            </Box>
          ),
        });
        return false;
      } else if (watch('password_check') != watch('password')) {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'비밀번호가 일치하지 않습니다.'}
            </Box>
          ),
        });
        return false;
      }
    }

    let array = [];
    if (watch('files1')?.length > 0) {
      array.push(...watch('files1'));
    }
    if (watch('files2')?.length > 0) {
      array.push(...watch('files2'));
    }
    if (watch('files3')?.length > 0) {
      array.push(...watch('files3'));
    }
    console.log(array);
    setValue('files', array);
    console.log(watch());
    let json: PartnerAddFormType = watch();
    updatePartner(json);
    setLoadingModal(true);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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

      <AddressModal
        setAddress={(e: any) => {
          setValue('address', `${e.address} (${e.zonecode})`);
        }}
        isOpen={modal}
        onClose={() => setModal(false)}
      />
      <Flex mt={'30px'} flexDirection={'column'}>
        <Text fontWeight={'semibold'} fontSize={'18px'} color={ColorBlack}>
          기본정보
        </Text>
        <Flex
          w={'100%'}
          h={'2px'}
          bgColor={ColorDataTableBorderTop}
          mt={'10px'}
          mb={'30px'}
        ></Flex>
        <Flex flexDirection={'column'} pb={'20px'}>
          <Flex flexDirection={'row'} alignItems={'center'} width={'50%'}>
            <Text
              w={'165px'}
              flexShrink={0}
              color={ColorBlack}
              fontWeight={600}
              fontSize={'15px'}
              display={'inline'}
            >
              아이디
              <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                *
              </Text>
            </Text>
            <Text color={ColorBlack} fontSize={'15px'}>
              {watch('loginId')}
            </Text>
          </Flex>
          <Text color={ColorRed} fontSize={'12px'} ml={'167px'}>
            {error.loginId}
          </Text>
        </Flex>
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
            <Flex
              flexDirection={'row'}
              pb={'20px'}
              alignItems={'center'}
              width={'100%'}
            >
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
              >
                비밀번호
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <Flex flexDirection={'column'} width={'100%'}>
                <InputBox
                  type={'password'}
                  width={'100%'}
                  placeholder="변경하실 비밀번호 입력"
                  {...register('password', { required: true })}
                  value={watch('password')}
                  onChange={(e) => {
                    setValue('password', e.target.value);
                    const passwordRegex: RegExp =
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
                    if (passwordRegex.test(e.target.value)) {
                      if (error.password != '') {
                        setError({ ...error, password: '' });
                      }
                    } else {
                      setError({
                        ...error,
                        password:
                          '비밀번호는 영문 대/소문자, 숫자, 특수문자를 조합한 8~20자를 입력해주세요.',
                      });
                    }
                  }}
                />
                <Text color={ColorRed} fontSize={'12px'}>
                  {error.password}
                </Text>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              flexDirection={'row'}
              pb={'20px'}
              alignItems={'center'}
              ml={'40px'}
            >
              <Text
                w={'100px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                // mb={'20px'} // error 있을 때
              >
                비밀번호 확인
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <Flex flexDirection={'column'} width={'100%'}>
                <InputBox
                  placeholder="변경하실 비밀번호 재입력"
                  type={'password'}
                  {...register('password_check', { required: true })}
                  value={watch('password_check')}
                  onChange={(e) => {
                    setValue('password_check', e.target.value);
                    if (
                      watch('password') != e.target.value &&
                      watch('password_check') != ''
                    ) {
                      setError({
                        ...error,
                        password_check: '비밀번호가 일치하지 않습니다.',
                      });
                    } else {
                      setError({ ...error, password_check: '' });
                    }
                  }}
                />
                <Text color={ColorRed} fontSize={'12px'}>
                  {error.password_check}
                </Text>
                {/* <Flex width={'200px'} h={'45px'} bgColor={ColorRed} borderRadius={'12px'} cursor={'pointer'} alignItems={'center'} justifyContent={'center'} ml={'10px'}>
                <Text fontSize={'18px'} color={'white'}>변경</Text>
              </Flex> */}
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex flexDirection={'row'} pb={'20px'} width={'100%'}>
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
              >
                회원상태
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <Flex w={'100%'}>
                <SelectBox
                  placeholder="검색분류선택"
                  width={'100%'}
                  list={['정상', '정지']}
                  select={watch('status') == 1 ? '정상' : '정지'}
                  {...register('status', { required: true })}
                  setSelect={(e) => {
                    if (e == '정상') {
                      setValue('status', 1);
                    } else {
                      setValue('status', 2);
                    }
                  }}
                />
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
        <Flex w={'100%'} h={'1px'} bgColor={ColoLineGray} my={'30px'}></Flex>
        <Flex flexDirection={'row'} pb={'20px'} w={'100%'}>
          <Text
            w={'165px'}
            flexShrink={0}
            color={ColorBlack}
            fontWeight={600}
            fontSize={'15px'}
            display={'inline'}
          >
            구분
            <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
              *
            </Text>
          </Text>
          <Flex flexDirection={'column'} w={'100%'}>
            <Flex flexDirection={'row'} gap={'20px'}>
              <RadioComponent
                text="국내사업자"
                checked={check == 1 ? true : false}
                {...register('type', { required: true })}
                onClick={() => {
                  setCheck(1);
                  setValue('type', 1);
                }}
              />
              <RadioComponent
                text="해외사업자"
                checked={check == 2 ? true : false}
                onClick={() => {
                  setCheck(2);
                  setValue('type', 2);
                }}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDirection={'column'}
          pb={'20px'}
          width={'50%'}
          display={check == 1 ? 'block' : 'none'}
        >
          <Flex flexDirection={'row'} alignItems={'center'}>
            <Text
              w={'165px'}
              flexShrink={0}
              color={ColorBlack}
              fontWeight={600}
              fontSize={'15px'}
              display={'inline'}
            >
              연락처
              <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                *
              </Text>
            </Text>
            <InputBox
              w={'100%'}
              placeholder="휴대폰 번호 입력"
              {...register('hp')}
              value={watch('hp')}
              onChange={(e) => {
                if (!/[^0-9]/g.test(e.target.value)) {
                  if (e.target.value.length < 8) {
                    setError({ ...error, hp: '최소 길이는 8자입니다.' });
                  } else if (e.target.value.length > 11) {
                    setError({ ...error, hp: '최대 길이는 11자입니다.' });
                  } else {
                    setError({ ...error, hp: '' });
                  }
                  if (e.target.value.length <= 11) {
                    setValue('hp', e.target.value.replace(/[^0-9]/g, ''));
                  }
                } else {
                  setError({ ...error, hp: '숫자만 입력 가능합니다.' });
                }
              }}
            />
          </Flex>
          <Text color={ColorRed} fontSize={'12px'} ml={'165px'}>
            {error.hp}
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          pb={'20px'}
          width={'50%'}
          display={check == 2 ? 'block' : 'none'}
        >
          <Flex alignItems={'center'}>
            <Text
              w={'165px'}
              flexShrink={0}
              color={ColorBlack}
              fontWeight={600}
              fontSize={'15px'}
              display={'inline'}
              {...register('authEmail')}
              value={watch('authEmail')}
              onChange={(e) => {
                setValue('authEmail', e.target.value);
                const emailRegex: RegExp =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailRegex.test(e.target.value)) {
                  if (error.authEmail != '' && watch('authEmail') != '') {
                    setError({ ...error, authEmail: '' });
                  }
                } else {
                  setError({
                    ...error,
                    authEmail: '유효하지 않은 이메일입니다.',
                  });
                }
              }}
            >
              연락망
              <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                *
              </Text>
            </Text>
            <InputBox
              w={'100%'}
              placeholder="이메일 입력"
              {...register('authEmail')}
              value={watch('authEmail')}
              onChange={(e) => {
                setValue('authEmail', e.target.value);
                const emailRegex: RegExp =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailRegex.test(e.target.value)) {
                  if (error.authEmail != '' && watch('authEmail') != '') {
                    setError({ ...error, authEmail: '' });
                  }
                } else {
                  setError({
                    ...error,
                    authEmail: '유효하지 않은 이메일입니다.',
                  });
                }
              }}
            />
          </Flex>
          <Text color={ColorRed} fontSize={'12px'} ml={'165px'}>
            {error.authEmail}
          </Text>
        </Flex>

        {/* 프로필 정보 */}
        <Text
          fontWeight={'semibold'}
          fontSize={'18px'}
          color={ColorBlack}
          mt={'40px'}
        >
          프로필정보
        </Text>
        <Flex
          w={'100%'}
          h={'2px'}
          bgColor={ColorDataTableBorderTop}
          mt={'10px'}
          mb={'30px'}
        ></Flex>
        <Flex w={'100%'} mb={'30px'}>
          <Flex w={'100%'} flexDirection={'column'}>
            <Flex flexDirection={'row'} pb="20px" flexWrap={'wrap'}>
              <Flex flexDirection={'column'} w={165}>
                <Flex>
                  <Text
                    fontWeight={600}
                    color={ColorBlack}
                    fontSize={'15px'}
                    whiteSpace={'pre'}
                  >
                    {`브랜드로고\n(프로필사진)`}
                    <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                      *
                    </Text>
                  </Text>
                </Flex>
                <Text fontWeight={600} color={ColorGray700} fontSize={'15px'}>
                  {`(${watch('images') ? watch('images')?.length : '0'}/1)`}
                </Text>
              </Flex>
              <PartnerImageComponent
                EntriesData={watch('images')}
                setEntriesData={(data) => setValue('images', data)}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDirection={'row'}
          pb={'20px'}
          width={'50%'}
          alignItems={'center'}
        >
          <Text
            w={'165px'}
            flexShrink={0}
            color={ColorBlack}
            fontWeight={600}
            fontSize={'15px'}
            display={'inline'}
          >
            파트너사명
            <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
              *
            </Text>
          </Text>
          <InputBox
            w={'100%'}
            placeholder="파트너사명 입력"
            {...register('title')}
            value={watch('title')}
            onChange={(e) => setValue('title', e.target.value)}
          />
        </Flex>
        <Flex flexDirection={'row'} pb={'20px'} width={'100%'}>
          <Text
            w={'165px'}
            flexShrink={0}
            color={ColorBlack}
            fontWeight={600}
            fontSize={'15px'}
            display={'inline'}
          >
            소개글
          </Text>
          <Flex flexDirection={'column'} width={'100%'}>
            <Textarea
              placeholder="파트너사 소개글에 표시될 내용 입력"
              _placeholder={{ color: ColorGray700 }}
              color={ColorBlack}
              borderColor={ColorGray400}
              maxLength={500}
              height={150}
              {...register('info')}
            />
            <Flex justifyContent={'flex-end'} mt={'5px'}>
              <Text color={ColorGray700} fontWeight={400} fontSize={'15px'}>
                {`(${watch('info') ? watch('info').length : '0'}/500)`}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* 사업자 정보 */}
        <Text
          fontWeight={'semibold'}
          fontSize={'18px'}
          color={ColorBlack}
          mt={'40px'}
        >
          사업자정보
        </Text>
        <Flex
          w={'100%'}
          h={'2px'}
          bgColor={ColorDataTableBorderTop}
          mt={'10px'}
          mb={'30px'}
        ></Flex>
        <Grid templateColumns="repeat(2, 6fr)" gab={6}>
          <GridItem>
            <Flex
              flexDirection={'row'}
              pb={'20px'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                display={'inline'}
              >
                상호(법인)명
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <InputBox
                w={'100%'}
                placeholder="사업자등록증에 기재된 회사명 입력"
                {...register('nameOfCompany')}
                value={watch('nameOfCompany')}
                onChange={(e) => setValue('nameOfCompany', e.target.value)}
              />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              flexDirection={'row'}
              pb={'20px'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                ml={'50px'}
                w={'100px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                display={'inline'}
              >
                업태/업종
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <Flex alignItems={'center'} justifyContent={'space-between'}>
                <InputBox
                  w={'100%'}
                  placeholder="업태"
                  {...register('businessType')}
                  value={watch('businessType')}
                  onChange={(e) => setValue('businessType', e.target.value)}
                />
                <Text mx={'10px'}> / </Text>
                <InputBox
                  w={'100%'}
                  placeholder="업종"
                  {...register('businessItem')}
                  value={watch('businessItem')}
                  onChange={(e) => setValue('businessItem', e.target.value)}
                />
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              flexDirection={'row'}
              pb={'20px'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                display={'inline'}
              >
                사업자번호
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <InputBox
                w={'100%'}
                placeholder="사업자번호"
                {...register('businessRegistrationNumber')}
                value={watch('businessRegistrationNumber')}
                onChange={(e) =>
                  setValue('businessRegistrationNumber', e.target.value)
                }
              />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              flexDirection={'row'}
              pb={'20px'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                ml={'50px'}
                w={'100px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                display={'inline'}
              >
                통신판매업신고번호
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <InputBox
                w={'100%'}
                placeholder="통신판매업신고번호"
                {...register('mailOrderSalesRegistrationNo')}
                value={watch('mailOrderSalesRegistrationNo')}
                onChange={(e) =>
                  setValue('mailOrderSalesRegistrationNo', e.target.value)
                }
              />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              flexDirection={'row'}
              pb={'20px'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                display={'inline'}
              >
                대표자
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <InputBox
                w={'100%'}
                placeholder="대표자명"
                {...register('nameOfRepresentative')}
                value={watch('nameOfRepresentative')}
                onChange={(e) =>
                  setValue('nameOfRepresentative', e.target.value)
                }
              />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              flexDirection={'row'}
              pb={'20px'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                ml={'50px'}
                w={'100px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                display={'inline'}
              >
                사업자 주민번호
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <InputBox
                w={'100%'}
                placeholder="사업자 주민번호 입력"
                {...register('registrationNumber')}
                value={watch('registrationNumber')}
                onChange={(e) => setValue('registrationNumber', e.target.value)}
              />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex flexDirection={'column'} pb={'20px'} w={'100%'}>
              <Flex alignItems={'center'}>
                <Text
                  w={'165px'}
                  flexShrink={0}
                  color={ColorBlack}
                  fontWeight={600}
                  fontSize={'15px'}
                  display={'inline'}
                >
                  대표 전화번호
                  <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                    *
                  </Text>
                </Text>
                <InputBox
                  w={'100%'}
                  placeholder="회사 대표 전화번호 입력"
                  {...register('tel')}
                  value={watch('tel')}
                  type={'number'}
                  maxLength={11}
                  onChange={(e) => {
                    if (!/[^0-9]/g.test(e.target.value)) {
                      if (e.target.value.length < 8) {
                        setError({ ...error, tel: '최소 길이는 8자입니다.' });
                      } else if (e.target.value.length > 11) {
                        setError({ ...error, tel: '최대 길이는 11자입니다.' });
                      } else {
                        setError({ ...error, tel: '' });
                      }
                      if (e.target.value.length <= 11) {
                        setValue('tel', e.target.value.replace(/[^0-9]/g, ''));
                      }
                    } else {
                      setError({ ...error, tel: '숫자만 입력 가능합니다.' });
                    }
                  }}
                />
              </Flex>
              <Text color={ColorRed} fontSize={'12px'} ml={'165px'}>
                {error.tel}
              </Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              flexDirection={'row'}
              pb={'20px'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                ml={'50px'}
                w={'100px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                display={'inline'}
              >
                사업장 전화번호
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <InputBox
                w={'100%'}
                placeholder="사업장 전화번호 입력"
                {...register('businessTel')}
                value={watch('businessTel')}
                type={'number'}
                onChange={(e) => {
                  setValue('businessTel', e.target.value);
                  if (/^\d+$/.test(e.target.value)) {
                    if (e.target.value.length < 8) {
                      setError({
                        ...error,
                        businessTel: '최소 길이는 8자입니다.',
                      });
                    } else if (e.target.value.length > 11) {
                      setError({
                        ...error,
                        businessTel: '최대 길이는 11자입니다.',
                      });
                    } else {
                      setError({ ...error, businessTel: '' });
                    }
                  } else {
                    setError({
                      ...error,
                      businessTel: '숫자만 입력 가능합니다.',
                    });
                  }
                }}
              />
            </Flex>
          </GridItem>
          <GridItem colSpan={2}>
            <Flex flexDirection={'row'} pb={'20px'} w={'50%'}>
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                display={'inline'}
                mt={'13px'}
              >
                사업장 주소
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <Flex w={'100%'} flexDirection={'column'}>
                <Flex w={'100%'}>
                  <InputBox
                    w={'100%'}
                    placeholder="주소 입력"
                    {...register('address')}
                    value={watch('address')}
                    onChange={(e) => setValue('address', e.target.value)}
                  />
                  <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={'12px'}
                    borderColor={ColorRed}
                    borderWidth={1}
                    height={'45px'}
                    ml={'10px'}
                    width={'150px'}
                    cursor={'pointer'}
                    onClick={() => setModal(!modal)}
                  >
                    <Text color={ColorRed} fontSize={'15px'}>
                      주소검색
                    </Text>
                  </Flex>
                </Flex>
                <InputBox
                  mt={'10px'}
                  w={'100%'}
                  placeholder="상세 주소 입력"
                  {...register('addressDetail')}
                  value={watch('addressDetail')}
                  onChange={(e) => setValue('addressDetail', e.target.value)}
                />
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex w={'100%'} mb={'30px'}>
              <Flex w={'100%'} flexDirection={'column'}>
                <Flex flexDirection={'row'} pb="20px" flexWrap={'wrap'}>
                  <Flex flexDirection={'column'} w={165}>
                    <Flex>
                      <Text
                        fontWeight={600}
                        color={ColorBlack}
                        fontSize={'15px'}
                        whiteSpace={'pre'}
                      >
                        {`사업자등록증 첨부`}
                        <Text
                          color={ColorRequireRed}
                          ml={'2px'}
                          display={'inline'}
                        >
                          *
                        </Text>
                      </Text>
                    </Flex>
                    <Text
                      fontWeight={600}
                      color={ColorGray700}
                      fontSize={'15px'}
                    >
                      {`(${watch('files1') ? watch('files1')?.length : '0'}/1)`}
                    </Text>
                  </Flex>
                  <PartnerFileComponent
                    EntriesData={watch('files1')}
                    setEntriesData={(data) => setValue('files1', data)}
                    idx={1}
                  />
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex w={'100%'} mb={'30px'}>
              <Flex w={'100%'} flexDirection={'column'}>
                <Flex flexDirection={'row'} pb="20px" flexWrap={'wrap'}>
                  <Flex
                    flexDirection={'column'}
                    w={165}
                    ml={'50px'}
                    w={'100px'}
                    mr={'40px'}
                  >
                    <Flex>
                      <Text
                        fontWeight={600}
                        color={ColorBlack}
                        fontSize={'15px'}
                        whiteSpace={'pre'}
                      >
                        {`통신판매업신고증\n파일첨부`}
                        <Text
                          color={ColorRequireRed}
                          ml={'2px'}
                          display={'inline'}
                        >
                          *
                        </Text>
                      </Text>
                    </Flex>
                    <Text
                      fontWeight={600}
                      color={ColorGray700}
                      fontSize={'15px'}
                    >
                      {`(${watch('files2') ? watch('files2')?.length : '0'}/1)`}
                    </Text>
                  </Flex>
                  <PartnerFileComponent1
                    EntriesData={watch('files2')}
                    setEntriesData={(data) => setValue('files2', data)}
                    idx={2}
                  />
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex flexDirection={'row'} pb={'20px'}>
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                display={'inline'}
                mt={'13px'}
              >
                정산 받을 계좌
                <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                  *
                </Text>
              </Text>
              <Flex w={'100%'} flexDirection={'column'}>
                <Flex w={'100%'}>
                  <InputBox
                    w={'35%'}
                    placeholder="은행명"
                    {...register('bank')}
                    value={watch('bank')}
                    onChange={(e) => setValue('bank', e.target.value)}
                  />
                  <InputBox
                    ml={'10px'}
                    w={'65%'}
                    placeholder="계좌번호"
                    {...register('accountNumber')}
                    value={watch('accountNumber')}
                    onChange={(e) => setValue('accountNumber', e.target.value)}
                  />
                </Flex>
                <InputBox
                  mt={'10px'}
                  w={'35%'}
                  placeholder="계좌주"
                  {...register('accountHolder')}
                  value={watch('accountHolder')}
                  onChange={(e) => setValue('accountHolder', e.target.value)}
                />
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex w={'100%'} mb={'30px'}>
              <Flex w={'100%'} flexDirection={'column'}>
                <Flex flexDirection={'row'} pb="20px" flexWrap={'wrap'}>
                  <Flex
                    flexDirection={'column'}
                    w={165}
                    ml={'50px'}
                    w={'100px'}
                    mr={'40px'}
                  >
                    <Flex>
                      <Text
                        fontWeight={600}
                        color={ColorBlack}
                        fontSize={'15px'}
                        whiteSpace={'pre'}
                      >
                        {`통장사본 파일첨부`}
                        <Text
                          color={ColorRequireRed}
                          ml={'2px'}
                          display={'inline'}
                        >
                          *
                        </Text>
                      </Text>
                    </Flex>
                    <Text
                      fontWeight={600}
                      color={ColorGray700}
                      fontSize={'15px'}
                    >
                      {`(${watch('files3') ? watch('files3')?.length : '0'}/1)`}
                    </Text>
                  </Flex>
                  <PartnerFileComponent2
                    EntriesData={watch('files3')}
                    setEntriesData={(data) => setValue('files3', data)}
                    idx={3}
                  />
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
        {/* <Text fontWeight={'semibold'} fontSize={'18px'} color={ColorBlack}>기본정보</Text>
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
        </Flex> */}

        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          gap={'10px'}
          justifyContent={'center'}
          mt={'40px'}
        >
          <CustomButton
            text="목록"
            borderColor={ColorGray400}
            color={ColorGray700}
            px="67px"
            py="14px"
            bgColor={ColorWhite}
            fontSize="15px"
            onClick={() => router.back()}
          />

          <CustomButton
            text="확인"
            borderColor={ColorRed}
            color={ColorWhite}
            px="67px"
            py="14px"
            bgColor={ColorRed}
            fontSize="15px"
            onClick={() => {
              onSubmit();
              // setOpenAlertModal(true);
              // setModalState({
              //   title: '파트너스 등록',
              //   message: '파트너사를 등록하시겠습니까?',
              //   type: 'alert',
              //   okButtonName: '확인',
              //   cbOk: () => onSubmit(),
              //   cbCancel: () => {
              //     setOpenAlertModal(false);
              //   },
              // });
            }}
          />
        </Flex>
        {/* <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'} justifyContent={'center'}>
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
          </Flex> */}
      </Flex>
    </>
  );
}

export default PartnerBasicInfo;
