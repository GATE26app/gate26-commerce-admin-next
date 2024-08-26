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

import { GoodsPoliciesListProps } from '@/apis/goods/GoodsApi.type';

import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';

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
} from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';

interface Props {
  list: Array<GoodsPoliciesListProps>;
  setList: React.Dispatch<React.SetStateAction<GoodsPoliciesListProps[]>>;
}

interface cancelType {
  days?: number;
  sort?: number;
  type: number;
  title: string;
  feePer?: number;
}
function CancelComponent({ list, setList }: Props) {
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
  const [cancleList, setCancleList] = useState<Array<cancelType>>([]);

  const resultArray: GoodsPoliciesListProps[] = [];

  useEffect(() => {
    if (list) {
      list?.filter((item) => {
        item.type == 1
          ? setFull(item.days)
          : item.type == 2
            ? setNotCancel(item.days)
            : null;
      });

      if(list.length > 0){
        setNotCancel(Number(list[0].feePer));
      }
      let lastValue = list.find(res => res.type === 2);
      if(lastValue){
        setEtc(lastValue.title);
      }
    }
  }, [list]);

  const onHandleBasic = () => {
    if (notCancelDay >= 0) {
      if(notCancelDay > 100){
        toast({
          position: 'top',
          duration: 1000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              100보다 클 수 없습니다.
            </Box>
          ),
        });
        return false;
      }
      let array:any = [...list];
      // 이미 입력된 내용인지 아닌지 확인
      let findToday = cancleList.find(res => res.days === 0);
      if(findToday){
        array[0] = {
          days: 0,
          sort: 1,
          type: 1,
          title: notCancelDay == 100 ? `이용일 당일 취소시 환불 불가` : `이용일 당일 취소시 ${notCancelDay}% 공제 후 환불`,
          feePer: notCancelDay,
        };
        setList(array);
      } else {
        setList([{
          days: 0,
          sort: 1,
          type: 1,
          title: notCancelDay == 100 ? `이용일 당일 취소시 환불 불가` : `이용일 당일 취소시 ${notCancelDay}% 공제 후 환불`,
          feePer: notCancelDay,
        }]);
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
      let array:any = [...list];
      let findEtc = array.find(res => res.type === 2);
      if(findEtc){
        array[array.length-1] = {
          ...array[array.length-1],
          title: `[기타정책] ${etc}`,
          type: 2,
        };
      } else {
        array.push({
          sort: array.length+1,
          title: `[기타정책] ${etc}`,
          type: 2,
        });
      }
      setList(array);
      setEtc('');
    }
  };
  const onHandlePlus = () => {
    // 이용 당일 취소 정보가 입력되있는지 확인
    let findToday = list.find(res => res.days === 0);
      if(findToday){
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
        if(day <= 0){
          toast({
            position: 'top',
            duration: 1000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                공제일은 당일보다 커야합니다.
              </Box>
            ),
          });
          return false;
        }
        if(per > findToday.feePer){
          toast({
            position: 'top',
            duration: 1000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                공제후 환불률은 당일 환불률보다 낮아야합니다.
              </Box>
            ),
          });
          return false;
        }
        // 이미 존재하고 있는 일일 경우
        let findDay:any = list.find(res => res.days === day);
        if(findDay){
          let array = [...list];
          let findIndex = array.findIndex(res => res.days === day);
          array[findIndex] = {
            days: day,
            feePer: per,
            sort: 0,
            title: `이용일 ${day}일 전 ${per}% 공제 후 환불`,
            type: 1,
          };
          array.sort((a, b) => a.days - b.days); // 날짜 오름차순으로 정렬
          array.map((res, index) => res.sort = index+1); // sort 순서 재배치
          setList(array);
        } else {
          let array = [...list];
          let lastInfo = array.find(res => res.type === 2);
          // 중간에 날짜를 추가했을 때 위 날짜, 아래 날짜 사잇값으로 유효한 값만 넣게 필터링
          let topFilter = array.filter(res => res.days && res.days < day);
          let lowFilter = array.filter(res => res.days && res.days > day); 
          let max = findToday.feePer;
          let min = 0;
          if(topFilter.length > 0){
            max = topFilter[topFilter.length-1].feePer;
          }
          if(lowFilter.length > 0){
            min = lowFilter[0].feePer;
          }
          console.log(max, min);
          if(per > max || per < min){
            toast({
              position: 'top',
              duration: 1000,
              render: () => (
                <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                  {`${day}일의 환불률은 ${max} 이하 ${min} 이상으로 설정할 수 있습니다.`}
                </Box>
              ),
            });
            return false;
          }
          if(lastInfo){
            // 기타가 이미 입력되어 있을 때
            array.splice(array.length-1, 0, {
              days: day,
              feePer: per,
              sort: 0,
              title: `이용일 ${day}일 전 ${per}% 공제 후 환불`,
              type: 1,
            });
          } else {
            array.push({
              days: day,
              feePer: per,
              sort: 0,
              title: `이용일 ${day}일 전 ${per}% 공제 후 환불`,
              type: 1,
            });
            array.sort((a, b) => a.days - b.days); // 날짜 오름차순으로 정렬
            array.map((res, index) => res.sort = index+1); // sort 순서 재배치
          }
          setList(array);
          // setEtc('');
          setDay(0);
          setPer(0);
          // setData(array);
        }
      }
      
    } else {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            이용일 당일 취소 환불 항목을 먼저 입력해주세요.
          </Box>
        ),
      });
      return false;
    }
  };

  const handelDelete = (idx: number) => {
    let array = [...list];
    array = array.filter(
      (item: GoodsPoliciesListProps, index: number) => index !== idx,
    );
    array.map((res, index) => res.sort = index+1); // sort 순서 재배치

    setList(array);
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
                <Text
                  fontWeight={400}
                  fontSize={'16px'}
                  color={ColorBlack}
                  mr={'10px'}
                >
                  이용일 당일 취소시
                </Text>
                <InputBox
                  placeholder="숫자로만 입력"
                  w={'154px'}
                  disabled={goodsInfo.LogItemDisable}
                  value={notCancelDay}
                  onChange={(e) => setNotCancel(Number(e.target.value))}
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
                text="적용하기"
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
                  value={per}
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
            <Text
              color={ColorBlack}
              fontWeight={700}
              fontSize={'16px'}
              mb={'10px'}
              mt="20px"
            >
              기타
            </Text>
            <Flex mb={'10px'} w={'100%'}>
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
                  text="적용하기"
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
            <Text color={ColorGray700} fontSize={'13px'} fontWeight={400}>
                *기타 정책은 환불 수수료를 계산할 수 없는 예외 사항이며, 선택 항목입니다.
              </Text>
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
                    {index != 0 && (
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

export default CancelComponent;
