import React, { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import { GoodsPoliciesListProps } from '@apis/goods/GoodsApi.type';

import CustomButton from '@components/common/CustomButton';
import InputBox from '@components/common/Input';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorMainBackBule,
  ColorRed,
  ColorWhite,
} from '@utils/_Palette';

import { useGoodsStateZuInfo } from '_store/StateZuInfo';

interface Props {
  list: Array<GoodsPoliciesListProps>;
  setList: React.Dispatch<React.SetStateAction<GoodsPoliciesListProps[]>>;
}
function CancleComponent({ list, setList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const toast = useToast();
  const [open, setOpen] = useState(true);
  const [data, setData] = useState<GoodsPoliciesListProps[]>([]);

  const [fullDay, setFull] = useState<number>(0); //전액 환불
  const [notCancelDay, setNotCancel] = useState<number>(0); //환불 불가
  const [etc, setEtc] = useState<string>('');
  const [day, setDay] = useState(0);
  const [per, setPer] = useState(0);
  const [onClickBasic, setOnClickBasic] = useState(false);

  const resultArray: GoodsPoliciesListProps[] = [];

  useEffect(() => {
    if (list) {
      list.filter((item) => {
        item.type == 1
          ? setFull(item.days)
          : item.type == 2
          ? setNotCancel(item.days)
          : null;
      });
      console.log(list);
      // setFull()
    }
  }, [list]);

  const onHandleBasic = () => {
    if (fullDay !== 0 && notCancelDay !== 0) {
      const itemExists = list?.some((item) => item.sort === 1);
      if (fullDay > notCancelDay) {
        toast({
          position: 'top',
          duration: 1000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              전액 환불 유효일보다 취소/환불 불가 유효일이 더 작습니다.
            </Box>
          ),
        });
      } else if (itemExists) {
        const updatedData = list?.map((item) => {
          if (item.sort == 1) {
            return {
              ...item,
              days: fullDay,
              title: `${fullDay}일전 전액 취소/환불`,
            };
          }
          if (item.sort == 2) {
            return {
              ...item,
              days: notCancelDay,
              title: `${notCancelDay}일 이후 취소/환불 불가`,
            };
          }
          return item;
        });
        setList(updatedData);
      } else {
        setList([
          ...list,
          {
            days: fullDay,
            feePer: 100,
            sort: 1,
            title: `${fullDay}일전 전액 취소/환불`,
            type: 1,
          },
          {
            days: notCancelDay,
            feePer: 0,
            sort: 2,
            title: `${notCancelDay}일 이후 취소/환불 불가`,
            type: 2,
          },
        ]);
      }
    } else {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            입력하지 않은 항목이 있습니다.
          </Box>
        ),
      });
    }
  };
  const onHandleEtc = () => {
    if (etc == '') {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            기타 내용을 입력해주세요.
          </Box>
        ),
      });
    } else {
      setList([
        ...list,
        {
          days: 0,
          feePer: 0,
          sort: 3,
          title: etc,
          type: 4,
        },
      ]);
      setEtc('');
      // setData([...data, resultArray]);
    }
  };
  const onHandlePlus = () => {
    if (day == 0 && per == 0) {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            입력하지 않은 항목이 있습니다.
          </Box>
        ),
      });
    } else {
      setList([
        ...list,
        {
          days: day,
          feePer: per,
          sort: 4,
          title: `${day}일 전 ${per}% 공제 후 환불`,
          type: 3,
        },
      ]);
      setEtc('');
      // setData([...data, resultArray]);
    }
  };

  const handelDelete = (index: number) => {
    setList(
      list.filter(
        (item: GoodsPoliciesListProps, index: number) => index !== index,
      ),
    );
  };

  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
        alignItems={'center'}
        borderBottomRadius={open ? 0 : '12px'}
        justifyContent={'space-between'}
      >
        <Flex>
          <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
            취소/환불 규정
          </Text>
          <Text
            color={ColorRed}
            fontWeight={800}
            ml={'3px'}
            lineHeight={'12px'}
          >
            *
          </Text>
        </Flex>
        <Flex>
          {open ? (
            <Image
              src={'/images/Page/icon_regist_up.png'}
              width={'40px'}
              height={'40px'}
              alt="카테고리 삭제"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <Image
              src={'/images/Page/icon_regist_down.png'}
              width={'40px'}
              height={'40px'}
              alt="카테고리 삭제"
              onClick={() => setOpen(!open)}
            />
          )}
        </Flex>
      </Flex>
      {open && (
        <Flex
          px={'30px'}
          py={'20px'}
          w={'100%'}
          borderWidth={1}
          borderTopWidth={0}
          borderColor={ColorGray400}
          flexDirection={'column'}
          borderBottomRadius={'12px'}
        >
          <Flex flexDirection={'column'}>
            <Flex flexDirection={'row'} mb={'10px'}>
              <Text color={ColorBlack} fontWeight={700} fontSize={'16px'}>
                기본
              </Text>
              <Text
                color={ColorRed}
                fontWeight={700}
                ml={'3px'}
                lineHeight={'12px'}
              >
                *
              </Text>
            </Flex>
            <Flex
              flexDirection={'row'}
              alignItems={'center'}
              flexWrap={'wrap'}
              gap={'10px'}
              mb={'15px'}
            >
              <Flex flexDirection={'row'} alignItems={'center'}>
                <InputBox
                  placeholder="숫자로만 입력"
                  w={'154px'}
                  type="number"
                  disabled={goodsInfo.LogItemDisable}
                  value={fullDay == 0 ? '' : fullDay}
                  onChange={(e) => setFull(Number(e.target.value))}
                />
                <Text
                  fontWeight={400}
                  fontSize={'16px'}
                  color={ColorBlack}
                  ml={'10px'}
                >
                  일전 전액환불
                </Text>
              </Flex>
              <Flex flexDirection={'row'} alignItems={'center'}>
                <InputBox
                  placeholder="숫자로만 입력"
                  w={'154px'}
                  disabled={goodsInfo.LogItemDisable}
                  value={notCancelDay == 0 ? '' : notCancelDay}
                  onChange={(e) => setNotCancel(Number(e.target.value))}
                />
                <Text
                  fontWeight={400}
                  fontSize={'16px'}
                  color={ColorBlack}
                  ml={'10px'}
                >
                  일 이후 취소/환불 불가
                </Text>
              </Flex>
              <CustomButton
                text="입력하기"
                bgColor={ColorGray900}
                borderColor={ColorGray900}
                color={ColorWhite}
                fontSize="15px"
                px="24px"
                py="12px"
                onClick={() => onHandleBasic()}
              />
            </Flex>
            <Text
              color={ColorBlack}
              fontWeight={700}
              fontSize={'16px'}
              mb={'10px'}
            >
              기타
            </Text>
            <Flex mb={'30px'} w={'100%'}>
              <InputBox
                placeholder="직접 입력"
                mr={'10px'}
                value={etc}
                disabled={goodsInfo.LogItemDisable}
                onChange={(e) => setEtc(e.target.value)}
              />
              {/* <Input
                value={etc}
                onChange={(e) => setEtc(e.target.value)}
                h="45px"
                placeholder="직접 입력"
                mr={'10px'}
                // {...props.register}
                errorBorderColor="warning.500"
                variant="outline"
                // onBlur={(e) => setEtc(e.target.value)}
                // borderColor={ColorInputBorder}
                backgroundColor={ColorWhite}
                color="black"
                _disabled={{ backgroundColor: 'gray.100', color: ColorGray700 }}
                _placeholder={{ color: ColorGray700 }}
                borderRadius={'10px'}
                fontSize={'15px'}
                outline={'none'}
              /> */}
              <Flex flexShrink={0}>
                <CustomButton
                  text="입력하기"
                  bgColor={ColorGray900}
                  borderColor={ColorGray900}
                  color={ColorWhite}
                  fontSize="15px"
                  px="24px"
                  py="12px"
                  onClick={() => onHandleEtc()}
                />
              </Flex>
            </Flex>
            <Text
              color={ColorBlack}
              fontWeight={700}
              fontSize={'16px'}
              mb={'10px'}
            >
              추가
            </Text>
            <Flex alignItems={'center'} gap={'20px'}>
              <Flex flexDirection={'row'} alignItems={'center'}>
                <InputBox
                  placeholder="숫자로만 입력"
                  w={'154px'}
                  type="number"
                  disabled={goodsInfo.LogItemDisable}
                  value={day == 0 ? '' : day}
                  onChange={(e) => setDay(Number(e.target.value))}
                />
                <Text
                  fontWeight={400}
                  fontSize={'16px'}
                  color={ColorBlack}
                  ml={'10px'}
                >
                  일전
                </Text>
              </Flex>
              <Flex flexDirection={'row'} alignItems={'center'}>
                <InputBox
                  placeholder="숫자로만 입력"
                  w={'154px'}
                  type="number"
                  disabled={goodsInfo.LogItemDisable}
                  value={per == 0 ? '' : per}
                  onChange={(e) => setPer(Number(e.target.value))}
                />
                <Text
                  fontWeight={400}
                  fontSize={'16px'}
                  color={ColorBlack}
                  ml={'10px'}
                >
                  % 공제후 환불
                </Text>
              </Flex>
              <CustomButton
                text="+ 추가하기"
                bgColor={ColorGray900}
                borderColor={ColorGray900}
                color={ColorWhite}
                fontSize="15px"
                px="24px"
                py="12px"
                onClick={() => onHandlePlus()}
              />
            </Flex>
          </Flex>
          <Flex justifyContent={'center'} mt={'32px'} mb={'30px'}>
            {/* <CustomButton
              text="+ 추가하기"
              bgColor={ColorGray900}
              borderColor={ColorGray900}
              color={ColorWhite}
              fontSize="15px"
              px="54px"
              py="19px"
            /> */}
          </Flex>
          <Flex
            bgColor={ColorMainBackBule}
            p={'30px'}
            borderRadius={'12px'}
            flexDirection={'column'}
          >
            <Flex
              flexDirection={'row'}
              gap={'11px'}
              mb={'30px'}
              alignItems={'center'}
            >
              <Text color={ColorBlack} fontSize={'18px'} fontWeight={800}>
                취소/환불 정책
              </Text>
              <Text color={ColorGray700} fontSize={'13px'} fontWeight={400}>
                *정책/기타 추가 순으로 정책 반영됩니다.
              </Text>
            </Flex>
            {list?.length > 0 &&
              list?.map((item, index: number) => {
                return (
                  <Flex
                    key={index}
                    alignItems={'center'}
                    gap={'30px'}
                    mb={'20px'}
                  >
                    <Text color={ColorBlack} fontSize={'15px'} fontWeight={500}>
                      {item.title}
                    </Text>
                    {item.type !== 1 && item.type !== 2 && (
                      <CustomButton
                        text="삭제하기"
                        fontSize="12px"
                        px="15px"
                        py="7.5px"
                        color={ColorWhite}
                        bgColor={ColorGray900}
                        borderColor={ColorGray900}
                        borderRadius={'6px'}
                        onClick={() => handelDelete(index)}
                      />
                    )}
                  </Flex>
                );
              })}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default CancleComponent;
