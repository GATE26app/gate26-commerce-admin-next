import React, { RefObject, useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';
import moment from 'moment';

import {
  Box,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

import { formatDate, formatDated } from '@/utils/format';

import { PickerGrid } from './_fragments/DatePicker.style';
import DateTimePicker from './_fragments/DateTimePicker';
import Picker from './_fragments/Picker';
import PickerFooter from './_fragments/PickerFooter';
import PickerInput from './_fragments/PickerInput';

import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

interface CalendarProps {
  type: 'date' | 'datetime';
  curDate: dayjs.Dayjs;
  width?: string;
  onApply?: (val: dayjs.Dayjs) => void;
  disabled?: boolean;
  minDateTime?: string;
  maxDateTime?: string;
}

const DatePicker = ({
  type,
  curDate,
  width,
  onApply,
  disabled,
  minDateTime,
  maxDateTime,
}: CalendarProps) => {
  const originDate = curDate?.clone();
  const [date, setDate] = useState<dayjs.Dayjs>(curDate);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initRef = useRef(null);

  const handleDayClick = (current: dayjs.Dayjs) => {
    setDate(current);
  };

  const handleClose = () => {
    setDate(originDate);
    onClose();
  };
  const handleApply = () => {
    onClose();
    if (onApply) {
      onApply(date);
    }
  };

  useEffect(() => {
    setDate(curDate);
  }, [curDate]);

  return (
    <>
      <Popover
        initialFocusRef={initRef}
        isOpen={!disabled && isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Box w={width}>
            <PickerInput
              disabled={disabled}
              text={
                formatDated(date) == 'Invalid Date'
                  ? ''
                  : type === 'datetime'
                  ? dayjs(date).format('YY-MM-DD HH:mm')
                  : formatDated(date)
              }
              placeholder="날짜선택"
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent bg={'white'} w={'100%'} maxH={'430px'}>
          <Flex direction={'column'}>
            <Flex columnGap={'25px'}>
              <Picker
                date={date}
                setDate={setDate}
                onDayClick={handleDayClick}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
              />
              {type === 'datetime' && (
                <DateTimePicker date={date} onTimeClick={handleDayClick} />
              )}
            </Flex>

            <PickerGrid>
              <PickerFooter
                ref={initRef}
                onClickCancel={handleClose}
                onClickApply={handleApply}
              />
            </PickerGrid>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;
