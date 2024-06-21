import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

import { ColorGray700, ColorInputBorder, ColorWhite } from '@/utils/_Palette';

const SearchInput = ({ ...props }) => {
  return (
    <Flex
      // borderRadius={'10px'}
      // borderWidth={1}
      borderColor={ColorInputBorder}
      bgColor={ColorWhite}
      alignItems={'center'}
      width={'100%'}
    >
      <InputGroup alignItems={'center'} h={'45px'}>
        <InputLeftElement pointerEvents="none" alignItems={'center'} h={'45px'}>
          <Image
            src={'/images/Page/input_search.png'}
            width={'18px'}
            height={'18px'}
            alt="select arrow"
            // px={'15px'}
          />
        </InputLeftElement>
        <Input
          h={'45px'}
          {...props}
          errorBorderColor="warning.500"
          variant="outline"
          backgroundColor={ColorWhite}
          color="black"
          _disabled={{ backgroundColor: 'gray.100', color: ColorGray700 }}
          _placeholder={{ color: ColorGray700 }}
          // borderWidth={0}
          borderRadius={'10px'}
          fontSize={'15px'}
          outline={'none'}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
