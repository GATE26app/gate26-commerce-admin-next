import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Flex, Text } from '@chakra-ui/react';

import { GoodsBasicProps } from '@/app/apis/goods/GoodsApi.type';

import CustomButton from '@/components/common/CustomButton';
import DatePicker from '@/components/common/DatePicker';

import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
}
function StatusComponent({ list, setList }: Props) {
  const router = useRouter();
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  // const [sellStatus, setSellStatus] = useState(list.forSale);
  // const [openStatus, setOpenStatus] = useState(list.level);

  // const [sDate, setSDate] = useState(new Date());
  // const [eDate, setEDate] = useState(new Date());
  const searchParams = useSearchParams();
  const getType = searchParams.get('type');
  const [startDay, setStartDay] = useState<dayjs.Dayjs>(() =>
    dayjs(
      list.viewStartDate !== '' && list.viewStartDate !== null
        ? list.viewStartDate.split(' ')[0]
        : '',
    ),
  );

  const [endDay, setEndDay] = useState<dayjs.Dayjs>(() =>
    dayjs(
      list.viewEndDate !== '' && list.viewEndDate !== null
        ? list.viewEndDate.split(' ')[0]
        : '',
    ),
  );
  const [sState, setSState] = useState(false);
  const [eState, setEState] = useState(false);

  useEffect(() => {
    if (list) {
      if (list.viewStartDate !== null) {
        setStartDay(dayjs(list.viewStartDate.split(' ')[0]));
      }
      if (list.viewEndDate !== null) {
        setEndDay(dayjs(list.viewEndDate.split(' ')[0]));
      }
    }
  }, [list]);

  useEffect(() => {
    if (sState) {
      setList({
        ...list,
        viewStartDate:
          dayjs(startDay).format('YYYY-MM-DD') == 'Invalid Date'
            ? ''
            : `${dayjs(startDay).format('YYYY-MM-DD')} 00:00:00`,
      });
      setSState(false);
    }
    if (eState) {
      setList({
        ...list,
        viewEndDate:
          dayjs(endDay).format('YYYY-MM-DD') == 'Invalid Date'
            ? ''
            : `${dayjs(endDay).format('YYYY-MM-DD')} 23:59:59`,
      });
      setEState(false);
    }
  }, [sState, eState]);

  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderBottomWidth={0}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
      >
        <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
          판매/노출상태
        </Text>
        <Text color={ColorRed} fontWeight={800} ml={'3px'} lineHeight={'12px'}>
          *
        </Text>
      </Flex>
      <Flex
        px={'30px'}
        py={'20px'}
        w={'100%'}
        flexDirection={'column'}
        borderWidth={1}
        borderColor={ColorGray400}
        borderBottomRadius={'12px'}
      >
        {getType == '3' && (
          <>
            <Flex
              flexWrap={'wrap'}
              alignItems={'center'}
              mb={'30px'}
              gap={'10px'}
            >
              <Flex w={'205px'}>
                <Text fontWeight={600} fontSize={'16px'} color={ColorBlack}>
                  자동예약확정
                </Text>
                <Text
                  color={ColorRed}
                  fontWeight={600}
                  ml={'3px'}
                  lineHeight={'12px'}
                >
                  *
                </Text>
              </Flex>
              <Flex flexDirection={'row'} gap={'10px'}>
                <CustomButton
                  bgColor={list.autoConfirm == 0 ? ColorGray900 : ColorWhite}
                  color={list.autoConfirm == 0 ? ColorWhite : ColorGray700}
                  text="활성화"
                  fontSize="15px"
                  borderColor={
                    list.autoConfirm == 0 ? ColorGray900 : ColorGray400
                  }
                  px="38px"
                  py="13px"
                  onClick={() => setList({ ...list, autoConfirm: 0 })}
                />
                <CustomButton
                  bgColor={list.autoConfirm == 1 ? ColorGray900 : ColorWhite}
                  color={list.autoConfirm == 1 ? ColorWhite : ColorGray700}
                  text="비활성화"
                  fontSize="15px"
                  borderColor={
                    list.autoConfirm == 1 ? ColorGray900 : ColorGray400
                  }
                  px="38px"
                  py="13px"
                  onClick={() => setList({ ...list, autoConfirm: 1 })}
                />
              </Flex>
            </Flex>
            <Flex
              flexWrap={'wrap'}
              alignItems={'center'}
              mb={'30px'}
              gap={'10px'}
            >
              <Flex w={'205px'}>
                <Text fontWeight={600} fontSize={'16px'} color={ColorBlack}>
                  이용당일판매
                </Text>
                <Text
                  color={ColorRed}
                  fontWeight={600}
                  ml={'3px'}
                  lineHeight={'12px'}
                >
                  *
                </Text>
              </Flex>
              <Flex flexDirection={'row'} gap={'10px'}>
                <CustomButton
                  bgColor={list.orderSameDay == 0 ? ColorGray900 : ColorWhite}
                  color={list.orderSameDay == 0 ? ColorWhite : ColorGray700}
                  text="가능"
                  fontSize="15px"
                  borderColor={
                    list.orderSameDay == 0 ? ColorGray900 : ColorGray400
                  }
                  px="38px"
                  py="13px"
                  onClick={() => setList({ ...list, orderSameDay: 0 })}
                />
                <CustomButton
                  bgColor={list.orderSameDay == 1 ? ColorGray900 : ColorWhite}
                  color={list.orderSameDay == 1 ? ColorWhite : ColorGray700}
                  text="불가능"
                  fontSize="15px"
                  borderColor={
                    list.orderSameDay == 1 ? ColorGray900 : ColorGray400
                  }
                  px="38px"
                  py="13px"
                  onClick={() => setList({ ...list, orderSameDay: 1 })}
                />
              </Flex>
            </Flex>
          </>
        )}

        <Flex flexWrap={'wrap'} alignItems={'center'} mb={'30px'} gap={'10px'}>
          <Flex w={'205px'}>
            <Text fontWeight={600} fontSize={'16px'} color={ColorBlack}>
              판매상태
            </Text>
            <Text
              color={ColorRed}
              fontWeight={600}
              ml={'3px'}
              lineHeight={'12px'}
            >
              *
            </Text>
          </Flex>
          <Flex flexDirection={'row'} gap={'10px'}>
            <CustomButton
              bgColor={list.forSale == 1 ? ColorGray900 : ColorWhite}
              color={list.forSale == 1 ? ColorWhite : ColorGray700}
              text="판매함"
              fontSize="15px"
              borderColor={list.forSale == 1 ? ColorGray900 : ColorGray400}
              px="38px"
              py="13px"
              onClick={() => setList({ ...list, forSale: 1 })}
              disabled={goodsInfo.LogItemDisable}
            />
            <CustomButton
              bgColor={list.forSale == 2 ? ColorGray900 : ColorWhite}
              color={list.forSale == 2 ? ColorWhite : ColorGray700}
              text="판매안함"
              fontSize="15px"
              borderColor={list.forSale == 2 ? ColorGray900 : ColorGray400}
              px="38px"
              py="13px"
              onClick={() => setList({ ...list, forSale: 2 })}
              disabled={goodsInfo.LogItemDisable}
            />
            <CustomButton
              bgColor={list.forSale == 10 ? ColorGray900 : ColorWhite}
              color={list.forSale == 10 ? ColorWhite : ColorGray700}
              text="품절"
              fontSize="15px"
              borderColor={list.forSale == 10 ? ColorGray900 : ColorGray400}
              px="38px"
              py="13px"
              onClick={() => setList({ ...list, forSale: 10 })}
              disabled={goodsInfo.LogItemDisable}
            />
          </Flex>
        </Flex>
        <Flex
          flexWrap={'wrap'}
          alignItems={'flex-start'}
          mb={'15px'}
          gap={'10px'}
        >
          <Flex w={'205px'}>
            <Text fontWeight={600} fontSize={'16px'} color={ColorBlack}>
              노출상태
            </Text>
            <Text
              color={ColorRed}
              fontWeight={600}
              ml={'3px'}
              lineHeight={'12px'}
            >
              *
            </Text>
          </Flex>
          <Flex flexDirection={'column'} gap={'15px'}>
            <Flex flexDirection={'row'} gap={'10px'}>
              <CustomButton
                bgColor={list.level == 1 ? ColorGray900 : ColorWhite}
                color={list.level == 1 ? ColorWhite : ColorGray700}
                text="노출함"
                fontSize="15px"
                borderColor={list.level == 1 ? ColorGray900 : ColorGray400}
                px="38px"
                py="13px"
                onClick={() => setList({ ...list, level: 1 })}
                disabled={goodsInfo.LogItemDisable}
              />
              <CustomButton
                bgColor={list.level == 2 ? ColorGray900 : ColorWhite}
                color={list.level == 2 ? ColorWhite : ColorGray700}
                text="노출안함"
                fontSize="15px"
                borderColor={list.level == 2 ? ColorGray900 : ColorGray400}
                px="38px"
                py="13px"
                disabled={goodsInfo.LogItemDisable}
                onClick={() => setList({ ...list, level: 2 })}
              />
            </Flex>
            {list.level == 1 && (
              <Flex gap={'5px'} alignItems={'center'}>
                <DatePicker
                  type={'date'}
                  curDate={startDay}
                  width={'200px'}
                  onApply={(date) => {
                    setList({
                      ...list,
                      viewStartDate:
                        dayjs(date).format('YYYY-MM-DD') == 'Invalid Date'
                          ? ''
                          : `${dayjs(date).format('YYYY-MM-DD')} 00:00:00`,
                    });
                    // setList({ ...list, viewStartDate:  });
                    setStartDay(date);
                    setSState(true);
                  }}
                  maxDateTime={
                    list.viewEndDate == ''
                      ? ''
                      : dayjs(list.viewEndDate).format('YYYY-MM-DD')
                  }
                  disabled={goodsInfo.LogItemDisable}
                />
                <Text color={ColorBlack} fontSize={'15px'} fontWeight={500}>
                  ~
                </Text>
                <DatePicker
                  type={'date'}
                  curDate={endDay}
                  minDateTime={
                    list.viewStartDate == ''
                      ? ''
                      : dayjs(list.viewStartDate).format('YYYY-MM-DD')
                  }
                  maxDateTime=""
                  width={'200px'}
                  onApply={(date) => {
                    setEndDay(date);
                    setEState(true);
                    setList({
                      ...list,
                      viewEndDate:
                        dayjs(endDay).format('YYYY-MM-DD') == 'Invalid Date'
                          ? ''
                          : `${dayjs(endDay).format('YYYY-MM-DD')} 23:59:59`,
                    });
                  }}
                  disabled={goodsInfo.LogItemDisable}
                />
              </Flex>
            )}
          </Flex>
          {/* <DatePicker
            locale={ko}
            className="w-56"
            value={eDate}
            minDate={sDate}
            onValueChange={(e) => {
              // setInfo({
              //   ...Info,
              //   bt_edate: dateConverter(e)
              // });
              setEDate(e);
            }}
          /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default StatusComponent;
