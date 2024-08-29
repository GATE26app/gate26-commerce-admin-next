import React from 'react';
import DetailHeader from './DetailHeader';
import { Box } from '@chakra-ui/react';
import BasicInfo from './Goods/BasicInfo';
import { ColorGrayBorder, ColorLineGray } from '@/utils/_Palette';
import ExplainComponent from './ExplainComponent';
import TravlePlanComoponent from './TravlePlanComoponent';
import BookingCheckComponent from './BookingCheckComponent';
import CancelComponent from './CancelComponent';
import SellerInfo from './SellerInfo';

interface Props {
  info: any;
}
function PreviewComponent({ info }: Props) {
  return (
    <Box>
      <BasicInfo info={info} />
      <Box h={'1px'} w={'100%'} bgColor={ColorGrayBorder}></Box>
      <ExplainComponent info={info} />
      {info != undefined && info?.schedules?.length > 0 && (
        <TravlePlanComoponent info={info?.schedules} />
      )}
      {/* 예약전 확인사항 */}
      {info != undefined && info?.reservationInfo && (
        <>
          <BookingCheckComponent comment={info?.reservationInfo} />
          <Box h={'10px'} w={'100%'} bgColor={ColorLineGray}></Box>
        </>
      )}

      {/* 취소 및 환불 규정 */}
      {info != undefined && info?.policies?.length > 0 && (
        <>
          <CancelComponent info={info?.policies} />
          <Box h={'10px'} w={'100%'} bgColor={ColorLineGray}></Box>
        </>
      )}
      {/* 파트너 */}
      {info != undefined && (
        <>
          <SellerInfo />
        </>
      )}
    </Box>
  );
}

export default PreviewComponent;
