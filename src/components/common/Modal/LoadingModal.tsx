import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Spinner,
} from '@chakra-ui/react';

import styled from '@emotion/styled';

function LoadingModal(props: ModalProps) {
  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent
        mx="38px"
        style={{ backgroundColor: 'rgba(0,0,0,0)', boxShadow: 'none' }}
      >
        <ModalBody p={0}>
          <Flex
            w="100%"
            h="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner
              mt="43px"
              mb="43px"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#FF6955"
              size="xl"
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LoadingModal;
