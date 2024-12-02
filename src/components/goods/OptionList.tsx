import React, { memo, useEffect, useRef, useState } from 'react';

import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';

import { GoodsBasicProps } from '@/app/apis/goods/GoodsApi.type';

import CustomButton from '@/components/common/CustomButton';

import {
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorMainBackBule,
  ColorWhite,
  ColorRedOpa,
  ColorBackBlue
} from '@/utils/_Palette';

import { Option } from './OptionPlus';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import EditableInputBox from './CreateGoods/EditableInputBox';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'
import InputBox from '@/components/common/Input';

dayjs.locale('ko')

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
  optionList: Option[];
  setOptionList: any;
}
function OptionList({ list, setList, optionList, setOptionList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [focus, setFocus] = useState(false);
  const [stock, setStock] = useState('');
  const [price, setprice] = useState('');
  const [stockState, setStockState] = useState(false);
  const [priceState, setPriceState] = useState(false);
  const onDeleteOption = (id: number) => {
    setOptionList(
      optionList.filter((item: Option, index: number) => index !== id),
    );
  };
  const stockRef = useRef(null);
  const [indexCnt, setIndexCnt] = useState(0);
  const [bulkOptionPrice, setBulkOptionPrice] = useState(0);
  const [bulkStockCnt, setBulkStockCnt] = useState(0);

  const handleInputChange = (index: number, key: string, value: string) => {
    if (key == 'useDateTime') {
      optionList[index].useDateTime = value;
    } else if (key == 'firstKey') {
      optionList[index].firstKey = value;
    } else if (key == 'firstValue') {
      optionList[index].firstValue = value;
    } else if (key == 'secondKey') {
      optionList[index].secondKey = value;
    } else if (key == 'secondValue') {
      optionList[index].secondValue = value;
    } else if (key == 'thirdKey') {
      optionList[index].thirdKey = value;
    } else if (key == 'thirdValue') {
      optionList[index].thirdValue = value;
    } else if (key == 'stockCnt') {
      // setOptionList((prevOptionList) =>
      //   prevOptionList.map((item, i) =>
      //     i === index ? { ...item, stockCnt: Number(value) } : item,
      //   ),
      // );
      let updateItem = optionList.map((item) =>
        item.sort === index + 1
          ? { ...item, stockCnt: Number(value == 'NaN' ? stock : value) }
          : item,
      );
      setOptionList(updateItem);
    } else if (key == 'price') {
      // const updateArray = [...optionList];
      // updateArray[index].price = Number(value);
      // setOptionList(updateArray);
      let updateItem = optionList.map((item) =>
        item.sort === index + 1 ? { ...item, price: Number(value) } : item,
      );
      setOptionList(updateItem);
    }
  };

  const handleBulkOptionPriceChange = () => {
    if(bulkOptionPrice > -1) {
      console.log(optionList)
      let updatedOptionList = optionList.map(option => ({...option, price: +bulkOptionPrice}))
      setOptionList(updatedOptionList)
    }
  }

  const handleBulkStockCntChange = () => {
    if(bulkStockCnt > -1) {
      console.log(optionList)
      let updatedOptionList = optionList.map(option => ({...option, stockCnt: +bulkStockCnt}))
      setOptionList(updatedOptionList)
    }
  }

  useEffect(() => {
    if (stockState) {
      let updateItem = optionList.map((item) =>
        item.sort === indexCnt + 1
          ? { ...item, stockCnt: Number(stock) }
          : item,
      );
      setOptionList(updateItem);
      setStockState(false);
    }
    if (priceState) {
      let updateItem = optionList.map((item) =>
        item.sort === indexCnt + 1 ? { ...item, price: Number(price) } : item,
      );
      setOptionList(updateItem);
      setPriceState(false);
    }
  }, [stockState, priceState]);

  return (
    <Flex
      borderRadius={'12px'}
      borderColor={ColorGray400}
      borderWidth={1}
      mt={'30px'}
      overflow={'hidden'}
      flexDirection={'column'}
    >
      {optionList.length > 0 && (
        // {/* 헤더 */}
        <Flex
          bgColor={ColorMainBackBule}
          flexDirection={'row'}
          h={'100px'}
          w="100%"
        >
          {optionList[0].useDateTime !== '' &&
            optionList[0].useDateTime !== null && (
              <Flex
                py={'20px'}
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightColor={ColorGray400}
                borderRightWidth={1}
              >
                <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                  날짜
                </Text>
              </Flex>
            )}
          {/* 옵션타입 optionInputType 0=> 단독형 1 =>조합형 */}
          {list.optionInputType == 1 ? (
            <>
              <Flex
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightWidth={1}
                borderRightColor={ColorGray400}
              >
                <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                  {optionList[0].firstKey}
                </Text>
              </Flex>
              {optionList[0].secondKey !== null &&
                optionList[0].secondKey !== '' && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                      {optionList[0].secondKey}
                    </Text>
                  </Flex>
                )}
              {optionList[0].thirdKey !== null &&
                optionList[0].thirdKey !== '' && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                      {optionList[0].thirdKey}
                    </Text>
                  </Flex>
                )}
            </>
          ) : (
            <>
              {/* 단독형 */}
              <Flex
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightWidth={1}
                borderRightColor={ColorGray400}
              >
                <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                  옵션명
                </Text>
              </Flex>
              <Flex
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightWidth={1}
                borderRightColor={ColorGray400}
              >
                <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                  옵션값
                </Text>
              </Flex>
            </>
          )}

          {optionList[0].price !== null && (
            <>
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
              py={'20px'}
              flexDir="column"
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                옵션가
              </Text>
              <Flex w="90%">
                <InputBox
                  placeholder="숫자입력"
                  type="text"
                  maxLength={8}
                  value={bulkOptionPrice}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBulkOptionPrice(+e.target.value)
                  }}
                  textAlign="center"
                  w="60%"
                />
                <CustomButton
                  text="일괄적용"
                  fontSize="14px"
                  color={ColorGray700}
                  bgColor={ColorGray100}
                  borderColor={ColorInputBorder}
                  borderRadius="6px"
                  w="40%"
                  textAlign="center"
                  onClick={() => handleBulkOptionPriceChange()}
                />
              </Flex>
            </Flex>
            <Flex
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRightColor={ColorGray400}
            borderRightWidth={1}
            py={'20px'}
          >
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              판매가격 (기본가 + 옵션가)
            </Text>
          </Flex>
          </>
          )}
          {optionList[0].stockCnt !== null && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
              py={'20px'}
              flexDir="column"
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                재고
              </Text>
              <Flex w="90%">
                <InputBox
                  placeholder="숫자입력"
                  type="text"
                  maxLength={4}
                  value={bulkStockCnt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBulkStockCnt(+e.target.value)
                  }}
                  textAlign="center"
                  w="60%"
                />
                <CustomButton
                  text="일괄적용"
                  fontSize="14px"
                  color={ColorGray700}
                  bgColor={ColorGray100}
                  borderColor={ColorInputBorder}
                  borderRadius="6px"
                  w="40%"
                  textAlign="center"
                  onClick={() => handleBulkStockCntChange()}
                />
              </Flex>
            </Flex>
          )}

          <Flex
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            // borderLeftColor={ColorGray400}
            // borderLeftWidth={1}
            py={'20px'}
          >
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              삭제
            </Text>
          </Flex>
        </Flex>
      )}

      {/* 바디 */}
      <Flex bgColor={ColorWhite} flexDirection={'column'}>
        {optionList.length > 0 &&
          optionList.map((item: Option, index: number) => {
            return (
              <Flex
                flexDirection={'row'}
                borderTopColor={ColorGray400}
                borderTopWidth={1}
                key={index}
                backgroundColor={dayjs(item.useDateTime).get('d') === 0 ? ColorRedOpa : dayjs(item.useDateTime).get('d') === 6 ? ColorBackBlue : 'transparent'}
              >
                {optionList[0].useDateTime !== '' &&
                  optionList[0].useDateTime !== null && (
                    <Flex
                      w={'300px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      borderRightWidth={1}
                      borderRightColor={ColorGray400}
                    >
                      <Editable
                        w={'100%'}
                        key={item.useDateTime.split(' ')[0]}
                        // value={item.useDateTime.split(' ')[0]}
                        value={dayjs(item.useDateTime).format('YYYY-MM-DD (ddd)')}
                        textAlign={'center'}
                        fontSize={'15px'}
                        fontWeight={500}
                        isPreviewFocusable={false}
                        selectAllOnFocus={false}
                        isDisabled={goodsInfo.LogItemDisable}
                        onChange={(e) =>
                          handleInputChange(index, 'useDateTime', e)
                        }
                      >
                        <EditablePreview py={'17px'} color={ColorGray700} />
                        <EditableInput py={'17px'} color={ColorBlack} />
                      </Editable>
                    </Flex>
                  )}
                {/* 옵션타입 optionInputType 0=> 단독형 1 =>조합형 */}
                {list.optionInputType == 1 ? (
                  <>
                    <Flex
                      w={'300px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      borderRightWidth={1}
                      borderRightColor={ColorGray400}
                    >
                      <Editable
                        w={'100%'}
                        key={item.firstValue}
                        value={item.firstValue}
                        textAlign={'center'}
                        fontSize={'15px'}
                        fontWeight={500}
                        isPreviewFocusable={false}
                        selectAllOnFocus={false}
                        isDisabled={goodsInfo.LogItemDisable}
                        onChange={(e) =>
                          handleInputChange(index, 'firstValue', e)
                        }
                      >
                        <EditablePreview py={'17px'} color={ColorGray700} />
                        <EditableInput
                          py={'17px'}
                          color={ColorBlack}
                          disabled={goodsInfo.LogItemDisable}
                        />
                      </Editable>
                    </Flex>
                    {item.secondValue !== null && item.secondValue !== '' && (
                      <Flex
                        w={'300px'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRightWidth={1}
                        borderRightColor={ColorGray400}
                      >
                        <Editable
                          w={'100%'}
                          key={item.secondValue}
                          value={item.secondValue}
                          textAlign={'center'}
                          fontSize={'15px'}
                          fontWeight={500}
                          isPreviewFocusable={false}
                          selectAllOnFocus={false}
                          isDisabled={goodsInfo.LogItemDisable}
                          onChange={(e) =>
                            handleInputChange(index, 'secondValue', e)
                          }
                        >
                          <EditablePreview py={'17px'} color={ColorGray700} />
                          <EditableInput
                            py={'17px'}
                            color={ColorBlack}
                            disabled={goodsInfo.LogItemDisable}
                          />
                        </Editable>
                      </Flex>
                    )}
                    {item.thirdValue !== null && item.thirdValue !== '' && (
                      <Flex
                        w={'300px'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRightWidth={1}
                        borderRightColor={ColorGray400}
                      >
                        <Editable
                          w={'100%'}
                          key={item.thirdValue}
                          value={item.thirdValue}
                          textAlign={'center'}
                          fontSize={'15px'}
                          fontWeight={500}
                          isPreviewFocusable={false}
                          selectAllOnFocus={false}
                          isDisabled={goodsInfo.LogItemDisable}
                          onChange={(e) =>
                            handleInputChange(index, 'thirdValue', e)
                          }
                        >
                          <EditablePreview py={'17px'} color={ColorGray700} />
                          <EditableInput
                            py={'17px'}
                            color={ColorBlack}
                            disabled={goodsInfo.LogItemDisable}
                          />
                        </Editable>
                      </Flex>
                    )}
                  </>
                ) : (
                  <>
                    {/* 단독형 */}
                    <Flex
                      w={'300px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      borderRightWidth={1}
                      borderRightColor={ColorGray400}
                    >
                      <Editable
                        w={'100%'}
                        key={item.firstKey}
                        value={item.firstKey}
                        // value={item.firstKey}
                        textAlign={'center'}
                        fontSize={'15px'}
                        fontWeight={500}
                        isPreviewFocusable={false}
                        selectAllOnFocus={false}
                        isDisabled={goodsInfo.LogItemDisable}
                        onChange={(e) => {
                          handleInputChange(index, 'firstKey', e);
                        }}
                      >
                        <EditablePreview py={'17px'} color={ColorGray700} />
                        <EditableInput py={'17px'} color={ColorBlack} />
                      </Editable>
                    </Flex>
                    <Flex
                      w={'300px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      borderRightWidth={1}
                      borderRightColor={ColorGray400}
                    >
                      <Editable
                        w={'100%'}
                        key={item.firstValue}
                        value={item.firstValue}
                        textAlign={'center'}
                        fontSize={'15px'}
                        fontWeight={500}
                        isPreviewFocusable={false}
                        selectAllOnFocus={false}
                        isDisabled={goodsInfo.LogItemDisable}
                        onChange={(e) =>
                          handleInputChange(index, 'firstValue', e)
                        }
                      >
                        <EditablePreview py={'17px'} color={ColorGray700} />
                        <EditableInput
                          py={'17px'}
                          color={ColorBlack}
                          disabled={goodsInfo.LogItemDisable}
                        />
                      </Editable>
                    </Flex>
                  </>
                )}

                {item.price !== null && (
                  <>
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Editable
                      w={'100%'}
                      key={item.price}
                      defaultValue={String(item.price)}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      isDisabled={goodsInfo.LogItemDisable}
                      // onBlur={(e) => {
                      //   if (e) {
                      //     handleInputChange(index, 'price', e);
                      //   }
                      // }}
                      // onChange={(e) => setprice(e)}
                      onChange={(e) => {
                        setIndexCnt(index);
                        setprice(e);
                      }}
                      onBlur={(e) => {
                        setPriceState(true);
                      }}
                    >
                      <EditablePreview
                        py={'17px'}
                        color={ColorGray700}
                        width="full"
                      />
                      <EditableInput
                        py={'17px'}
                        type="number"
                        color={ColorBlack}
                        disabled={goodsInfo.LogItemDisable}
                      />
                    </Editable>
                  </Flex>
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Text>
                      {list.price + item.price}
                    </Text>
                  </Flex>
                </>
                )}
                {item.stockCnt !== null && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Editable
                      ref={stockRef}
                      w={'100%'}
                      defaultValue={String(item.stockCnt)}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      key={item.stockCnt}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      onChange={(e) => {
                        setIndexCnt(index);
                        setStock(e);
                      }}
                      onBlur={(e) => {
                        setStockState(true);
                      }}
                    >
                      <EditablePreview
                        py={'17px'}
                        color={ColorGray700}
                        width="full"
                      />
                      <EditableInput
                        py={'17px'}
                        type="number"
                        color={ColorBlack}
                      />
                    </Editable>

                    {/* <InputBox
                      placeholder="예) 색상"
                      defaultValue={optionList[index].stockCnt}
                      disabled={goodsInfo.LogItemDisable}
                      onChange={(e) =>
                        handleInputChange(index, 'stockCnt', e.target.value)
                      }
                      // value={item.optionName}
                      // onChange={(e) => handleOptionValueChange(index, e.target.value)}
                    /> */}
                  </Flex>
                )}

                <Flex
                  w={'300px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <CustomButton
                    text="삭제하기"
                    fontSize="12px"
                    color={ColorGray700}
                    bgColor={ColorGray100}
                    borderColor={ColorInputBorder}
                    px="15px"
                    py="7.5px"
                    borderRadius="6px"
                    disabled={goodsInfo.LogItemDisable}
                    onClick={() => onDeleteOption(index)}
                  />
                </Flex>
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
}

export default OptionList;
