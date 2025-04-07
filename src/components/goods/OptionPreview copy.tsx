import { GoodsBasicProps, OptionProps } from '@/app/apis/goods/GoodsApi.type';
import CustomButton from '@/components/common/CustomButton';
import { Option } from '@/components/goods/OptionPlus';
import { ColorBlack, ColorGray100, ColorGray400, ColorGray700, ColorInputBorder, ColorMainBackBule } from "@/utils/_Palette";
import { Editable, EditableInput, EditablePreview, Flex, Text } from "@chakra-ui/react";
import { useState } from 'react';

interface Props {
  list: GoodsBasicProps;
  optionList: Array<OptionProps>;
  optionPreviews: Array<Option>;
  setOptionPreviews: React.Dispatch<React.SetStateAction<Array<Option>>>;
}

interface OptionPreviewProps {
  optionPreview: Option;
  index: number;
}


export default function OptionPreview({ list, optionList, optionPreviews, setOptionPreviews }: Props) {
  const [tempOptionPreviews, setTempOptionPreviews] = useState<Option[]>([]);

  const handleBlur = () => {
    // setOptionPreviews(tempOptionPreviews);
    setTimeout(() => {
      setOptionPreviews(tempOptionPreviews);
    }, 50); // 작은 지연을 주어 Chakra UI가 블러 이벤트를 처리할 시간을 줍니다.
  }

  const handleInputChangePrice = (index: number, value: string) => {
    const changedPriceOptionPreviews = optionPreviews.map((optionPreview, idx) => {
      if (index === idx) {
        const changedOptionPreview = optionPreview;
        changedOptionPreview.price = +value;

        return changedOptionPreview;
      }

      return optionPreview;
    });

    setTempOptionPreviews(changedPriceOptionPreviews);
  }

  const handleInputChangeStock = (index: number, value: string) => {
    const changedStockOptionPreviews = optionPreviews.map((optionPreview, idx) => {
      if (index === idx) {
        const changedOptionPreview = optionPreview;
        changedOptionPreview.stockCnt = +value;

        return changedOptionPreview;
      }

      return optionPreview;
    });

    setTempOptionPreviews(changedStockOptionPreviews);
  }

  const onDeleteOption = (index: number) => {
    const filteredOptionPreviews = optionPreviews.filter((_, idx) => idx !== index)
    setOptionPreviews(filteredOptionPreviews);
  }

  function SingleTypeOptions({ optionPreview, index }: OptionPreviewProps) {
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
            key={'firstKey' + index}
            value={optionPreview.firstKey}
            textAlign={'center'}
            fontSize={'15px'}
            fontWeight={500}
            isPreviewFocusable={false}
            selectAllOnFocus={false}
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
            key={'firstValue' + index}
            value={optionPreview.firstValue}
            textAlign={'center'}
            fontSize={'15px'}
            fontWeight={500}
            isPreviewFocusable={false}
            selectAllOnFocus={false}
          >
            <EditablePreview py={'17px'} color={ColorGray700} />
            <EditableInput py={'17px'} color={ColorBlack} />
          </Editable>
        </Flex>
        <CommonOptionFields optionPreview={optionPreview} index={index}></CommonOptionFields>
      </Flex>
    );
  }

  function CombinationTypeOptions({ optionPreview, index }: OptionPreviewProps) {
    return (
      <Flex
        flexDirection={'row'}
        borderTopColor={ColorGray400}
        borderTopWidth={1}
      >
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
            key={'firstValue' + index}
            value={optionPreview.firstValue}
            textAlign={'center'}
            fontSize={'15px'}
            fontWeight={500}
            isPreviewFocusable={false}
            selectAllOnFocus={false}
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
              key={'secondValue' + index}
              value={optionPreview.secondValue}
              textAlign={'center'}
              fontSize={'15px'}
              fontWeight={500}
              isPreviewFocusable={false}
              selectAllOnFocus={false}
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
              key={'thirdValue' + index}
              value={optionPreview.thirdValue}
              textAlign={'center'}
              fontSize={'15px'}
              fontWeight={500}
              isPreviewFocusable={false}
              selectAllOnFocus={false}
            >
              <EditablePreview py={'17px'} color={ColorGray700} />
              <EditableInput py={'17px'} color={ColorBlack} />
            </Editable>
          </Flex>
        )}
        <CommonOptionFields optionPreview={optionPreview} index={index}></CommonOptionFields>
      </Flex>
    )
  }

  function CommonOptionFields({ optionPreview, index }: OptionPreviewProps) {
    return <>
      {/* Price Field */}
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
              key={'price' + index}
              defaultValue={String(+optionPreview.price)}
              value={String(+optionPreview.price)}
              textAlign={'center'}
              fontSize={'15px'}
              fontWeight={500}
              isPreviewFocusable={true}
              selectAllOnFocus={false}
              onChange={(price) => {
                handleInputChangePrice(index, price)
              }}
              onBlur={() => handleBlur()}
            >
              <EditablePreview py={'17px'} color={ColorGray700} width="full" />
              <EditableInput py={'17px'} type="number" color={ColorBlack} />
            </Editable>
          </Flex>
          <Flex
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRightWidth={1}
            borderRightColor={ColorGray400}
          >
            <Text>{list.price + optionPreview.price}</Text>
          </Flex>
        </>
      )}

      {/* Stock Count Field */}
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
            key={'stockCnt' + index}
            isPreviewFocusable={true}
            selectAllOnFocus={false}
            onChange={(stockCnt) => {
              handleInputChangeStock(index, stockCnt)
            }}
            onBlur={() => handleBlur()}
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
          onClick={() => { onDeleteOption(index) }}
        />
      </Flex>
    </>
  }

  return (
    <Flex
      borderRadius={'12px'}
      borderColor={ColorGray400}
      borderWidth={1}
      my={'30px'}
      overflow={'hidden'}
      flexDirection={'column'}
    >
      {optionList.length > 0 && (
        // {/* 헤더 */ }
        <Flex
          bgColor={ColorMainBackBule}
          flexDirection={'row'}
          h={'100px'}
          w="100%"
        >
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
                <Text
                  fontSize={'16px'}
                  fontWeight={700}
                  color={ColorBlack}
                  mb="5px"
                >
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
      )}

      {/* 바디 */}
      {/* Single Type Fields */}
      {optionPreviews.map((optionPreview, index) => {
        return list.optionInputType == 0 ?
          <SingleTypeOptions optionPreview={optionPreview} index={index}></SingleTypeOptions>
          : <CombinationTypeOptions optionPreview={optionPreview} index={index}></CombinationTypeOptions>
      }
      )}
    </Flex>
  )
}