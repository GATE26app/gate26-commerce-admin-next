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

import {
  ColorGray700,
  ColorGrayBorder,
  ColorTextBlack,
} from '@/utils/_Palette';
import { categoryDTO, locationsDTO } from '@/app/apis/goods/GoodsApi.type';

interface OneButtonModalProps extends ModalProps {
  // onConfirm?: () => void;
  location: Array<locationsDTO>;
  category: Array<categoryDTO>;
}
function CategoryModal(props: Omit<OneButtonModalProps, 'children'>) {
  return (
    <Modal closeOnOverlayClick={false} {...props} isCentered>
      <ModalOverlay />
      <ModalContent mx="38px">
        <ModalBody p={0}>
          <Flex
            w="100%"
            h="100%"
            flexDirection="column"
            px={'20px'}
            py={'25px'}
            // justifyContent="center"
            // alignItems="center"
          >
            {props.category && props.category.length > 0 && (
              <>
                <Flex justifyContent={'space-between'} mb={'17px'}>
                  <Text
                    fontWeight={800}
                    fontSize={'16px'}
                    color={ColorTextBlack}
                  >
                    등록된 카테고리
                  </Text>
                  <Image
                    src="/images/commerce/ico_close_modal.png"
                    w={'26px'}
                    h={'26px'}
                    onClick={() => props.onClose()}
                  />
                </Flex>
                <Flex
                  flexDirection={'column'}
                  maxH={'200px'}
                  overflowY={'auto'}
                  mb={'23px'}
                >
                  {props.category &&
                    props.category.map((item, index) => {
                      return (
                        <Box
                          key={index}
                          mb={'15px'}
                          paddingTop={'15px'}
                          borderTopColor={ColorGrayBorder}
                          borderTopWidth={1}
                        >
                          <Text
                            fontSize={'13px'}
                            fontWeight={400}
                            color={ColorGray700}
                          >
                            {item.fullTitle}
                          </Text>
                        </Box>
                      );
                    })}
                </Flex>
              </>
            )}
            {props.location && props.location.length > 0 && (
              <>
                <Flex justifyContent={'space-between'} mb={'17px'}>
                  <Text
                    fontWeight={800}
                    fontSize={'16px'}
                    color={ColorTextBlack}
                  >
                    등록된 나라
                  </Text>
                </Flex>
                <Flex
                  flexDirection={'column'}
                  maxH={'200px'}
                  overflowY={'auto'}
                  mb={'23px'}
                >
                  {props.location &&
                    props.location.map((item, index) => {
                      return (
                        <Box
                          key={index}
                          mb={'15px'}
                          pt={'15px'}
                          borderTopColor={ColorGrayBorder}
                          borderTopWidth={1}
                        >
                          <Text
                            fontSize={'13px'}
                            fontWeight={400}
                            color={ColorGray700}
                          >
                            {item.fullTitle}
                          </Text>
                        </Box>
                      );
                    })}
                </Flex>
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CategoryModal;
