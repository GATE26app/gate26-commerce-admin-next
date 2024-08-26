import { ColorBlack, ColorGray400, ColorGray700 } from '@/utils/_Palette';
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { Option } from '../OptionPlus';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';

interface Props {
  setState: React.Dispatch<React.SetStateAction<string>>;
  item: Option;
  index: number;
  handleInputChange: (index: number, key: string, value: any) => void;
}
function EditableInputBox({ setState, item, index, handleInputChange }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  return (
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
        // onBlur={(e) => handleInputChange(index, 'price', e)}
        onChange={(e) => handleInputChange(index, 'price', e)}
      >
        <EditablePreview py={'17px'} color={ColorGray700} width="full" />
        <EditableInput
          py={'17px'}
          type="number"
          color={ColorBlack}
          disabled={goodsInfo.LogItemDisable}
        />
      </Editable>
    </Flex>
  );
}

export default EditableInputBox;
