import React, {
  ForwardRefRenderFunction,
  MutableRefObject,
  forwardRef,
} from 'react';

import { Flex, Text } from '@chakra-ui/react';

interface PickerFooterProps {
  onClickCancel: () => void;
  onClickApply: () => void;
}
const PickerFooter: ForwardRefRenderFunction<
  HTMLParagraphElement,
  PickerFooterProps
> = ({ onClickCancel, onClickApply }, ref) => {
  const forwardedRef = ref as MutableRefObject<HTMLParagraphElement | null>;
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      borderTop={'1px solid'}
      borderTopColor={'gray.200'}
      padding={'13.5px 20px 14px 20px'}
    >
      <Text
        fontWeight="400"
        fontSize="15px"
        color="gray.500"
        cursor={'pointer'}
        onClick={onClickCancel}
        ref={forwardedRef}
      >
        {'취소'}
      </Text>

      <Text
        fontWeight="700"
        fontSize="15px"
        color="primary.500"
        cursor={'pointer'}
        onClick={onClickApply}
        ref={forwardedRef}
      >
        {'확인'}
      </Text>
    </Flex>
  );
};

export default forwardRef(PickerFooter);
