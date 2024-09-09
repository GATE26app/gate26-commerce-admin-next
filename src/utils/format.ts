import dayjs, { Dayjs } from 'dayjs';

export const intComma = (x: number | string) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const DashDate = (date: string | null) => {
  return date !== null ? date.split(' ')[0] : '-';
};
const time = Date.now();

export const isVaildJson = (s: any) => {
  try {
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
};

export const formatDated = (date: dayjs.Dayjs) => {
  const yyyymmdd = date?.format('YYYY-MM-DD');
  const ampm = date?.format('a');
  const hhmm = date?.format('HH:mm');

  return yyyymmdd;
};

export const formatDate = (date: dayjs.Dayjs) => {
  const yyyymmdd = date?.format('YYYY-MM-DD');
  const ampm = date?.format('a');
  const hhmm = date?.format('HH:mm');

  return [yyyymmdd, ampm === 'am' ? '오전' : '오후', hhmm].join(' ');
};

export const formatDateDash = (d: any) => {
  let date = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${`0${monthIndex}`.slice(-2)}-${`0${day}`.slice(-2)}`;
};

export const formatDateMM = (d: any) => {
  let date = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${year}-${`0${monthIndex}`.slice(-2)}-${`0${day}`.slice(
    -2,
  )} ${hour}:${minute}`;
};
export const formatDateDot = (d: any) => {
  let date = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}.${`0${monthIndex}`.slice(-2)}.${`0${day}`.slice(-2)}`;
};
export const formatDateDay = (d: any) => {
  let date = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${`0${monthIndex}`.slice(-2)}/${`0${day}`.slice(-2)}`;
};
export const formatDateKR = (d: any) => {
  let date: any = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}년 ${`0${monthIndex}`.slice(-2)}월 ${`0${day}`.slice(-2)}일`;
};

export const formatDateMonth = (d: any) => {
  let date: any = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;

  return `${`0${monthIndex}`.slice(-2)}/${`0${day}`.slice(-2)}`;
};
export const formatDateTime = (d: any) => {
  let date = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();

  return `${year}.${monthIndex}.${`0${day}`.slice(
    -2,
  )} ${hour}:${`0${min}`.slice(-2)}`;
};

export const formatDateTimeDash = (d: Dayjs) => {
  const date = d.toDate();
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  const hour = `0${date.getHours()}`.slice(-2);
  const min = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);

  return `${year}-${month}-${day} ${hour}:${min}:${second}`;
};

export const formatDateMinTimeDash = (d: any) => {
  let date = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  const hour = `0${date.getHours()}`.slice(-2);
  const min = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);

  return `${year}-${month}-${day} ${hour}:${min}`;
};

export const getDays = (d: any) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let date = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const dayOfWeek = week[date.getDay()];
  return dayOfWeek;
};

export const MessageFormatTime = (d: any) => {
  let date = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d);
  const hour = date.getHours();
  const min = date.getMinutes();

  if (hour > 12) {
    return `오후 ${hour - 12}:${min}`;
  }
  return `오전 ${hour}:${min}`;
};

export const getAge = (birth: any) => {
  let date = null;
  if (birth instanceof Date) {
    date = birth;
  }
  date = new Date(birth);
  const birthYear = date.getFullYear();
  const currYear = new Date().getFullYear();

  return currYear - birthYear;
};
export const formatPhone = (num: string) => {
  var formatNum = '';
  try {
    if (num.length == 11) {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (num.length == 8) {
      formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else {
      if (num.indexOf('02') == 0) {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
      } else {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
    }
  } catch (e) {
    formatNum = num;
  }
  return formatNum;
};
export const formatTimer = (SECONDS: number) => {
  if (!SECONDS) return '';
  return new Date(SECONDS * 1000).toISOString().substr(14, 5);
};

export const formatExamTime = (SECONDS: number) => {
  const minutes = Math.floor(SECONDS / 60);
  const seconds = SECONDS - minutes * 60;
  if (minutes > 0) {
    return `${minutes}분 ${seconds}초`;
  }
  return `${seconds}초`;
};

export const imgPath = () => {
  if (DEV() === 'dev') {
    // return `http://192.168.0.63:40009/img/downloadFile?filePath=`;
    return `https://d2x6bq0qfvknb8.cloudfront.net`;
  } else {
    return `https://dmsxpx4f2ky7d.cloudfront.net`;
  }
};

export const filePath = () => {
  if (DEV() === 'dev') {
    // return `http://192.168.0.63:40009/img/downloadFile?filePath=`;
    return `https://cdbackoffice.gate26.co.kr`;
  } else {
    return `https://commercebackoffice.gate26.co.kr`;
  }
};
export const imgUserPath = () => {
  if (DEV() === 'dev') {
    return `http://dresource.gate26.co.kr/img/downloadFile?filePath=`;
  } else {
    return `https://resource.gate26.co.kr/img/downloadFile?filePath=`;
  }
};
export const imgTimePath = () => {
  if (DEV() === 'dev') {
    return `http://dresource.gate26.co.kr/img/downloadFile?t=${time}&filePath=`;
  } else {
    return `https://resource.gate26.co.kr/img/downloadFile?t=${time}&filePath=`;
  }
};

export function getImagePath(imagePath) {
  // 절대 경로인지 확인
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }
  return `${imgPath()}${imagePath}`;
}
export const DEV = () => {
  return '';
  // return 'dev';
};

// yyyy-mm-dd형식에 맞춰서 유효한 날짜인지 체크해주는 코드
export const checkInvalidDateYYYYMMDD = (value: string) => {
  var result = true;
  try {
    var date = value.split('-');
    if (date[0].length > 4 || date[1].length > 2 || date[2].length > 2)
      return false;
    var y = parseInt(date[0], 10),
      m = parseInt(date[1], 10),
      d = parseInt(date[2], 10);

    var dateRegex =
      /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    result = dateRegex.test(d + '-' + m + '-' + y);
  } catch (err) {
    result = false;
  }
  return result;
};
const paymentMethods = {
  card: '카드',
  trans: '실시간계좌이체',
  vbank: '가상계좌',
  phone: '휴대폰소액결제',
  paypal: '페이팔 SPB 일반결제',
  applepay: '애플페이',
  naverpay: '네이버페이',
  samsung: '삼성페이',
  kpay: 'KPay앱',
  kakaopay: '카카오페이',
  payco: '페이코',
  lpay: 'LPAY',
  ssgpay: 'SSG페이',
  tosspay: '토스간편결제',
  cultureland: '문화상품권',
  smartculture: '스마트문상',
  happymoney: '해피머니',
  booknlife: '도서문화상품권',
  point: '포인트결제',
  wechat: '위쳇페이',
  alipay: '알리페이',
  unionpay: '유니온페이',
  tenpay: '텐페이',
};

export const PaymentMethod = (value: string) => {
  return paymentMethods[value];
};

export function fetchWithDelay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Fetched data after delay');
    }, 3000); // 3초 후에 데이터를 가져옴
  });
}
