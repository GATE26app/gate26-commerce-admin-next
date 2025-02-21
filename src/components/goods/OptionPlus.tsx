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
import OptionPreview from '@/components/goods/OptionPreview';

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
  const [optionPreviews, setOptionPreviews] = useState<Option[]>([]);

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
      setOptionInputType(list.optionInputType);
    }
  }, [list]);

  useEffect(() => {
    if (pathname !== '/createGoods') {
      if (optionInputList.length > 0) {
        const nameList: string[] = [];
        const valueList: string[] = [];

        setOptionCnt(String(optionInputList.length));
        optionInputList.forEach((item) => {
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

  // 옵션 일괄 수정 후 생성하기 위함
  const handleOptionPreview = () => {
    if (optionNames[0] == '') {
      ToastComponent('옵션명을 입력해주세요.');
    } else if (optionValues[0] == '') {
      ToastComponent('옵션값을 입력해주세요.');
    } else {
      // 단독형
      if (optionInputType == 0) {
        let optionPreviews: Option[] = [];
        optionNames.forEach((name, index) => {
          const values = optionValues[index].split(','); // 문자열을 배열로 변환
          if (values.includes('') || values.includes(' ')) {
            ToastComponent('옵션값을 다시 확인해주세요.');
          } else {
            values.forEach((value) => {
              optionPreviews.push({
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
        setOptionPreviews(optionPreviews);
        // 조합형
      } else {
        if (Number(optionCnt) == 1) {
          handleFirstOptionPreview();
        } else if (Number(optionCnt) == 2) {
          handleSecondOptionPreview();
        } else if (Number(optionCnt) == 3) {
          handleThirdOptionPreview();
        }
      }
    }
  }

  const handleFirstOptionPreview = () => {
    let optionPreviews: Option[] = [];
    const firstOptions = optionValues[0].split(',');
    if (firstOptions.includes('') || firstOptions.includes(' ')) {
      ToastComponent('옵션값을 다시 확인해주세요.');
      return;
    }

    firstOptions.forEach((firstValue) => {
      optionPreviews.push({
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

    setOptionPreviews(optionPreviews);
  };

  const handleSecondOptionPreview = () => {
    let optionPreviews: Option[] = [];
    const firstOptions = optionValues[0].split(',');
    const secondOptions = optionValues[1].split(',');
    if (
      firstOptions.includes('') ||
      secondOptions.includes('') ||
      firstOptions.includes(' ') ||
      secondOptions.includes(' ')
    ) {
      ToastComponent('옵션값을 다시 확인해주세요.');
      return;
    }

    for (const firstValue of firstOptions) {
      for (const secondValue of secondOptions) {
        optionPreviews.push({
          type: optionType,
          depth: optionInputType == 0 ? 1 : Number(optionCnt),
          useDateTime: `${DateList[0]} 12:00:00`,
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
      }
    }
    console.log('firstOptions', firstOptions);
    console.log('secondOptions', secondOptions);

    setOptionPreviews(optionPreviews);
  };

  const handleThirdOptionPreview = () => {
    let optionPreviews: Option[] = [];
    const firstOptions = optionValues[0].split(',');
    const secondOptions = optionValues[1].split(',');
    const thirdOptions = optionValues[2].split(',');
    if (
      firstOptions.includes('') ||
      secondOptions.includes('') ||
      thirdOptions.includes('') ||
      firstOptions.includes(' ') ||
      secondOptions.includes(' ') ||
      thirdOptions.includes(' ')
    ) {
      ToastComponent('옵션값을 다시 확인해주세요.');
      return;
    }

    for (const firstValue of firstOptions) {
      for (const secondValue of secondOptions) {
        for (const thirdValue of thirdOptions) {
          optionPreviews.push({
            type: optionType,
            depth: optionInputType == 0 ? 1 : Number(optionCnt),
            useDateTime: `${DateList[0]} 12:00:00`,
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
        }
      }
    }

    setOptionPreviews(optionPreviews);
  };

  const setOptionArray = (date?: string) => {
    return optionPreviews.map((optionPreview, idx) => ({
      sort: idx,
      type: optionType,
      depth: optionInputType == 0 ? 1 : Number(optionCnt),
      useDateTime: date ? `${date} 12:00:00` : '',
      firstKey: optionPreview.firstKey,
      firstValue: optionPreview.firstValue,
      secondKey: optionPreview.secondKey,
      secondValue: optionPreview.secondValue,
      thirdKey: optionPreview.thirdKey,
      thirdValue: optionPreview.thirdValue,
      stockCnt: optionPreview.stockCnt,
      price: optionPreview.price,
    }))
  }

  const handleApplyOptionPreviews = () => {
    let resultArray: Option[] = [];

    if (DateList.length > 0) {
      DateList.forEach((date) => {
        resultArray.push(...setOptionArray(date));
      });
    } else {
      resultArray = setOptionArray();
    }

    setList({ ...list, optionInputType: optionInputType });
    setOptionList(resultArray);
    setOptions(resultArray);
  }

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
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>


      {!goodsInfo.LogItemDisable && (
        <Flex justifyContent={'center'} mb={'30px'}>
          <CustomButton
            text="옵션 미리보기 및 가격/재고 조정"
            fontSize={'15px'}
            color={ColorWhite}
            bgColor={ColorGray900}
            borderColor={ColorGray900}
            px="46px"
            py="14px"
            onClick={() => handleOptionPreview()}
          />
        </Flex>
      )}

      {optionPreviews.length ?
        <OptionPreview list={list} optionList={optionList} optionPreviews={optionPreviews} setOptionPreviews={setOptionPreviews}></OptionPreview>
        : null}

      {(!goodsInfo.LogItemDisable && optionPreviews.length) ? (
        <Flex flexDir={'column'}>
          <Text fontSize={'14px'} fontWeight={300} color={ColorBlack} textAlign={'center'} mb={10}>
            * 생성된 옵션항목에 일괄적용됩니다. 아래 테이블에서
            개별수정가능합니다.
          </Text>
          <Flex justifyContent={'center'}>
            <CustomButton
              text="+ 목록에 적용"
              fontSize={'15px'}
              color={ColorWhite}
              bgColor={ColorGray900}
              borderColor={ColorGray900}
              px="46px"
              py="14px"
              onClick={() => handleApplyOptionPreviews()}
            />
          </Flex>
        </Flex>
      ) : null}
    </>
  );
}

export default memo(OptionPlus);
