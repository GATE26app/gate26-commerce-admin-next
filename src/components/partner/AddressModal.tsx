import react, { useState } from 'react';

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import DaumPostcode from 'react-daum-postcode';
import { SocketAddress } from 'net';

interface TermsModalProps extends ModalProps {
    setAddress: any;
}

function AddressModal(props: Omit<TermsModalProps, 'children'>) {
  return (
    <>
      <Modal {...props} isCentered>
        <ModalOverlay />
        <ModalContent mx="38px">
          <ModalBody p={0}>
            <Flex
              w="100%"
              h="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              pb="30px"
            >
                <DaumPostcode
                    onComplete={(e) => {
                        props.setAddress(e);
                        props.onClose();
                    }}
                    autoClose // 선택 후 자동으로 창을 닫을지 여부
                />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* </Box> */}
    </>
  );
}
export default AddressModal;
