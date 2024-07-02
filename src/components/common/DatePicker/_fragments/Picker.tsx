import { useState } from 'react';

import dayjs from 'dayjs';
import moment from 'moment';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import { ColorBlue, ColorRed, ColorWhite } from '@/utils/_Palette';

import { PickerGrid, PickerGridItem } from './DatePicker.style';
import CalendarHeader from './PickerHeader';

interface DatePickerProps {
  date: dayjs.Dayjs;
  handleDayClick?: (day: dayjs.Dayjs) => void;
  onDayClick?: (val: dayjs.Dayjs) => void;
  setDate: (val: dayjs.Dayjs) => void;
  minDateTime?: string;
  maxDateTime?: string;
}
const Picker = ({
  handleDayClick,
  onDayClick,
  minDateTime,
  maxDateTime,
}: DatePickerProps) => {
  const [date, setDate] = useState<dayjs.Dayjs>(() => dayjs());
  const [newSelected, setNewSelected] = useState<boolean>(false);

  const toast = useToast();

  const _handleDayClick = (current: dayjs.Dayjs | any) => {
    const momentNow = dayjs().format('YYYY-MM-DD');
    const selecetMoment = dayjs(current).format('YYYY-MM-DD');

    setDate(current);

    if (handleDayClick) {
      if (selecetMoment < momentNow) {
      } else {
        handleDayClick(current);
      }
    }
  };

  function generate() {
    const today = date;
    const daily = moment();
    // startOf('month') : 이번 달의 첫번 째 날로 설정 set to the first of this month, 12:00 am
    // week() : Week of Year. 이번 년도의 몇번째 주인가? => 3월 8일이면 10이겠죠?
    const startWeek = today.clone().startOf('month').week();

    // endOf('month').week() : 이번 달의 마지막 날로 설정 한 후 그것이 이번 년도의 몇번째 주인지 체크
    // 만약 이번 해의 첫번째 주(1월 1일이 속한 주)라면 53으로 세팅, 아니라면 그대로 유지
    // 이런 작업의 이유는 마지막 주가 첫 주가 될 수 없기 때문에 당연한 것임
    const endWeek =
      today.clone().endOf('month').week() === 1
        ? 53
        : today.clone().endOf('month').week();

    const calendar = [];

    // 시작 주부터 마지막 주까지 +1 씩 증가시킴
    // 이제 주마다 일을 표기해야 하므로 len이 7인 arr를 생성 후 index를 기반으로 day를 표기하자
    for (let week = startWeek; week <= endWeek; week++) {
      // DateList.map((item) =>
      calendar.push(
        <Flex
          key={week}
          background={ColorWhite}
          justifyContent="center"
          alignItems="center"
        >
          {Array(7)
            .fill(0)
            .map((n, i) => {
              // 오늘 => 주어진 주의 시작 => n + i일 만큼 더해서 각 주의 '일'을 표기한다.
              const current = today
                .clone()
                .week(week)
                .startOf('week')
                .add(n + i, 'day');
              // 오늘이 current와 같다면 우선 '선택'으로 두자
              const isSelected =
                daily.format('YYYYMMDD') === current.format('YYYYMMDD')
                  ? 'selected'
                  : '';

              // 만약, 이번 달이 아닌 다른 달의 날짜라면 회색으로 표시하자
              const isRed = i === 0;
              const isGrayed =
                current.format('MM') !== today.format('MM') ? 'grayed' : '';

              const isBlakced =
                minDateTime !== undefined &&
                minDateTime !== '' &&
                minDateTime !== 'Invalid Date'
                  ? moment(minDateTime).format('YYYYMMDD') <=
                    current.format('YYYYMMDD')
                  : maxDateTime !== undefined &&
                    maxDateTime !== '' &&
                    maxDateTime !== 'Invalid Date'
                  ? moment(maxDateTime).format('YYYYMMDD') >=
                    current.format('YYYYMMDD')
                  : current.format('YYYYMMDD');
              return (
                <Flex
                  key={current.format('YYYYMMDD')}
                  onClick={() => {
                    if (minDateTime !== '' && minDateTime !== undefined) {
                      //maxDateTime 가 있을때
                      if (maxDateTime !== '' && maxDateTime !== undefined) {
                        if (dayjs(current).format('YYYY-MM-DD') > maxDateTime) {
                          toast({
                            position: 'top',
                            duration: 1000,
                            render: () => (
                              <Box
                                style={{ borderRadius: 8 }}
                                p={3}
                                color="white"
                                bg="#ff6955"
                              >
                                종료 날짜 이후 날짜는 선택할 수 없습니다.
                              </Box>
                            ),
                          });
                        } else {
                          onDayClick && onDayClick(current);
                          _handleDayClick(current);
                          setNewSelected(true);
                        }
                      } else {
                        //maxDateTime 가 없을떼
                        if (dayjs(current).format('YYYY-MM-DD') < minDateTime) {
                          toast({
                            position: 'top',
                            duration: 1000,
                            render: () => (
                              <Box
                                style={{ borderRadius: 8 }}
                                p={3}
                                color="white"
                                bg="#ff6955"
                              >
                                시작 날짜보다 이전 날짜는 선택할 수 없습니다.
                              </Box>
                            ),
                          });
                        } else {
                          onDayClick && onDayClick(current);
                          _handleDayClick(current);
                          setNewSelected(true);
                        }
                      }
                    } else if (
                      maxDateTime !== '' &&
                      maxDateTime !== undefined
                    ) {
                      if (dayjs(current).format('YYYY-MM-DD') > maxDateTime) {
                        toast({
                          position: 'top',
                          duration: 1000,
                          render: () => (
                            <Box
                              style={{ borderRadius: 8 }}
                              p={3}
                              color="white"
                              bg="#ff6955"
                            >
                              종료 날짜 이후 날짜는 선택할 수 없습니다.
                            </Box>
                          ),
                        });
                      } else {
                        onDayClick && onDayClick(current);
                        _handleDayClick(current);
                        setNewSelected(true);
                      }
                    } else {
                      onDayClick && onDayClick(current);
                      _handleDayClick(current);
                      setNewSelected(true);
                    }
                    // if (minDateTime != '' && minDateTime !== undefined) {
                    //   if (dayjs(current).format('YYYY-MM-DD') < minDateTime) {
                    //     toast({
                    //       position: 'top',
                    //       duration: 1000,
                    //       render: () => (
                    //         <Box
                    //           style={{ borderRadius: 8 }}
                    //           p={3}
                    //           color="white"
                    //           bg="#ff6955"
                    //         >
                    //           시작 날짜보다 이전 날짜는 선택할 수 없습니다.
                    //         </Box>
                    //       ),
                    //     });
                    //   } else {
                    //     onDayClick && onDayClick(current);
                    //     _handleDayClick(current);
                    //     setNewSelected(true);
                    //   }
                    // } else if (maxDateTime != '' && maxDateTime !== undefined) {
                    //   if (dayjs(current).format('YYYY-MM-DD') > maxDateTime) {
                    //     toast({
                    //       position: 'top',
                    //       duration: 1000,
                    //       render: () => (
                    //         <Box
                    //           style={{ borderRadius: 8 }}
                    //           p={3}
                    //           color="white"
                    //           bg="#ff6955"
                    //         >
                    //           종료 날짜 이후 날짜는 선택할 수 없습니다.
                    //         </Box>
                    //       ),
                    //     });
                    //   } else {
                    //     onDayClick && onDayClick(current);
                    //     _handleDayClick(current);
                    //     setNewSelected(true);
                    //   }
                    // } else {
                    //   onDayClick && onDayClick(current);
                    //   _handleDayClick(current);
                    //   setNewSelected(true);
                    // }
                  }}
                  cursor="pointer"
                  background={ColorWhite}
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={'50%'}
                  w="44px"
                  h="44px"
                  bg={
                    newSelected &&
                    current.format('YYYYMMDD') == date.format('YYYYMMDD')
                      ? ColorRed
                      : ColorWhite
                  }
                >
                  <Flex
                    w="44px"
                    h="44px"
                    fontSize="14px"
                    justifyContent="center"
                    alignItems="center"
                    borderWidth={isSelected ? '1px' : '0px'}
                    borderColor={isSelected ? 'black' : ''}
                    borderRadius={isSelected ? '100%' : '50%'}
                    color={
                      isRed
                        ? ColorRed
                        : newSelected &&
                          current.format('YYYYMMDD') == date.format('YYYYMMDD')
                        ? 'white'
                        : isGrayed
                        ? 'gray.200'
                        : isBlakced
                        ? 'black'
                        : 'gray.500'
                    }
                  >
                    {current.format('D')}
                  </Flex>
                </Flex>
              );
            })}
        </Flex>,
        // ),
      );
    }

    const rowCnt = endWeek - startWeek + 1;
    return (
      <PickerGrid
        templateRows={`repeat(${rowCnt}, 1fr)`}
        height={`${rowCnt * 44}px`}
      >
        {calendar}
      </PickerGrid>
    );
  }

  return (
    <div>
      <CalendarHeader date={date} setDate={setDate} />
      <PickerGrid templateColumns={'repeat(7, 1fr)'}>
        {['일', '월', '화', '수', '목', '금', '토'].map((el) => (
          <PickerGridItem w="42.8px" h="44px" key={el} color="gray.700">
            {el}
          </PickerGridItem>
        ))}
      </PickerGrid>
      {generate()}
    </div>
  );
};

export default Picker;
