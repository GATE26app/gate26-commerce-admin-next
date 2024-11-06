import CustomButton from '@/components/common/CustomButton';
import SettlementModal from '@/components/common/Modal/SettlementModal';
import {
  COlorBlueSucces,
  ColorBlack,
  ColorBlue,
  ColorBlue100,
  ColorGray50,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { useSettleFilterZuInfo } from '@/_store/SettleFilterInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
  request: any;
  setRequest: React.Dispatch<React.SetStateAction<any>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

function SettleMentDivision({ request, setRequest, setOnSubmit }: Props) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const { settleFilterInfo, setSettleFilterInfo, deleteSettleFilterInfo } = useSettleFilterZuInfo(
    (state) => state,
  );
  return (
    <>
    {openModal && (
        <SettlementModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    <Flex
      bgColor={ColorGray50}
      borderRadius={'12px'}
      py={'20px'}
      px={'40px'}
      justifyContent={'space-between'}
      mt={'30px'}
    >
      <Flex alignItems={'center'}>
        <Text fontSize={'16px'} color={ColorBlack} fontWeight={700}>
          구분
        </Text>
        <Flex gap={'10px'} pl={'40px'}>
          <CustomButton
            text="전체"
            color={request.status == null ? ColorWhite : ColorGray700}
            bgColor={request.status == null ? ColorRed : ColorWhite}
            borderColor={request.status == null ? ColorRed : ColorInputBorder}
            fontSize="15px"
            px="14px"
            py="11px"
            onClick={() => {
              setRequest({ ...request, status: null });
              setSettleFilterInfo({
                ...settleFilterInfo,
                status: null,
              });
              setGoodsInfo({
                settlementState: true,
              });
            }}
          />
          <CustomButton
            text="미정산"
            color={request.status == 0 ? ColorWhite : ColorGray700}
            bgColor={request.status == 0 ? ColorRed : ColorWhite}
            borderColor={request.status == 0 ? ColorRed : ColorInputBorder}
            fontSize="15px"
            px="14px"
            py="11px"
            onClick={() => {
              setRequest({ ...request, status: 0 });
              setSettleFilterInfo({
                ...settleFilterInfo,
                status: 0,
              });
              setGoodsInfo({
                settlementState: true,
              });
            }}
          />
          <CustomButton
            text="정산완료"
            color={request.status == 10 ? ColorWhite : ColorGray700}
            bgColor={request.status == 10 ? ColorRed : ColorWhite}
            borderColor={request.status == 10 ? ColorRed : ColorInputBorder}
            fontSize="15px"
            px="14px"
            py="11px"
            onClick={() => {
              setRequest({ ...request, status: 10 });
              setSettleFilterInfo({
                ...settleFilterInfo,
                status: 10,
              });
              setGoodsInfo({
                settlementState: true,
              });
            }}
          />
        </Flex>
      </Flex>
    </Flex>
    </>
  );
}

export default SettleMentDivision;
