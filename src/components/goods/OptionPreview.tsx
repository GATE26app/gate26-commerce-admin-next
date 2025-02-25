import { GoodsBasicProps, OptionProps } from '@/app/apis/goods/GoodsApi.type';
import CustomButton from '@/components/common/CustomButton';
import { Option } from '@/components/goods/OptionPlus';
import { ColorBlack, ColorGray100, ColorGray400, ColorGray700, ColorInputBorder, ColorMainBackBule } from "@/utils/_Palette";
import { Editable, EditableInput, EditablePreview, Flex, Text } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from 'react';

interface Props {
  list: GoodsBasicProps;
  optionList: Array<OptionProps>;
  optionPreviews: Array<Option>;
  setOptionPreviews: React.Dispatch<React.SetStateAction<Array<Option>>>;
}

interface OptionPreviewProps {
  optionPreview: Option;
  index: number;
  onUpdateOption: (index: number, field: keyof Option, value: string | number) => void;
  onDeleteOption: (index: number) => void;
  basePrice: number;
}

const validateNumberInput = (value: string, min: number = 0): number => {
  const num = Number(value);
  if (isNaN(num) || num < min) return min;
  return Math.floor(num); // 정수로 변환
};

export default function OptionPreview({ list, optionList, optionPreviews, setOptionPreviews }: Props) {
  // Memoize handlers to prevent unnecessary re-renders
  const handleUpdateOption = useCallback((index: number, field: keyof Option, value: string | number) => {
    setOptionPreviews(prev => prev.map((option, idx) => {
      if (idx !== index) return option;

      // 숫자 필드에 대한 특별 처리
      if (field === 'price' || field === 'stockCnt') {
        const validatedValue = validateNumberInput(value.toString());
        return { ...option, [field]: validatedValue };
      }

      // 문자열 필드에 대한 처리
      if (typeof value === 'string' && value.trim() === '') {
        return option; // 빈 문자열은 무시
      }

      return { ...option, [field]: value };
    }));
  }, [setOptionPreviews]);

  const handleDeleteOption = useCallback((index: number) => {
    setOptionPreviews(prev => prev.filter((_, idx) => idx !== index));
  }, [setOptionPreviews]);



  const CommonOptionFields = useCallback(({ optionPreview, index, onUpdateOption, onDeleteOption, basePrice }: OptionPreviewProps) => {
    return (
      <>
        {optionPreview.price !== null && (
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
                defaultValue={String(optionPreview.price)}
                value={String(optionPreview.price)}
                textAlign={'center'}
                fontSize={'15px'}
                fontWeight={500}
                isPreviewFocusable={true}
                selectAllOnFocus={false}
                onChange={(value) => onUpdateOption(index, 'price', value)}
                onKeyUp={(e) => {
                  if (!/[-\d\b\t]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              >
                <EditablePreview py={'17px'} color={ColorGray700} width="full" />
                <EditableInput
                  py={'17px'}
                  type="number"
                  color={ColorBlack}
                  min="0"
                  step="1"
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
              <Text>{basePrice + (+optionPreview.price)}</Text>
            </Flex>
          </>
        )}

        {optionPreview.stockCnt !== null && (
          <Flex
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRightWidth={1}
            borderRightColor={ColorGray400}
          >
            <Editable
              w={'100%'}
              defaultValue={String(optionPreview.stockCnt)}
              value={String(optionPreview.stockCnt)}
              textAlign={'center'}
              fontSize={'15px'}
              fontWeight={500}
              isPreviewFocusable={true}
              selectAllOnFocus={false}
              onChange={(value) => onUpdateOption(index, 'stockCnt', value)}
              onKeyUp={(e) => {
                if (!/[\d\b\t]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            >
              <EditablePreview py={'17px'} color={ColorGray700} width="full" />
              <EditableInput
                py={'17px'}
                type="number"
                color={ColorBlack}
                min="0"
                step="1"
              />
            </Editable>
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
            onClick={() => onDeleteOption(index)}
          />
        </Flex>
      </>
    );
  }, []);

  const SingleTypeOptions = useCallback(({ optionPreview, index, onUpdateOption, onDeleteOption, basePrice }: OptionPreviewProps) => {
    return (
      <Flex
        flexDirection={'row'}
        borderTopColor={ColorGray400}
        borderTopWidth={1}
      >
        <Flex
          w={'300px'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRightWidth={1}
          borderRightColor={ColorGray400}
        >
          <Editable
            w={'100%'}
            value={optionPreview.firstKey}
            textAlign={'center'}
            fontSize={'15px'}
            fontWeight={500}
            isPreviewFocusable={false}
            selectAllOnFocus={false}
            onChange={(value) => onUpdateOption(index, 'firstKey', value)}
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
            value={optionPreview.firstValue}
            textAlign={'center'}
            fontSize={'15px'}
            fontWeight={500}
            isPreviewFocusable={false}
            selectAllOnFocus={false}
            onChange={(value) => onUpdateOption(index, 'firstValue', value)}
          >
            <EditablePreview py={'17px'} color={ColorGray700} />
            <EditableInput py={'17px'} color={ColorBlack} />
          </Editable>
        </Flex>
        <CommonOptionFields
          optionPreview={optionPreview}
          index={index}
          onUpdateOption={onUpdateOption}
          onDeleteOption={onDeleteOption}
          basePrice={basePrice}
        />
      </Flex>
    );
  }, [CommonOptionFields]);

  const CombinationTypeOptions = useCallback(({ optionPreview, index, onUpdateOption, onDeleteOption, basePrice }: OptionPreviewProps) => {
    return (
      <Flex
        flexDirection={'row'}
        borderTopColor={ColorGray400}
        borderTopWidth={1}
      >
        <Flex
          w={'300px'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRightWidth={1}
          borderRightColor={ColorGray400}
        >
          <Editable
            w={'100%'}
            value={optionPreview.firstValue}
            textAlign={'center'}
            fontSize={'15px'}
            fontWeight={500}
            isPreviewFocusable={false}
            selectAllOnFocus={false}
            onChange={(value) => onUpdateOption(index, 'firstValue', value)}
          >
            <EditablePreview py={'17px'} color={ColorGray700} />
            <EditableInput py={'17px'} color={ColorBlack} />
          </Editable>
        </Flex>
        {optionPreview.secondValue && (
          <Flex
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRightWidth={1}
            borderRightColor={ColorGray400}
          >
            <Editable
              w={'100%'}
              value={optionPreview.secondValue}
              textAlign={'center'}
              fontSize={'15px'}
              fontWeight={500}
              isPreviewFocusable={false}
              selectAllOnFocus={false}
              onChange={(value) => onUpdateOption(index, 'secondValue', value)}
            >
              <EditablePreview py={'17px'} color={ColorGray700} />
              <EditableInput py={'17px'} color={ColorBlack} />
            </Editable>
          </Flex>
        )}
        {optionPreview.thirdValue && (
          <Flex
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRightWidth={1}
            borderRightColor={ColorGray400}
          >
            <Editable
              w={'100%'}
              value={optionPreview.thirdValue}
              textAlign={'center'}
              fontSize={'15px'}
              fontWeight={500}
              isPreviewFocusable={false}
              selectAllOnFocus={false}
              onChange={(value) => onUpdateOption(index, 'thirdValue', value)}
            >
              <EditablePreview py={'17px'} color={ColorGray700} />
              <EditableInput py={'17px'} color={ColorBlack} />
            </Editable>
          </Flex>
        )}
        <CommonOptionFields
          optionPreview={optionPreview}
          index={index}
          onUpdateOption={onUpdateOption}
          onDeleteOption={onDeleteOption}
          basePrice={basePrice}
        />
      </Flex>
    );
  }, [CommonOptionFields]);

  // Memoize the header to prevent unnecessary re-renders
  const HeaderSection = useMemo(() => {
    // if (optionList.length === 0) return null;
    if (optionPreviews.length === 0) return null;

    return (
      <Flex
        bgColor={ColorMainBackBule}
        flexDirection={'row'}
        h={'100px'}
        w="100%"
      >
        {list.optionInputType === 1 ? (
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
            {optionList[0].secondKey && (
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
            {optionList[0].thirdKey && (
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
        {optionList[0]?.price !== null && (
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
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb="5px">
                옵션가
              </Text>
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
        {optionList[0]?.stockCnt !== null && (
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
          </Flex>
        )}
        <Flex
          w={'300px'}
          alignItems={'center'}
          justifyContent={'center'}
          py={'20px'}
        >
          <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
            삭제
          </Text>
        </Flex>
      </Flex>
    );
  }, [optionList, list.optionInputType]);

  return (
    <Flex
      borderRadius={'12px'}
      borderColor={ColorGray400}
      borderWidth={1}
      my={'30px'}
      overflow={'hidden'}
      flexDirection={'column'}
    >
      {HeaderSection}
      {optionPreviews.map((optionPreview, index) => (
        list.optionInputType === 0 ? (
          <SingleTypeOptions
            key={`single-${index}`}
            optionPreview={optionPreview}
            index={index}
            onUpdateOption={handleUpdateOption}
            onDeleteOption={handleDeleteOption}
            basePrice={list.price}
          />
        ) : (
          <CombinationTypeOptions
            key={`combination-${index}`}
            optionPreview={optionPreview}
            index={index}
            onUpdateOption={handleUpdateOption}
            onDeleteOption={handleDeleteOption}
            basePrice={list.price}
          />
        )
      ))}
    </Flex>
  );
}