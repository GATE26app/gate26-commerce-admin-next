import React, { useState } from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { GodsListItemDataListProps } from '@/app/apis/goods/GoodsApi.type';

import { ColorBlack, ColorGray400, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';
import { SettleItemDtoType } from '@/app/apis/settlement/SettlementApi.type';
import { intComma } from '@/utils/format';
import ButtonModal from '@/components/common/Modal/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';

// import { DataTableHeaderProps } from '@/components/Goods/List/GoodsDataTable';
interface DataTableHeaderProps {
  name: string;
  width: number;
}
interface Props {
  header: Array<DataTableHeaderProps>;
  item: SettleItemDtoType;
  index: number;
  pageNo?: number;
  totalCount?: number;
  status: number;
}
function SettleDetailCard({ header, item, index, pageNo, totalCount, status }: Props) {
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  return (
    <>
    <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />

      <LoadingModal
        children={isLoadingModal}
        isOpen={isLoadingModal}
        onClose={() => setLoadingModal(false)}
      />
    <Flex
      minW={'1120px'}
      flexDirection={'row'}
      justifyContent={'center'}
      py={'20px'}
      borderBottomColor={ColorGrayBorder}
      borderBottomWidth={1}
    >
      <Flex
        w={`${header[0]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.typeName}
        </Text>
      </Flex>
      <Flex
        w={`${header[1]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
        cursor={'pointer'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.orderId ? item.orderId : '-'}
        </Text>
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.merchantUid ? item.merchantUid : '-'}
        </Text>
      </Flex>
      <Flex
        w={`${header[2]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {/* 100,000원 */}
          {intComma(item.orderAmount)}원
        </Text>
      </Flex>
      {/* 결제수수료 */}
      <Flex
        w={`${header[2]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {/* 100,000원 */}
          {intComma(item.paymentAmount)}원
        </Text>
      </Flex>
      {/* 서비스이용 수수료 */}
      <Flex
        w={`${header[3]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.payMethodName}
        </Text>
      </Flex>
      {/* 예약자정보 */}
      <Flex
        w={`${header[4]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
        {intComma(item.paymentChargePercent)}%
        </Text>
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
        {intComma(item.paymentChargeAmount)}원
        </Text>
      </Flex>

      <Flex
        w={`${header[5]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
        {intComma(item.serviceChargePercent)}%
        </Text>
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
        {intComma(item.serviceChargeAmount)}원
        </Text>
      </Flex>
      <Flex
        w={`${header[7]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {intComma(item.discountChargeAmount)}원
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            ㅣ
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {intComma(item.discountSettlementAmount)}원
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={`${header[8]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={ColorBlack}
          textAlign={'center'}
        >
          {intComma(item.settlementAmount)}원
        </Text>
      </Flex>
      {status == 0 && (
        <Flex
        w={`${header[9]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <Flex
              borderRadius={'6px'}
              borderColor={ColorGray400}
              borderWidth={1}
              px={'15px'}
              py={'7px'}
              cursor={'pointer'}
              onClick={() => {}}
            >
              <Text fontSize={'12px'} fontWeight={500} color={ColorGray700}>
                수정하기
              </Text>
            </Flex>
            <Flex
              borderRadius={'6px'}
              borderColor={ColorGray400}
              borderWidth={1}
              px={'15px'}
              py={'7px'}
              cursor={'pointer'}
              onClick={() => {
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '정산내역 삭제',
                  message: `정산 내역을 삭제하시겠습니까?`,
                  type: 'confirm',
                  okButtonName: '확인',
                  cbOk: () => {
                    // deleteMutate(String(item.couponId));
                    setLoadingModal(true);
                  },
                });
              }}
            >
              <Text fontSize={'12px'} fontWeight={500} color={ColorGray700}>
                삭제하기
              </Text>
            </Flex>
          </Flex>
      </Flex>
      )}
    </Flex>
    </>
  );
}

export default SettleDetailCard;
