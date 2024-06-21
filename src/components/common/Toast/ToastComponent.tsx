import { Box, useToast } from '@chakra-ui/react';
import React from 'react';

function ToastComponent(message: string) {
  const toast = useToast();
  return toast({
    position: 'top',
    duration: 2000,
    render: () => (
      <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
        {`${message}`}
      </Box>
    ),
  });
}

export default ToastComponent;
