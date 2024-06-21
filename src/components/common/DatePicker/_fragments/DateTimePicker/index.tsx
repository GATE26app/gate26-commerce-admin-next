import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

import { FlexHidden, TimeBox } from './_fragments/DateTimePicker.style';

interface DateTimePickerProps {
  date: dayjs.Dayjs;
  onTimeClick?: (val: dayjs.Dayjs) => void;
}

const DateTimePicker = ({ date, onTimeClick }: DateTimePickerProps) => {
  const handleTimeClick = (
    type: 'am' | 'pm' | 'hour' | 'minute',
    value?: number,
  ) => {
    const curTime = date.clone();
    const hour = curTime.clone().format('H');
    let newDay: dayjs.Dayjs = dayjs();

    console.log('type', type);
    switch (type) {
      case 'am':
        newDay = date.hour(
          Number(hour) >= 12 ? Number(hour) - 12 : Number(hour),
        );
        break;
      case 'pm':
        newDay = date.hour(
          Number(hour) >= 12 ? Number(hour) : Number(hour) + 12,
        );
        break;
      case 'hour':
        if (value != undefined) {
          newDay = date.hour(value);
        }
        break;
      case 'minute':
        if (value != undefined) {
          newDay = date.minute(value);
        }
        break;
    }
    console.log('newDay', newDay);
    if (onTimeClick) {
      onTimeClick(newDay);
    }
  };
  const currentTime = () => {
    const curTime = date;
    const minute = curTime?.clone().format('m');
    let hour = curTime?.clone().format('H');
    hour = Number(hour) > 12 ? String(Number(hour) - 12) : hour;
    const ampm = curTime?.clone().format('a');

    return (
      <div style={{ paddingRight: '10px' }}>
        <Flex padding={'19px 10px'} columnGap={'10px'}>
          <TimeBox className="cur">{ampm === 'am' ? '오전' : '오후'}</TimeBox>
          <TimeBox className="cur">{hour}</TimeBox>
          <div>:</div>
          <TimeBox className="cur">{minute}</TimeBox>
        </Flex>
        <Flex padding={'0px 10px'} columnGap={'10px'}>
          <Flex direction={'column'}>
            <TimeBox
              className={ampm === 'am' ? 'select' : ''}
              onClick={() => handleTimeClick('am')}
            >
              오전
            </TimeBox>
            <TimeBox
              className={ampm === 'pm' ? 'select' : ''}
              onClick={() => handleTimeClick('pm')}
            >
              오후
            </TimeBox>
          </Flex>
          <Flex columnGap={'10px'}>
            <FlexHidden direction={'column'}>
              {Array(12)
                .fill(0)
                .map((item: unknown, h: number) => (
                  <TimeBox
                    key={date?.toString().concat(h.toString())}
                    className={Number(hour) === h ? 'select' : ''}
                    onClick={() =>
                      handleTimeClick('hour', ampm === 'am' ? h : h + 12)
                    }
                  >
                    {h === 0 ? (ampm === 'am' ? 0 : 12) : h}
                  </TimeBox>
                ))}
            </FlexHidden>
            <div style={{ width: '4px' }}></div>
            <FlexHidden direction={'column'}>
              {Array(60)
                .fill(0)
                .map((item: unknown, m: number) => (
                  <TimeBox
                    key={date?.toString().concat(m.toString())}
                    className={Number(minute) === m ? 'select' : ''}
                    onClick={() => handleTimeClick('minute', m)}
                  >
                    {m}
                  </TimeBox>
                ))}
            </FlexHidden>
          </Flex>
        </Flex>
      </div>
    );
  };
  return <div>{currentTime()}</div>;
};

export default DateTimePicker;
