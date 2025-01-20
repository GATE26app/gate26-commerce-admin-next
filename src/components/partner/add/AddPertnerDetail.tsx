import { useState } from 'react';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';

// import StatusComponent from '@/components/Goods/_fragments/StatusComponent';
import CustomButton from '@/components/common/CustomButton';
// import LogSelectBox from '@/components/common/LogSelectBox';

import {
  ColoLineGray,
  ColorBlack,
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorRequireRed,
  ColorWhite
} from '@/utils/_Palette';

// import { useGoodsStateZuInfo } from '_store/StateZuInfo';
import RadioComponent from '@/components/common/CustomRadioButton/RadioComponent';
import InputBox from '@/components/common/Input';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import { useRouter, useSearchParams } from 'next/navigation';

function AddPartnerDetail() {
  const router = useRouter();
  const toast = useToast();
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => { },
    cbCancel: () => { },
  });
  const searchParams = useSearchParams();
  const getType = searchParams.get('type');
  const getItemCode = searchParams.get('itemcode');

  const [check, setCheck] = useState(1);

  return (
    <>
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      <Flex
        w={'100%'}
        flexDirection={'column'}
        position={'relative'}
        borderRadius={'16px'}
      >
        <Box
          pb={'60px'}
          bgColor={ColorWhite}
          borderBottomRadius={'16px'}
          pt={'67px'}
        >
          <Flex alignItems={'center'} mb={'20px'}>
            <Image
              src={'/images/Page/subtopicon01.png'}
              width={'20px'}
              height={'23px'}
              alt="상품관리"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              파트너사 등록
            </Text>
          </Flex>
          <Flex
            borderRadius={'12px'}
            borderWidth={1}
            borderColor={ColoLineGray}
            w={'100%'}
            px={'40px'}
            py={'43px'}
            flexDirection={'column'}
          >
            <Flex flexDirection={'row'} pb={'20px'}>
              <Text
                w={'165px'}
                flexShrink={0}
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
              >
                아이디
              </Text>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                fejiafe
              </Text>
            </Flex>
            <Grid templateColumns="repeat(2, 1fr)">
              <GridItem>
                <Flex flexDirection={'row'} alignItems={'center'} width={'93%'}>
                  <Text
                    w={'165px'}
                    flexShrink={0}
                    color={ColorBlack}
                    fontWeight={600}
                    fontSize={'15px'}
                  // mb={'20px'} // error 있을 때
                  >
                    비밀번호
                  </Text>
                  <Flex flexDirection={'column'} width={'100%'}>
                    <InputBox
                      width={'100%'}
                      value={''}
                      placeholder="변경하실 비밀번호 입력"
                      // value={list?.title}
                      onChange={(e) => { }}
                    // error={'fewaf'}
                    // register={register('title')}
                    />
                  </Flex>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex flexDirection={'row'} alignItems={'center'}>
                  <Text
                    w={'100px'}
                    flexShrink={0}
                    color={ColorBlack}
                    fontWeight={600}
                    fontSize={'15px'}
                  // mb={'20px'} // error 있을 때
                  >
                    비밀번호 확인
                  </Text>
                  <Flex flexDirection={'row'} alignItems={'center'}>
                    <InputBox
                      value={''}
                      placeholder="변경하실 비밀번호 재입력"
                      // value={list?.title}
                      onChange={(e) => { }}
                    // register={register('title')}
                    />
                    <Flex
                      width={'200px'}
                      h={'45px'}
                      bgColor={ColorRed}
                      borderRadius={'12px'}
                      cursor={'pointer'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      ml={'10px'}
                    >
                      <Text fontSize={'18px'} color={'white'}>
                        변경
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </GridItem>
            </Grid>
            <Flex
              w={'100%'}
              h={'1px'}
              bgColor={ColoLineGray}
              my={'30px'}
            ></Flex>
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
                    disabled={true}
                    checked={check == 1 ? true : false}
                    onClick={() => {
                      setCheck(1);
                    }}
                  />
                  <RadioComponent
                    text="해외사업자"
                    disabled={true}
                    checked={check == 2 ? true : false}
                    onClick={() => {
                      setCheck(2);
                    }}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Grid templateColumns="repeat(2, 1fr)">
              <GridItem>
                <Flex flexDirection={'row'} width={'93%'} alignItems={'center'}>
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
                    value={'01035231531'}
                    placeholder="연"
                    // value={list?.title}
                    onChange={(e) => { }}
                  // register={register('title')}
                  />
                </Flex>
              </GridItem>
              <GridItem>
                <Flex
                  flexDirection={'row'}
                  width={'100%'}
                  alignItems={'center'}
                >
                  <Text
                    w={'100px'}
                    flexShrink={0}
                    color={ColorBlack}
                    fontWeight={600}
                    fontSize={'15px'}
                    display={'inline'}
                  >
                    연락망
                    <Text color={ColorRequireRed} ml={'2px'} display={'inline'}>
                      *
                    </Text>
                  </Text>
                  <InputBox
                    w={'100%'}
                    value={''}
                    placeholder="이메일 입력"
                    // value={list?.title}
                    onChange={(e) => { }}
                  // register={register('title')}
                  />
                </Flex>
              </GridItem>
            </Grid>
            <Flex
              w={'100%'}
              h={'1px'}
              bgColor={ColoLineGray}
              my={'30px'}
            ></Flex>
            <Flex flexDirection={'row'} width={'46.5%'} alignItems={'center'}>
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
                value={''}
                placeholder="브랜드명 입력"
                // value={list?.title}
                onChange={(e) => { }}
              // register={register('title')}
              />
            </Flex>
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
                onClick={() => { }}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
      {/* <PartnerBasicInfo /> */}
    </>
  );
}

export default AddPartnerDetail;
