import { Input, InputProps, Text } from '@chakra-ui/react';

import {
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

export interface Props extends InputProps {
  error?: string;
  disabled?: boolean;
}

const InputBox = ({ error, disabled = false, ...props }: Props) => {
  return (
    <>
      <Input
        h="45px"
        {...props}
        // {...props.register}
        errorBorderColor="warning.500"
        variant="outline"
        // borderColor={ColorInputBorder}
        backgroundColor={ColorWhite}
        color="black"
        _disabled={{ backgroundColor: 'gray.100', color: ColorGray700 }}
        _placeholder={{ color: ColorGray700 }}
        borderRadius={'10px'}
        fontSize={'15px'}
        outline={'none'}
        disabled={disabled}
      />
      {error !== '' && (
        <Text color={ColorRed} fontWeight={400} fontSize={'12px'} mt={'6px'}>
          {error}
        </Text>
      )}
    </>
  );
};

export default InputBox;
