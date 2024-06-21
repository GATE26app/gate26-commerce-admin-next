import React, { useState } from 'react';

import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';

import { GoodsBasicProps } from '@apis/goods/GoodsApi.type';

import CustomButton from '@components/common/CustomButton';

import {
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorMainBackBule,
  ColorWhite,
} from '@utils/_Palette';

import { Option } from './OptionPlus';

import { useGoodsStateZuInfo } from '_store/StateZuInfo';

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
  optionList: Option[];
  setOptionList: any;
}
function OptionList({ list, setList, optionList, setOptionList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [focus, setFocus] = useState(false);
  const onDeleteOption = (id: number) => {
    setOptionList(
      optionList.filter((item: Option, index: number) => index !== id),
    );
  };

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
      optionList[index].stockCnt = Number(value);
    } else if (key == 'price') {
      optionList[index].price = Number(value);
    }
  };

  return (
    <Flex
      borderRadius={'12px'}
      borderColor={ColorGray400}
      borderWidth={1}
      mt={'30px'}
      // w={'1200px'}
      // h={'500px'}
      overflow={'hidden'}
      flexDirection={'column'}
    >
      {optionList.length > 0 && (
        // {/* 헤더 */}
        <Flex
          bgColor={ColorMainBackBule}
          flexDirection={'row'}
          h={'60px'}
          w="100%"
          // borderBottomColor={ColorGray400}
          // borderBottomWidth={1}
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

          {/* {optionList[0].firstKey !== null && ( */}
          <Flex
            py={'20px'}
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRightColor={ColorGray400}
            borderRightWidth={1}
          >
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              {list.optionInputType == 0 ? '옵션명' : optionList[0].firstKey}
            </Text>
          </Flex>
          {/* )} */}
          {list.optionInputType == 1 &&
          optionList[0].secondKey !== null &&
          optionList[0].secondKey !== '' ? (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
            >
              <Text
                fontSize={'16px'}
                fontWeight={700}
                color={ColorBlack}
                py={'20px'}
              >
                {optionList[0].secondKey}
              </Text>
            </Flex>
          ) : (
            <></>
          )}
          {list.optionInputType == 0 && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
            >
              <Text
                fontSize={'16px'}
                fontWeight={700}
                color={ColorBlack}
                py={'20px'}
              >
                {'옵션값'}
              </Text>
            </Flex>
          )}

          {optionList[0].thirdKey !== null && optionList[0].thirdKey !== '' && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
              py={'20px'}
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                {optionList[0].thirdKey}
              </Text>
            </Flex>
          )}
          {optionList[0].price !== null && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
              py={'20px'}
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                가격
              </Text>
            </Flex>
          )}
          {optionList[0].stockCnt !== null && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
              py={'20px'}
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                재고
              </Text>
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
                        value={item.useDateTime.split(' ')[0]}
                        textAlign={'center'}
                        fontSize={'15px'}
                        fontWeight={500}
                        isPreviewFocusable={true}
                        selectAllOnFocus={false}
                        isDisabled={goodsInfo.LogItemDisable}
                        onChange={(e) =>
                          handleInputChange(index, 'useDateTime', e)
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

                {/* <Flex
                  w={'300px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderRightColor={ColorGray400}
                  borderRightWidth={1}
                >
                  <Input
                    defaultValue={
                      item.type == 1 ? item.firstKey : item.firstValue
                    }
                    fontSize={'16px'}
                    fontWeight={500}
                    focusBorderColor={ColorBlack}
                    borderRadius={0}
                    color={focus ? ColorBlack : ColorGray700}
                    borderWidth={0}
                    textAlign={'center'}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        item.type == 1 ? 'firstKey' : 'firstValue',
                        e.target.value,
                      )
                    }
                  /> */}
                <Flex
                  w={'300px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderRightWidth={1}
                  borderRightColor={ColorGray400}
                >
                  <Editable
                    w={'100%'}
                    value={
                      list.optionInputType == 0
                        ? item.firstKey
                        : item.firstValue
                    }
                    textAlign={'center'}
                    fontSize={'15px'}
                    fontWeight={500}
                    isPreviewFocusable={true}
                    selectAllOnFocus={false}
                    isDisabled={goodsInfo.LogItemDisable}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        item.type == 1 ? 'firstKey' : 'firstValue',
                        e,
                      )
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
                {list.optionInputType == 0 &&
                optionList[0].secondKey !== null &&
                optionList[0].secondKey !== '' ? (
                  // <Flex
                  //   w={'300px'}
                  //   alignItems={'center'}
                  //   justifyContent={'center'}
                  //   borderRightColor={ColorGray400}
                  //   borderRightWidth={1}
                  // >
                  //   <Input
                  //     defaultValue={
                  //       item.type == 1 ? item.firstValue : item.secondValue
                  //     }
                  //     fontSize={'16px'}
                  //     fontWeight={500}
                  //     focusBorderColor={ColorBlack}
                  //     borderRadius={0}
                  //     color={focus ? ColorBlack : ColorGray700}
                  //     borderWidth={0}
                  //     textAlign={'center'}
                  //     onFocus={() => setFocus(true)}
                  //     onBlur={() => setFocus(false)}
                  //     onChange={(e) =>
                  //       handleInputChange(
                  //         index,
                  //         item.type == 1 ? 'firstValue' : 'secondValue',
                  //         e.target.value,
                  //       )
                  //     }
                  //     // onFocus={}
                  //   />
                  //   {/* <Text
                  //     fontSize={'15px'}
                  //     fontWeight={500}
                  //     color={ColorGray700}
                  //     py={'17px'}
                  //   >
                  //     {item.type == 1 ? item.firstValue : item.secondValue}
                  //   </Text> */}
                  // </Flex>
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Editable
                      w={'100%'}
                      value={
                        list.optionInputType == 0
                          ? item.firstKey
                          : item.secondValue
                      }
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      isDisabled={goodsInfo.LogItemDisable}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          list.optionInputType == 0
                            ? 'firstKey'
                            : 'secondValue',
                          e,
                        )
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
                ) : (
                  <></>
                )}

                {optionList[0].type == 1 && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Editable
                      w={'100%'}
                      value={item.firstValue}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      isDisabled={goodsInfo.LogItemDisable}
                      onChange={(e) =>
                        handleInputChange(index, 'firstValue', e)
                      }
                      // py={'20px'}
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
                      value={item.thirdValue}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
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
                {item.price !== null && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Editable
                      w={'100%'}
                      value={String(item.price)}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      isDisabled={goodsInfo.LogItemDisable}
                      onChange={(e) => handleInputChange(index, 'price', e)}
                    >
                      <EditablePreview py={'17px'} color={ColorGray700} />
                      <EditableInput
                        py={'17px'}
                        type="number"
                        color={ColorBlack}
                        disabled={goodsInfo.LogItemDisable}
                      />
                    </Editable>
                  </Flex>
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
                      w={'100%'}
                      value={String(item.stockCnt)}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      isDisabled={goodsInfo.LogItemDisable}
                      onChange={(e) => handleInputChange(index, 'stockCnt', e)}
                    >
                      <EditablePreview py={'17px'} color={ColorGray700} />
                      <EditableInput
                        py={'17px'}
                        type="number"
                        color={ColorBlack}
                        disabled={goodsInfo.LogItemDisable}
                      />
                    </Editable>
                  </Flex>
                )}

                <Flex
                  w={'300px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  // borderLeftColor={ColorGray400}
                  // borderLeftWidth={1}
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
