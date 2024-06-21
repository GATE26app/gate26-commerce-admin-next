import React, { useState } from 'react';

import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';

import {
  GoodsOptionStockModifyType,
  OptionItemProps,
} from '@/app/apis/goods/GoodsApi.type';

import {
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorMainBackBule,
  ColorWhite,
} from '@/utils/_Palette';
import { DashDate } from '@/utils/format';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';

// import { Option } from './OptionPlus';

interface Props {
  optionList: OptionItemProps[];
  setOptionList: React.Dispatch<React.SetStateAction<OptionItemProps[]>>;
  optionModifyList: GoodsOptionStockModifyType[];
  setOptionModifyList: React.Dispatch<
    React.SetStateAction<GoodsOptionStockModifyType[]>
  >;
}
function ModifyOptionComponent({
  optionList,
  setOptionList,
  optionModifyList,
  setOptionModifyList,
}: Props) {
  const [focus, setFocus] = useState('');
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const handleInputChange = (optionId: string, stockCnt: number) => {
    const obj = {
      optionId: optionId,
      stockCnt: stockCnt,
    };

    // console.log(
    //   'vvvv',
    //   optionModifyList.map((item) => item.optionId == optionId),
    // );
    if (
      optionModifyList.filter((item) => item.optionId == optionId).length > 0
    ) {
      setOptionModifyList((prevItems) =>
        prevItems.map((item) =>
          item.optionId === optionId ? { ...item, stockCnt: stockCnt } : item,
        ),
      );
    } else {
      setOptionModifyList([...optionModifyList, obj]);
    }
    // setOptionModifyList([...optionModifyList, obj]);
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
          {optionList[1].useDateTime !== '' &&
            optionList[1].useDateTime !== null && (
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
              {optionList[1].type == 1 ? '옵션명' : optionList[1].firstKey}
            </Text>
          </Flex>
          {/* )} */}
          {optionList[1].type == 2 &&
          optionList[1].secondKey !== null &&
          optionList[1].secondKey !== '' ? (
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
                {optionList[1].secondKey}
              </Text>
            </Flex>
          ) : (
            <></>
          )}
          {optionList[1].type == 1 && (
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

          {optionList[1].thirdKey !== null && optionList[1].thirdKey !== '' && (
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
          {optionList[1].stockCnt !== null && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              // borderRightColor={ColorGray400}
              // borderRightWidth={1}
              py={'20px'}
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                재고
              </Text>
            </Flex>
          )}
        </Flex>
      )}

      {/* 바디 */}
      <Flex bgColor={ColorWhite} flexDirection={'column'}>
        {optionList.length > 0 &&
          optionList.map((item: OptionItemProps, index: number) => {
            return (
              <Flex
                flexDirection={'row'}
                // borderTopColor={ColorGray400}
                // borderTopWidth={1}
              >
                {optionList[1].useDateTime !== '' &&
                  optionList[1].useDateTime !== null && (
                    <Flex
                      w={'300px'}
                      alignItems={'center'}
                      bgColor={ColorGray100}
                      justifyContent={'center'}
                      borderRightColor={ColorGray400}
                      borderRightWidth={1}
                      borderTopColor={ColorGray400}
                      borderTopWidth={1}
                    >
                      <Text
                        fontSize={'15px'}
                        fontWeight={700}
                        color={ColorBlack}
                        py={'16px'}
                      >
                        {DashDate(item.useDateTime)}
                      </Text>
                      {/* <Input
                        value={item.optionDate}
                        fontSize={'16px'}
                        fontWeight={700}
                        color={ColorBlack}
                      /> */}
                    </Flex>
                  )}

                <Flex
                  w={'300px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  bgColor={ColorGray100}
                  borderRightColor={ColorGray400}
                  borderRightWidth={1}
                  borderTopColor={ColorGray400}
                  borderTopWidth={1}
                >
                  <Text
                    fontSize={'15px'}
                    fontWeight={500}
                    color={ColorGray700}
                    py={'17px'}
                  >
                    {item.type == 1 ? item.firstKey : item.firstValue}
                  </Text>
                </Flex>
                {optionList[1].type == 2 &&
                optionList[1].secondKey !== null &&
                optionList[1].secondKey !== '' ? (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    bgColor={ColorGray100}
                    borderRightColor={ColorGray400}
                    borderRightWidth={1}
                    borderTopColor={ColorGray400}
                    borderTopWidth={1}
                  >
                    <Text
                      fontSize={'15px'}
                      fontWeight={500}
                      color={ColorGray700}
                      py={'17px'}
                    >
                      {item.type == 1 ? item.firstValue : item.secondValue}
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}
                {optionList[1].type == 1 && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    bgColor={ColorGray100}
                    justifyContent={'center'}
                    borderRightColor={ColorGray400}
                    borderRightWidth={1}
                    borderTopColor={ColorGray400}
                    borderTopWidth={1}
                  >
                    <Text
                      fontSize={'15px'}
                      fontWeight={500}
                      color={ColorGray700}
                      py={'17px'}
                    >
                      {item.firstValue}
                    </Text>
                  </Flex>
                )}

                {item.thirdValue !== null && item.thirdValue !== '' && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    bgColor={ColorGray100}
                    borderRightColor={ColorGray400}
                    borderRightWidth={1}
                    borderTopColor={ColorGray400}
                    borderTopWidth={1}
                  >
                    <Text
                      fontSize={'15px'}
                      fontWeight={500}
                      color={ColorGray700}
                      py={'17px'}
                    >
                      {item.thirdValue}
                    </Text>
                  </Flex>
                )}
                {item.price !== null && (
                  <Flex
                    w={'300px'}
                    bgColor={ColorGray100}
                    alignItems={'center'}
                    justifyContent={'center'}
                    // borderRightColor={ColorGray400}
                    // borderRightWidth={1}
                    borderTopColor={ColorGray400}
                    borderTopWidth={1}
                  >
                    <Text
                      fontSize={'15px'}
                      fontWeight={500}
                      color={ColorGray700}
                      py={'17px'}
                    >
                      {item.price}
                    </Text>
                  </Flex>
                )}
                {item.stockCnt !== null && (
                  // <Flex
                  //   w={'300px'}
                  //   alignItems={'center'}
                  //   justifyContent={'center'}
                  //   borderWidth={1}
                  // borderTopColor={
                  //   focus == String(index) ? ColorBlack : ColorGray400
                  // }
                  // borderLeftColor={
                  //   focus == String(index) ? ColorBlack : ColorGray400
                  // }
                  // borderRightColor={
                  //   focus == String(index) ? ColorBlack : ColorGray400
                  // }
                  // >
                  //   <Input
                  //     defaultValue={item.stockCnt}
                  //     fontSize={'16px'}
                  //     fontWeight={500}
                  //     focusBorderColor={ColorBlack}
                  //     // focusBorderColor={ColorBlack}
                  //     borderRadius={0}
                  //     color={ColorBlack}
                  //     borderWidth={0}
                  //     _focus={{ borderWidth: 0, outline: 'none' }}
                  //     textAlign={'center'}
                  //     onFocus={() => setFocus(`${index}`)}
                  //     onBlur={() => setFocus('')}
                  //     // onChange={(e) =>
                  //     // handleInputChange(
                  //     //   index,
                  //     //   item.type == 1 ? 'firstValue' : 'secondValue',
                  //     //   e.target.value,
                  //     // )
                  //     // }
                  //   />
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderWidth={1}
                    borderTopColor={
                      focus == String(index) ? ColorBlack : ColorGray400
                    }
                    borderLeftColor={
                      focus == String(index) ? ColorBlack : ColorGray400
                    }
                    borderRightColor={
                      focus == String(index) ? ColorBlack : ColorGray400
                    }
                    // borderRightColor={ColorGray400}
                  >
                    <Editable
                      w={'100%'}
                      defaultValue={String(item.stockCnt)}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      isDisabled={goodsInfo.LogItemDisable}
                      // handleInputChange
                      onChange={(e) =>
                        handleInputChange(item.optionId, Number(e))
                      }
                    >
                      <EditablePreview py={'17px'} color={ColorGray700} />
                      <EditableInput
                        py={'17px'}
                        type="number"
                        color={ColorBlack}
                      />
                    </Editable>
                  </Flex>
                  //   {/* <Text
                  //     fontSize={'15px'}
                  //     fontWeight={500}
                  //     color={ColorGray700}
                  //     py={'17px'}
                  //   >
                  //     {item.stockCnt}
                  //   </Text> */}
                  // // </Flex>
                )}
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
}

export default ModifyOptionComponent;
