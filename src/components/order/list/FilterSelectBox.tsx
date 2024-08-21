import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderListParamsType } from '@/apis/order/OrderApi.type';


import {
  ColorBlack,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

interface Props {
  request: OrderListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<OrderListParamsType>>;
}
function FilterSelectBox({ request, setRequest }: Props) {
  return (
    <Flex mr={'15px'} mt={'30px'} flexWrap={'wrap'}>
      <Box w={'50%'} mr={'15px'}>
        <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
          구분
        </Text>
        <Flex mb={'30px'} flexWrap={'wrap'}>
          <Box
            bgColor={request.orderType == 0 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.orderType == 0 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            mr={'10px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, orderType: 0 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.orderType == 0 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              전체
            </Text>
          </Box>

          <Flex
            bgColor={request.orderType == 1 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.orderType == 1 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            mr={'10px'}
            cursor={'pointer'}
            justifyContent={'center'}
            // w={'115px'}
            onClick={() => setRequest({ ...request, orderType: 1 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.orderType == 1 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              상품
            </Text>
          </Flex>
          <Box
            bgColor={request.orderType == 2 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.orderType == 2 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            mr={'10px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, orderType: 2 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.orderType == 2 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              바우처
            </Text>
          </Box>
          <Box
            bgColor={request.orderType == 3 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.orderType == 3 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            mr={'10px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, orderType: 3 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.orderType == 3 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              예약형
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
          상태값
        </Text>
        <Flex mb={'30px'}>
          <Box
            bgColor={request.orderStatus == 0 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.orderStatus == 0 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            mr={'10px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, orderStatus: 0 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.orderStatus == 0 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              전체
            </Text>
          </Box>
          <Box
            bgColor={request.orderStatus == 1 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.orderStatus == 1 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            mr={'10px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, orderStatus: 1 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.orderStatus == 1 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              결제완료
            </Text>
          </Box>
          <Box
            bgColor={request.orderStatus == 2 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.orderStatus == 2 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            mr={'10px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, orderStatus: 2 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.orderStatus == 2 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              예약확정
            </Text>
          </Box>
          <Box
            bgColor={request.orderStatus == 3 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={request.orderStatus == 3 ? ColorRed : ColorInputBorder}
            py={'11px'}
            px={'14px'}
            mr={'10px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, orderStatus: 3 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.orderStatus == 3 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              이용일
            </Text>
          </Box>
          <Box
            bgColor={request.orderStatus == 10 ? ColorRed : ColorWhite}
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={
              request.orderStatus == 10 ? ColorRed : ColorInputBorder
            }
            py={'11px'}
            px={'14px'}
            mr={'10px'}
            cursor={'pointer'}
            onClick={() => setRequest({ ...request, orderStatus: 10 })}
          >
            <Text
              fontSize={'15px'}
              fontWeight={400}
              color={request.orderStatus == 10 ? ColorWhite : ColorGray700}
              lineHeight={'15px'}
            >
              이용완료
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default FilterSelectBox;
