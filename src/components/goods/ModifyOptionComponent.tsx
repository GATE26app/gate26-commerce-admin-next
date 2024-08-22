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
  GoodsBasicProps,
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
  list: GoodsBasicProps;
  optionList: OptionItemProps[];
  setOptionList: React.Dispatch<React.SetStateAction<OptionItemProps[]>>;
  optionModifyList: GoodsOptionStockModifyType[];
  setOptionModifyList: React.Dispatch<
    React.SetStateAction<GoodsOptionStockModifyType[]>
  >;
}
function ModifyOptionComponent({
  list,
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
          {/* <Flex
            py={'20px'}
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRightColor={ColorGray400}
            borderRightWidth={1}
          >
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              {optionList[0].type == 1 ? '옵션명' : optionList[1].firstKey}
            </Text>
          </Flex>
      
          {optionList[0].type == 2 &&
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
                {optionList[1].secondKey}
              </Text>
            </Flex>
          ) : (
            <></>
          )}
          {optionList[0].type == 1 && (
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
          )} */}
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
                borderTopColor={ColorGray400}
                borderTopWidth={1}
                key={index}
              >
                {optionList[0].useDateTime !== '' &&
                  optionList[0].useDateTime !== null && (
                    <Flex
                      // w={'300px'}
                      // alignItems={'center'}
                      // justifyContent={'center'}
                      // borderRightWidth={1}
                      // borderRightColor={ColorGray400}
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
                    </Flex>
                  )}
                {/* 옵션타입 optionInputType 0=> 단독형 1 =>조합형 */}
                {list.optionInputType == 1 ? (
                  <>
                    <Flex
                      // w={'300px'}
                      // alignItems={'center'}
                      // justifyContent={'center'}
                      // borderRightWidth={1}
                      // borderRightColor={ColorGray400}
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
                        {item.firstValue}
                      </Text>
                      {/* <Editable
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
                      </Editable> */}
                    </Flex>
                    {item.secondValue !== null && item.secondValue !== '' && (
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
                          {item.secondValue}
                        </Text>
                        {/* <Editable
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
                        </Editable> */}
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
                        {/* <Editable
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
                        </Editable> */}
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
                        {item.firstKey}
                      </Text>
                      {/* <Editable
                        w={'100%'}
                        key={item.firstKey}
                        // defaultValue={item.firstKey}
                        value={item.firstKey}
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
                      </Editable> */}
                    </Flex>
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
                        {item.firstValue}
                      </Text>
                    </Flex>
                  </>
                )}

                {item.price !== null && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    bgColor={ColorGray100}
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
                      key={item.stockCnt}
                      defaultValue={String(item.stockCnt)}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      isDisabled={goodsInfo.LogItemDisable}
                      // handleInputChange
                      onChange={(e) =>
                        handleInputChange(String(item.optionId), Number(e))
                      }
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
                  </Flex>
                )}
              </Flex>
            );
          })}
      </Flex>
      {/* <Flex bgColor={ColorWhite} flexDirection={'column'}>
        {optionList.length > 0 &&
          optionList.map((item: OptionItemProps, index: number) => {
            return (
              <Flex
                flexDirection={'row'}
              >
                {optionList[0].useDateTime !== '' &&
                  optionList[0].useDateTime !== null && (
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
                {optionList[0].type == 2 &&
                optionList[0].secondKey !== null &&
                optionList[0].secondKey !== '' ? (
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
                {optionList[0].type == 1 && (
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
                      key={item.stockCnt}
                      defaultValue={String(item.stockCnt)}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      isDisabled={goodsInfo.LogItemDisable}
                      // handleInputChange
                      onChange={(e) =>
                        handleInputChange(String(item.optionId), Number(e))
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
                )}
              </Flex>
            );
          })}
      </Flex> */}
    </Flex>
  );
}

export default ModifyOptionComponent;
