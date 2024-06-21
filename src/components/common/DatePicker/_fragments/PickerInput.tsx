import Image from 'next/image';

import { InputGroup, InputRightElement } from '@chakra-ui/react';

import InputBox from '@/components/common/Input';
import CalendarIcon from '../../@Icons/Admin/Calendar';
import { ColorGray500 } from '@/utils/_Palette';

interface PickerInputProps {
  placeholder?: string;
  text: string;
  disabled?: boolean;
}
const PickerInput = ({ placeholder, text, disabled }: PickerInputProps) => {
  return (
    <InputGroup h={'40px'} position="relative">
      <InputBox
        isDisabled={disabled}
        h={'100%'}
        variant={'outline'}
        placeholder={placeholder || ''}
        value={text}
        autoComplete="off"
        fontSize={'15px'}
        isReadOnly
      />
      <InputRightElement h={'100%'}>
        <Image
          src={'/images/Page/input_date.png'}
          alt="달력"
          width={20}
          height={20}
        />
        {/* <CalendarIcon strokeColor={disabled ? ColorGray500 : 'black'} /> */}
      </InputRightElement>
    </InputGroup>
  );
};

export default PickerInput;
