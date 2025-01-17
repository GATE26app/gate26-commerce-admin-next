import React from 'react';

import {
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text
} from '@chakra-ui/react';


import CustomButton from '@/components/common/CustomButton';

import {
  ColorBackBlue,
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorRedOpa
} from '@/utils/_Palette';


import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

import { GoodsType } from '@/_store/StateZuInfo';
import { GoodsBasicProps } from '@/app/apis/goods/GoodsApi.type';
import { Option } from '@/components/goods/OptionPlus';
import { FixedSizeList as List } from 'react-window';

interface OptionListType {
  optionList: Option[];
  selectedRows: number[];
  handleSelectRow: Function;
  handleInputChange: Function;
  onDeleteOption: Function;
  list: GoodsBasicProps;
  goodsInfo: GoodsType;
  setIndexCnt: React.Dispatch<React.SetStateAction<number>>;
  setprice: React.Dispatch<React.SetStateAction<string>>;
  setPriceState: React.Dispatch<React.SetStateAction<boolean>>;
  setStock: React.Dispatch<React.SetStateAction<string>>;
  setStockState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RowType {
  index: number;
  style: React.CSSProperties;
  data: OptionListType;
}

// eslint-disable-next-line react/display-name
const Row = React.memo(({ index, style, data }: RowType) => {
  const { optionList, selectedRows, handleSelectRow, handleInputChange, onDeleteOption, list, goodsInfo, setIndexCnt, setprice, setPriceState, setStock, setStockState } = data;
  const item = optionList[index];

  return (
    <Flex
      style={style} // Important for react-window
      flexDirection={'row'}
      borderTopColor={ColorGray400}
      borderTopWidth={1}
      key={index}
      backgroundColor={
        dayjs(item.useDateTime).get('d') === 0
          ? ColorRedOpa
          : dayjs(item.useDateTime).get('d') === 6
            ? ColorBackBlue
            : 'transparent'
      }
    >
      <Checkbox
        mx="2"
        isChecked={selectedRows.includes(index)}
        onChange={() => handleSelectRow(index)}
      />
      {optionList[0].useDateTime !== '' && optionList[0].useDateTime !== null && (
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
            value={dayjs(item.useDateTime).format('YYYY-MM-DD (ddd)')}
            textAlign={'center'}
            fontSize={'15px'}
            fontWeight={500}
            isPreviewFocusable={false}
            selectAllOnFocus={false}
            isDisabled={goodsInfo.LogItemDisable}
            onChange={(e) => handleInputChange(index, 'useDateTime', e)}
          >
            <EditablePreview py={'17px'} color={ColorGray700} />
            <EditableInput py={'17px'} color={ColorBlack} />
          </Editable>
        </Flex>
      )}
      {/* ... Continue with the rest of your fields ... */}
      {/* Option Type Handling */}
      {list.optionInputType == 1 ? (
        <>
          {/* Combination Type Fields */}
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
              onChange={(e) => handleInputChange(index, 'firstValue', e)}
            >
              <EditablePreview py={'17px'} color={ColorGray700} />
              <EditableInput py={'17px'} color={ColorBlack} disabled={goodsInfo.LogItemDisable} />
            </Editable>
          </Flex>
          {item.secondValue && (
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
                onChange={(e) => handleInputChange(index, 'secondValue', e)}
              >
                <EditablePreview py={'17px'} color={ColorGray700} />
                <EditableInput py={'17px'} color={ColorBlack} disabled={goodsInfo.LogItemDisable} />
              </Editable>
            </Flex>
          )}
          {item.thirdValue && (
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
                onChange={(e) => handleInputChange(index, 'thirdValue', e)}
              >
                <EditablePreview py={'17px'} color={ColorGray700} />
                <EditableInput py={'17px'} color={ColorBlack} disabled={goodsInfo.LogItemDisable} />
              </Editable>
            </Flex>
          )}
        </>
      ) : (
        <>
          {/* Single Type Fields */}
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
              textAlign={'center'}
              fontSize={'15px'}
              fontWeight={500}
              isPreviewFocusable={false}
              selectAllOnFocus={false}
              isDisabled={goodsInfo.LogItemDisable}
              onChange={(e) => handleInputChange(index, 'firstKey', e)}
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
              onChange={(e) => handleInputChange(index, 'firstValue', e)}
            >
              <EditablePreview py={'17px'} color={ColorGray700} />
              <EditableInput py={'17px'} color={ColorBlack} disabled={goodsInfo.LogItemDisable} />
            </Editable>
          </Flex>
        </>
      )}
      {/* Price Field */}
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
              onChange={(e) => {
                setIndexCnt(index);
                setprice(e);
              }}
              onBlur={() => setPriceState(true)}
            >
              <EditablePreview py={'17px'} color={ColorGray700} width="full" />
              <EditableInput py={'17px'} type="number" color={ColorBlack} disabled={goodsInfo.LogItemDisable} />
            </Editable>
          </Flex>
          <Flex
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRightWidth={1}
            borderRightColor={ColorGray400}
          >
            <Text>{list.price + item.price}</Text>
          </Flex>
        </>
      )}
      {/* Stock Count Field */}
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
            onBlur={() => setStockState(true)}
          >
            <EditablePreview py={'17px'} color={ColorGray700} width="full" />
            <EditableInput py={'17px'} type="number" color={ColorBlack} />
          </Editable>
        </Flex>
      )}
      {/* Delete Button */}
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
});

const VirtualizedOptionList = ({
  optionList,
  selectedRows,
  handleSelectRow,
  handleInputChange,
  onDeleteOption,
  list,
  goodsInfo,
  setIndexCnt,
  setprice,
  setPriceState,
  setStock,
  setStockState,
}: OptionListType) => {
  const itemCount = optionList.length;
  const itemSize = 60; // Adjust based on the height of each row

  // Memoize the data to prevent unnecessary re-renders
  const itemData = React.useMemo(() => ({
    optionList,
    selectedRows,
    handleSelectRow,
    handleInputChange,
    onDeleteOption,
    list,
    goodsInfo,
    setIndexCnt,
    setprice,
    setPriceState,
    setStock,
    setStockState,
  }), [
    optionList,
    selectedRows,
    handleSelectRow,
    handleInputChange,
    onDeleteOption,
    list,
    goodsInfo,
    setIndexCnt,
    setprice,
    setPriceState,
    setStock,
    setStockState,
  ]);

  return (
    <List
      height={600} // Adjust based on your layout
      itemCount={itemCount}
      itemSize={itemSize}
      width="100%"
      itemData={itemData}
    >
      {Row}
    </List>
  );
};

export default VirtualizedOptionList;