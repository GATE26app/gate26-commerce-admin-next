// 기종체크
// export function checkUserAgent() {
//   const browserInfo = navigator.userAgent;
//   if (browserInfo.indexOf('APP_WISHROOM_Android') > -1) {
//     //안드로이드
//     return 'android';
//   } else if (browserInfo.indexOf('APP_WISHROOM_IOS') > -1) {
//     //IOS iphone
//     return 'ios';
//   } else {
//     //아이폰, 안드로이드 외
//     return 'other';
//   }
// }
import { useRouter } from 'next/navigation';

import * as common from '@/utils/common/CommonFunction';

export function checkUserAgent() {
  const checkAgent = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
  if (checkAgent.indexOf('android') > -1) {
    //안드로이드
    return 'android';
  } else if (
    checkAgent.indexOf('iphone') > -1 ||
    checkAgent.indexOf('ipad') > -1 ||
    checkAgent.indexOf('ipod') > -1
  ) {
    //IOS iphone
    return 'ios';
  } else if (checkAgent.indexOf('mac') && navigator.maxTouchPoints) {
    //IOS iPad
    return 'ios';
  } else {
    return 'other';
  }
}

export function CalcCommentDate() {
  const date = new Date();

  const year = date.getFullYear().toString().slice(2.4);
  const realMonth = date.getMonth() + 1;
  const month = realMonth < 10 ? `0${realMonth}` : realMonth.toString();
  const day =
    date.getDate() < 10
      ? `0${date.getDate().toString()}`
      : date.getDate().toString();
  const hour =
    date.getDate() < 10
      ? `${date.getHours().toString()}`
      : date.getHours().toString();
  const minute =
    date.getDate() < 10
      ? `${date.getMinutes().toString()}`
      : date.getMinutes().toString();

  const nowDate = `${year}.${month}.${day} ${hour}:${minute} 기준`;
  return nowDate;
}

export function setGender(gender: string) {
  if (gender === 'F') {
    return '여자';
  } else if (gender === 'M') {
    return '남자';
  } else {
    return '성별미입력';
  }
}
