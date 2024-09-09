import { usePathname, useSearchParams } from 'next/navigation';
import React, { memo, useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import {
  GoodsBasicProps,
  optionInputsProps,
} from '@/app/apis/goods/GoodsApi.type';

import CustomButton from '@/components/common/CustomButton';
import RadioComponent from '@/components/common/CustomRadioButton/RadioComponent';
import DatePicker from '@/components/common/DatePicker';
import InputBox from '@/components/common/Input';

import {
  ColorBlack,
  ColorGray900,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { intComma } from '@/utils/format';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import SelectBox from '../common/SelectBox/SelectBox';

interface Option {
  sort: number;
  type: number;
  depth: number;
  useDateTime: string;
  firstKey: string;
  firstValue: string;
  secondKey: string;
  secondValue: string;
  thirdKey: string;
  thirdValue: string;
  stockCnt: number;
  price: number;
}
interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
  optionList: Array<Option>;
  setOptionList: React.Dispatch<React.SetStateAction<Option[]>>;
  optionInputList: Array<optionInputsProps>;
  setOptionInputList: React.Dispatch<React.SetStateAction<optionInputsProps[]>>;
}
export type { Option };
const optionCntList = ['1', '2', '3'];
function OptionPlus({
  list,
  setList,
  optionList,
  setOptionList,
  optionInputList,
  setOptionInputList,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getType = searchParams.get('type');
  const [startDay, setStartDay] = useState<dayjs.Dayjs>(() =>
    dayjs(new Date()),
  );
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);

  const [endDay, setEndDay] = useState<dayjs.Dayjs>(() =>
    dayjs(new Date()).add(7, 'day'),
  );
  const [DateList, setDateList] = useState<string[]>([]);
  const [optionType, setOptionType] = useState<number>(list.optionType); //옵션형, 날짜지정형
  const [optionInputType, setOptionInputType] = useState<number>(0); //상품 옵션유형 단독형, 조합형
  const [optionCnt, setOptionCnt] = useState<string>('1');
  const [options, setOptions] = useState<Option[]>([]);
  const [optionNames, setOptionNames] = useState<string[]>([]);
  const [optionValues, setOptionValues] = useState<string[]>(
    Array(optionCnt).fill(''),
  );

  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const toast = useToast();
  const ToastComponent = (message: string) => {
    return toast({
      position: 'top',
      duration: 2000,
      render: () => (
        <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
          {`${message}`}
        </Box>
      ),
    });
  };
  useEffect(() => {
    if (optionList.length > 0) {
      setStartDay(dayjs(optionList[0]?.useDateTime));
      setEndDay(dayjs(optionList[optionList.length - 1]?.useDateTime));
    }
  }, [optionList]);

  useEffect(() => {
    if (list.optionType) {
      setOptionType(list.optionType);
    }
  }, [list]);
  // useEffect(() => {
  //   if (router.query.type == '3' || router.query.type == '2') {
  //     setList({ ...list, optionType: 2 });
  //   }
  // }, [router.query.type]);

  useEffect(() => {
    if (pathname !== '/createGoods') {
      if (optionInputList.length > 0) {
        // if()
        const nameList: string[] = [];
        const valueList: string[] = [];

        setOptionCnt(String(optionInputList.length));
        optionInputList.forEach((item) => {
          // if (item.inputKey !== '' && item.inputValue !== '') {
          nameList.push(item.inputKey);
          valueList.push(item.inputValue);
          // }
          setOptionNames(nameList);
          setOptionValues(valueList);
        });
      }
    }
  }, [optionInputList]);

  useEffect(() => {
    if (optionType == 2) {
      getDatesBetween(
        startDay.format('YYYY-MM-DD'),
        endDay.format('YYYY-MM-DD'),
      );
    } else {
      setDateList([]);
    }
  }, [optionType]);

  useEffect(() => {
    if (
      dayjs(endDay).format('YYYY-MM-DD') !==
      dayjs(new Date()).format('YYYY-MM-DD')
    ) {
      if (optionType == 2) {
        getDatesBetween(
          startDay.format('YYYY-MM-DD'),
          endDay.format('YYYY-MM-DD'),
        );
      }
    }
    if (optionType !== 1 && startDay) {
      getDatesBetween(
        startDay.format('YYYY-MM-DD'),
        endDay.format('YYYY-MM-DD'),
      );
    }
    if (optionType !== 1 && endDay) {
      getDatesBetween(
        startDay.format('YYYY-MM-DD'),
        endDay.format('YYYY-MM-DD'),
      );
    }
  }, [startDay, endDay]);
  function getDatesBetween(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    // start date와 end date 사이의 모든 날짜를 구하기
    while (start <= end) {
      let year = start.getFullYear();
      let month = (start.getMonth() + 1).toString().padStart(2, '0');
      let day = start.getDate().toString().padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
      // 다음 날짜로 넘어가기
      start.setDate(start.getDate() + 1);
    }
    setDateList(dates);
    return dates;
  }

  useEffect(() => {
    if (optionList.length > 0) {
      optionList.map((item, index) => {
        item.sort = index + 1;
      });
    }
  }, [optionList]);

  //옵션 선택
  const handleOptionSubmit = () => {
    if (optionNames[0] == '') {
      ToastComponent('옵션명을 입력해주세요.');
    } else if (optionValues[0] == '') {
      ToastComponent('옵션값을 입력해주세요.');
    }
    // else if (price.length == 0) {
    //   ToastComponent('가격을 입력해주세요.');
    // } else if (stock == 0) {
    //   ToastComponent('재고를 입력해주세요.');
    // }
    else {
      // setOptionList([]);
      // setOptions([])
      setList({ ...list, optionInputType: optionInputType });
      if (optionInputType == 0) {
        // 단독형
        let resultArray: Option[] = [];
        if (DateList.length > 0) {
          DateList.forEach((date) => {
            optionNames.forEach((name, index) => {
              const values = optionValues[index].split(','); // 문자열을 배열로 변환
              if (values.includes('') || values.includes(' ')) {
                ToastComponent('옵션값을 다시 확인해주세요.');
              } else {
                values.forEach((value) => {
                  resultArray.push({
                    sort: index,
                    type: optionType,
                    depth: optionInputType == 0 ? 1 : Number(optionCnt),
                    useDateTime: `${date} 12:00:00`,
                    firstKey: name,
                    firstValue: value.trim(),
                    secondKey: '',
                    secondValue: '',
                    thirdKey: '',
                    thirdValue: '',
                    stockCnt: stock == 0 ? 0 : stock,
                    price: price == 0 ? 0 : price,
                  });
                });
              }
            });
          });
          if (resultArray.length > 500) {
            ToastComponent('500개 이하의 옵션을 선택해주세요.');
          } else {
            setOptionList(resultArray);
            setOptions(resultArray);
          }
        } else {
          optionNames.forEach((name, index) => {
            const values = optionValues[index].split(','); // 문자열을 배열로 변환
            if (values.includes('') || values.includes(' ')) {
              ToastComponent('옵션값을 다시 확인해주세요.');
            } else {
              values.forEach((value) => {
                resultArray.push({
                  sort: index,
                  type: optionType,
                  depth: optionInputType == 0 ? 1 : Number(optionCnt),
                  useDateTime: '',
                  firstKey: name,
                  firstValue: value.trim(),
                  secondKey: '',
                  secondValue: '',
                  thirdKey: '',
                  thirdValue: '',
                  stockCnt: stock == 0 ? 0 : stock,
                  price: price == 0 ? 0 : price,
                });
              });
            }
          });
          if (resultArray.length > 500) {
            ToastComponent('500개 이하의 옵션을 선택해주세요.');
          } else {
            setOptionList(resultArray);
            setOptions(resultArray);
          }
        }
      } else {
        if (Number(optionCnt) == 1) {
          handleFirstValueChange();
        } else if (Number(optionCnt) == 2) {
          handleSecondValueChange();
        } else if (Number(optionCnt) == 3) {
          handleThirdValueChange();
        }
      }
    }
  };
  const handleFirstValueChange = () => {
    let resultArray: Option[] = [];
    const firstOptions = optionValues[0].split(',');
    if (DateList.length > 0) {
      DateList.forEach((date) => {
        if (firstOptions.includes('') || firstOptions.includes(' ')) {
          ToastComponent('옵션값을 다시 확인해주세요.');
        } else {
          firstOptions.forEach((firstValue) => {
            resultArray.push({
              sort: 1,
              type: optionType,
              depth: optionInputType == 0 ? 1 : Number(optionCnt),
              useDateTime: `${date} 12:00:00`,
              firstKey: optionNames[0],
              firstValue: firstValue.trim(),
              secondKey: '',
              secondValue: '',
              thirdKey: '',
              thirdValue: '',
              stockCnt: stock == 0 ? 0 : stock,
              price: price == 0 ? 0 : price,
            });
          });
        }
      });
      if (resultArray.length > 500) {
        ToastComponent('500개 이하의 옵션을 선택해주세요.');
      } else {
        setOptionList(resultArray);
        setOptions(resultArray);
      }
    } else {
      if (firstOptions.includes('') || firstOptions.includes(' ')) {
        ToastComponent('옵션값을 다시 확인해주세요.');
      } else {
        firstOptions.forEach((firstValue) => {
          resultArray.push({
            type: optionType,
            depth: optionInputType == 0 ? 1 : Number(optionCnt),
            useDateTime: '',
            firstKey: optionNames[0],
            firstValue: firstValue.trim(),
            secondKey: '',
            secondValue: '',
            thirdKey: '',
            thirdValue: '',
            sort: 1,
            stockCnt: stock == 0 ? 0 : stock,
            price: price == 0 ? 0 : price,
          });
        });
      }
      if (resultArray.length > 500) {
        ToastComponent('500개 이하의 옵션을 선택해주세요.');
      } else {
        setOptionList(resultArray);
        setOptions(resultArray);
      }
    }
  };

  const handleSecondValueChange = () => {
    let resultArray: Option[] = [];
    const firstOptions = optionValues[0].split(',');
    const secondOptions = optionValues[1].split(',');
    if (DateList.length > 0) {
      DateList.forEach((date) => {
        if (
          firstOptions.includes('') ||
          secondOptions.includes('') ||
          firstOptions.includes(' ') ||
          secondOptions.includes(' ')
        ) {
          ToastComponent('옵션값을 다시 확인해주세요.');
        } else {
          firstOptions.forEach((firstValue) => {
            secondOptions.forEach((secondValue) => {
              resultArray.push({
                type: optionType,
                depth: optionInputType == 0 ? 1 : Number(optionCnt),
                useDateTime: `${date} 12:00:00`,
                firstKey: optionNames[0],
                firstValue: firstValue.trim(),
                secondKey: optionNames[1],
                secondValue: secondValue.trim(),
                thirdKey: '',
                thirdValue: '',
                sort: 1,
                stockCnt: stock == 0 ? 0 : stock,
                price: price == 0 ? 0 : price,
              });
            });
          });
        }
      });
      if (resultArray.length > 500) {
        ToastComponent('500개 이하의 옵션을 선택해주세요.');
      } else {
        setOptionList(resultArray);
        setOptions(resultArray);
      }
    } else {
      if (
        firstOptions.includes('') ||
        secondOptions.includes('') ||
        firstOptions.includes(' ') ||
        secondOptions.includes(' ')
      ) {
        ToastComponent('옵션값을 다시 확인해주세요.');
      } else {
        firstOptions.forEach((firstValue) => {
          secondOptions.forEach((secondValue) => {
            resultArray.push({
              type: optionType,
              depth: optionInputType == 0 ? 1 : Number(optionCnt),
              useDateTime: '',
              firstKey: optionNames[0],
              firstValue: firstValue.trim(),
              secondKey: optionNames[1],
              secondValue: secondValue.trim(),
              thirdKey: '',
              thirdValue: '',
              sort: 1,
              stockCnt: stock == 0 ? 0 : stock,
              price: price == 0 ? 0 : price,
            });
          });
        });

        if (resultArray.length > 500) {
          ToastComponent('500개 이하의 옵션을 선택해주세요.');
        } else {
          setOptionList(resultArray);
          setOptions(resultArray);
        }
      }
    }
  };

  const handleThirdValueChange = () => {
    let resultArray: Option[] = [];
    const firstOptions = optionValues[0].split(',');
    const secondOptions = optionValues[1].split(',');
    const thirdOptions = optionValues[2].split(',');
    if (DateList.length > 0) {
      DateList.forEach((date) => {
        if (
          firstOptions.includes('') ||
          secondOptions.includes('') ||
          thirdOptions.includes('') ||
          firstOptions.includes(' ') ||
          secondOptions.includes(' ') ||
          thirdOptions.includes(' ')
        ) {
          ToastComponent('옵션값을 다시 확인해주세요.');
        } else {
          firstOptions.forEach((firstValue) => {
            secondOptions.forEach((secondValue) => {
              thirdOptions.forEach((thirdValue) => {
                resultArray.push({
                  type: optionType,
                  depth: optionInputType == 0 ? 1 : Number(optionCnt),
                  useDateTime: `${date} 12:00:00`,
                  firstKey: optionNames[0],
                  firstValue: firstValue.trim(),
                  secondKey: optionNames[1],
                  secondValue: secondValue.trim(),
                  thirdKey: optionNames[2],
                  thirdValue: thirdValue.trim(),
                  sort: 1,
                  stockCnt: stock == 0 ? 0 : stock,
                  price: price == 0 ? 0 : price,
                });
              });
            });
          });
        }
      });
      if (resultArray.length > 500) {
        ToastComponent('500개 이하의 옵션을 선택해주세요.');
      } else {
        setOptionList(resultArray);
        setOptions(resultArray);
      }
    } else {
      if (
        firstOptions.includes('') ||
        secondOptions.includes('') ||
        thirdOptions.includes('') ||
        firstOptions.includes(' ') ||
        secondOptions.includes(' ') ||
        thirdOptions.includes(' ')
      ) {
        ToastComponent('옵션값을 다시 확인해주세요.');
      } else {
        firstOptions.forEach((firstValue) => {
          secondOptions.forEach((secondValue) => {
            thirdOptions.forEach((thirdValue) => {
              resultArray.push({
                type: optionType,
                depth: optionInputType == 0 ? 1 : Number(optionCnt),
                useDateTime: '',
                firstKey: optionNames[0],
                firstValue: firstValue.trim(),
                secondKey: optionNames[1],
                secondValue: secondValue.trim(),
                thirdKey: optionNames[2],
                thirdValue: thirdValue.trim(),
                sort: 1,
                stockCnt: stock == 0 ? 0 : stock,
                price: price == 0 ? 0 : price,
              });
            });
          });
        });
      }
      if (resultArray.length > 500) {
        ToastComponent('500 이하의 옵션을 선택해주세요.');
      } else {
        setOptionList(resultArray);
        setOptions(resultArray);
      }
    }
  };

  const handleOptionCountChange = (num: number) => {
    const count: number = num;
    setOptionCnt(String(count));
    // setOptionInputList(
    //   Array(count).fill({
    //     sort: count,
    //     inputKey: '',
    //     inputValue: '',
    //   }),
    // );
    const newItems = Array.from({ length: num }, (_, index) => ({
      sort: index + 1,
      inputKey: '',
      inputValue: '',
    }));
    setOptionInputList(newItems);
    setOptionNames(Array(count).fill(''));
    // set[]
    setOptionValues(Array(count).fill(''));
  };

  const handleOptionNameChange = (index: number, value: string) => {
    const newNames: string[] = [...optionNames];
    const updateKey: optionInputsProps[] = [...optionInputList];
    newNames[index] = value;
    updateKey[index].inputKey = value;
    setOptionInputList(updateKey);
    setOptionNames(newNames);
  };

  const handleOptionValueChange = (index: number, value: string) => {
    const newValues: string[] = [...optionValues];
    const updateKey: optionInputsProps[] = [...optionInputList];
    newValues[index] = value;
    updateKey[index].inputValue = value;
    setOptionValues(newValues);
    setOptionInputList(updateKey);
  };
  const handlePriceChange = (text: number) => {
    setPrice(text);
  };

  const handleStockChange = (text: string) => {
    setStock(text == '' ? 0 : parseInt(text));
  };

  return (
    <>
      <Flex
        flexDirection={'row'}
        mb={'30px'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={'10px'}
      >
        <Flex w={'200px'}>
          <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
            옵션 유형
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
        <Flex flexWrap={'wrap'}>
          {getType !== '3' && (
            <Flex w={'200px'}>
              <RadioComponent
                text="옵션형"
                disabled={goodsInfo.LogItemDisable}
                checked={optionType == 1 ? true : false}
                onClick={() => {
                  setList({ ...list, optionType: 1 });
                  setOptionType(1);
                  setDateList([]);
                }}
              />
            </Flex>
          )}

          {(getType == '3' || getType == '2') && (
            <Flex w={'200px'}>
              <RadioComponent
                text="날짜지정형"
                disabled={goodsInfo.LogItemDisable}
                checked={
                  getType == '3' && optionType == 2
                    ? true
                    : optionType == 2 && getType !== '3'
                    ? true
                    : false
                }
                onClick={() => {
                  setOptionType(2);
                  setList({ ...list, optionType: 2 });
                }}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      {optionType == 2 && (
        <Flex
          flexDirection={'row'}
          mb={'30px'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={'10px'}
        >
          <Flex w={'200px'}>
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              판매 기간
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
          <Flex gap={'5px'} alignItems={'center'}>
            <DatePicker
              type={'date'}
              curDate={startDay}
              width={'200px'}
              onApply={(date) => {
                setStartDay(date);
                setList({
                  ...list,
                  optionInputStartDate: `${dayjs(date).format(
                    'YYYY-MM-DD',
                  )} 12:00:00`,
                });
              }}
            />
            <Text color={ColorBlack} fontSize={'15px'} fontWeight={500}>
              ~
            </Text>
            <DatePicker
              type={'date'}
              curDate={endDay}
              minDateTime={startDay.format('YYYY-MM-DD')}
              width={'200px'}
              onApply={(date) => {
                setEndDay(date);
                setList({
                  ...list,
                  optionInputStartDate: `${dayjs(date).format(
                    'YYYY-MM-DD',
                  )} 23:59:59`,
                });
              }}
            />
          </Flex>
        </Flex>
      )}

      <Flex
        flexDirection={'row'}
        mb={'30px'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={'10px'}
      >
        <Flex w={'200px'}>
          <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
            옵션 타입
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
        <Flex>
          <Flex w={'200px'}>
            <RadioComponent
              text="단독형"
              checked={optionInputType == 0 ? true : false}
              disabled={goodsInfo.LogItemDisable}
              onClick={() => {
                setOptionInputType(0);
                // if (list.optionInputType == 1) {
                setOptionList([]);
                setOptions([]);
                setOptionCnt('1');
                setOptionInputList([
                  {
                    sort: 1,
                    inputKey: '',
                    inputValue: '',
                  },
                ]);
                setOptionNames(['']);
                setOptionValues(['']);
                setPrice(0);
                setStock(0);
                // }

                // setList({ ...list, optionInputType: 0 });
              }}
            />
          </Flex>
          <Flex w={'200px'}>
            <RadioComponent
              text="조합형"
              disabled={goodsInfo.LogItemDisable}
              checked={optionInputType == 1 ? true : false}
              onClick={() => {
                setOptionInputType(1);
                // if (list.optionInputType == 0) {
                setOptionList([]);
                setOptions([]);
                setOptionCnt('1');
                setOptionInputList([
                  {
                    sort: 1,
                    inputKey: '',
                    inputValue: '',
                  },
                ]);
                setOptionNames(['']);
                setOptionValues(['']);
                setPrice(0);
                setStock(0);
                // }

                // setList({ ...list, optionInputType: 1 });
              }}
            />
          </Flex>
        </Flex>
      </Flex>
      {optionInputType == 1 && (
        <Flex
          flexDirection={'row'}
          mb={'30px'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={'10px'}
        >
          <Flex w={'200px'}>
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              옵션명 개수
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
          <Flex w={'200px'}>
            <SelectBox
              placeholder="옵션갯수"
              width={'200px'}
              list={optionCntList}
              select={optionCnt}
              setSelect={setOptionCnt}
              disable={goodsInfo.LogItemDisable}
              onClick={(data: string) => {
                handleOptionCountChange(Number(data));
              }}
            />
            {/* <NumberInput
            min={1}
            defaultValue={optionCnt}
            borderRadius={'10px'}
            max={3}
            onChange={(e) => handleOptionCountChange(Number(e))}
            // borderColor={ColorInputBorder}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput> */}
          </Flex>
        </Flex>
      )}

      <Flex
        flexDirection={'row'}
        mb={'30px'}
        alignItems={'center'}
        gap={'10px'}
      >
        <Flex w={'200px'} flexShrink={0}>
          <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
            옵션 입력
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
        <Flex flexDirection={'column'}>
          {Array.from({ length: Number(optionCnt) }, (_, index) => (
            <Flex gap={'10px'} mb={'10px'} key={index}>
              <Flex w={'300px'} flexDirection={'column'}>
                <Text
                  color={ColorBlack}
                  fontWeight={700}
                  fontSize={'16px'}
                  mb={'5px'}
                >
                  옵션명
                </Text>
                <InputBox
                  placeholder="예) 색상"
                  value={optionNames[index]}
                  disabled={goodsInfo.LogItemDisable}
                  onChange={(e: any) =>
                    handleOptionNameChange(index, e.target.value)
                  }
                  // value={item.optionName}
                  // onChange={(e) => handleOptionValueChange(index, e.target.value)}
                />
              </Flex>
              <Flex w={'300px'} flexDirection={'column'}>
                <Text
                  color={ColorBlack}
                  fontWeight={700}
                  fontSize={'16px'}
                  mb={'5px'}
                >
                  옵션값
                </Text>
                <InputBox
                  placeholder="예) 파랑, 노랑, 빨강, 콤마로 구분해서 입력"
                  value={optionValues[index]}
                  disabled={goodsInfo.LogItemDisable}
                  onChange={(e: any) =>
                    handleOptionValueChange(index, e.target.value)
                  }
                  // onChange={(e) => onChangeData('value', index, e)}
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex
        flexDirection={'row'}
        mb={'30px'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={'10px'}
      >
        <Flex w={'200px'}>
          <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
            판매금액/재고
          </Text>
        </Flex>
        <Flex gap={'10px'} flexDirection={'column'}>
          <Flex flexDirection={'row'} gap={'10px'}>
            <Flex w={'200px'} flexDirection={'column'}>
              <Text
                color={ColorBlack}
                fontWeight={700}
                fontSize={'16px'}
                mb={'5px'}
              >
                판매금액
              </Text>
              <InputBox
                placeholder="숫자입력"
                type="text"
                maxLength={15}
                value={intComma(String(price))}
                disabled={goodsInfo.LogItemDisable}
                // onChange={handlePriceChange}
                onChange={(e: any) => {
                  handlePriceChange(
                    Number(e.target.value.replace(/[^0-9]/g, '')),
                  );
                }}
              />
            </Flex>

            <Flex w={'200px'} flexDirection={'column'}>
              <Text
                color={ColorBlack}
                fontWeight={700}
                fontSize={'16px'}
                mb={'5px'}
              >
                재고
              </Text>
              <InputBox
                maxLength={8}
                placeholder="숫자 입력"
                // type="number"
                type="text"
                value={intComma(stock) == 'NaN' ? 0 : intComma(stock)}
                disabled={goodsInfo.LogItemDisable}
                onChange={(e: any) => {
                  handleStockChange(e.target.value.replace(/[^0-9]/g, ''));
                }}
              />
            </Flex>
          </Flex>
          <Text fontSize={'14px'} fontWeight={300} color={ColorBlack}>
            * 생성된 옵션항목에 일관적용됩니다. 아래 테이블에서
            개별수정가능합니다.
          </Text>
        </Flex>
      </Flex>
      {!goodsInfo.LogItemDisable && (
        <Flex justifyContent={'center'}>
          <CustomButton
            text="+ 목록에 적용"
            fontSize={'15px'}
            color={ColorWhite}
            bgColor={ColorGray900}
            borderColor={ColorGray900}
            px="46px"
            py="14px"
            onClick={() => handleOptionSubmit()}
          />
        </Flex>
      )}
    </>
  );
}

export default memo(OptionPlus);
