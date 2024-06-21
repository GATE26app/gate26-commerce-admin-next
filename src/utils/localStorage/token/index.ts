import { TokenType } from '@/app/apis/auth/AuthApi.type';
import { CONFIG } from '../../../../config';

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../helper';

const TOKEN_KEY = CONFIG.AUTH_TOKEN_KEY || '@token';

const GateUserDefaultKey = {
  _EMAIL: 'email',
  _IS_SAVE: 'isSaveEmail',
  _USER_ID: 'userId',
  _SERVICE_PROVIDER: 'serviceProvider',
  _IS_FINISH_SETTING: 'isFinishSetting',
  _NICK_NAME: 'nickName',
  _TOKEN: 'token',
  _GUEST_TYPE: 'guestType',
  _API_TYPE: 'apiType',
  _PASS_CHECK: 'passCheck',
  _ERROR: 'error',
  _EVENT: 'event',
  _TODAY: 'today',
  _USER_TYPE: 'userType',
  _IS_CERTIFIED: 'isCertified',
  _IS_INTRUDUCE: 'isIntruduce',
  _HOME_VISITIED: 'homeVisited',
};

export const getToken = () => {
  const token = getLocalStorage<TokenType>(TOKEN_KEY, {
    access: null,
    refresh: null,
  });
  return token;
};

export const setToken = (token: TokenType) => {
  setLocalStorage(TOKEN_KEY, token);
};

export const deleteToken = () => {
  removeLocalStorage(TOKEN_KEY);
};

export const setEmail = (email: string) => {
  setLocalStorage(GateUserDefaultKey._EMAIL, email);
};

export const getEmail = () => {
  const email = getLocalStorage<string | null>(GateUserDefaultKey._EMAIL);
  return email;
};

export const deleteEmail = () => {
  removeLocalStorage(GateUserDefaultKey._EMAIL);
};

export const setIsSaveEmail = (isSave: boolean) => {
  setLocalStorage(GateUserDefaultKey._IS_SAVE, isSave);
};

export const getIsSaveEmail = () => {
  const email = getLocalStorage<boolean | null>(GateUserDefaultKey._IS_SAVE);
  return email;
};

export const deleteIsSaveEmail = () => {
  removeLocalStorage(GateUserDefaultKey._IS_SAVE);
};

export const setUserId = (email: string) => {
  setLocalStorage(GateUserDefaultKey._USER_ID, email);
};

export const getUserId = () => {
  const email = getLocalStorage<string | null>(GateUserDefaultKey._USER_ID);
  return email;
};

export const deleteUserId = () => {
  removeLocalStorage(GateUserDefaultKey._USER_ID);
};

export const setServiceProvider = (email: string) => {
  setLocalStorage(GateUserDefaultKey._SERVICE_PROVIDER, email);
};

export const getServiceProvider = () => {
  const email = getLocalStorage<string>(GateUserDefaultKey._SERVICE_PROVIDER);
  return email;
};

export const deleteServiceProvider = () => {
  removeLocalStorage(GateUserDefaultKey._SERVICE_PROVIDER);
};

export const setIsFinishSetting = (email: string) => {
  setLocalStorage(GateUserDefaultKey._IS_FINISH_SETTING, email);
};

export const getIsFinishSetting = () => {
  const email = getLocalStorage<string>(GateUserDefaultKey._IS_FINISH_SETTING);
  return email;
};

export const deleteIsFinishSetting = () => {
  removeLocalStorage(GateUserDefaultKey._IS_FINISH_SETTING);
};

export const setNickname = (email: string) => {
  setLocalStorage(GateUserDefaultKey._NICK_NAME, email);
};

export const getNickname = () => {
  const email = getLocalStorage<string>(GateUserDefaultKey._NICK_NAME);
  return email;
};

export const deleteNickname = () => {
  removeLocalStorage(GateUserDefaultKey._NICK_NAME);
};

export const setGuest = (guestType: string) => {
  setLocalStorage(GateUserDefaultKey._GUEST_TYPE, guestType);
};

export const getGuest = () => {
  const email = getLocalStorage<string>(GateUserDefaultKey._GUEST_TYPE);
  return email;
};

export const deleteGuest = () => {
  removeLocalStorage(GateUserDefaultKey._GUEST_TYPE);
};

export const setApi = (apiType: string) => {
  setLocalStorage(GateUserDefaultKey._API_TYPE, apiType);
};

export const getApi = () => {
  const email = getLocalStorage<string>(GateUserDefaultKey._API_TYPE);
  return email;
};

export const deleteApi = () => {
  removeLocalStorage(GateUserDefaultKey._API_TYPE);
};
// export const setPassCheck = (passCheck: PassCheckType) => {
//   setLocalStorage(GateUserDefaultKey._PASS_CHECK, passCheck);
// };

// export const getPassCheck = () => {
//   const email = getLocalStorage<PassCheckType>(GateUserDefaultKey._PASS_CHECK);
//   return email;
// };

// export const deletePassCheck = () => {
//   removeLocalStorage(GateUserDefaultKey._PASS_CHECK);
// };
export const setErrorCode = (code: string) => {
  setLocalStorage(GateUserDefaultKey._ERROR, code);
};

export const getErrorCode = () => {
  const email = getLocalStorage<string>(GateUserDefaultKey._ERROR);
  return email;
};

export const deleteErrorCode = () => {
  removeLocalStorage(GateUserDefaultKey._ERROR);
};

export const setEvent = (code: number) => {
  setLocalStorage(GateUserDefaultKey._EVENT, code);
};

export const getEventNum = () => {
  const email = getLocalStorage<number>(GateUserDefaultKey._EVENT);
  return email;
};

export const deleteEvent = () => {
  removeLocalStorage(GateUserDefaultKey._EVENT);
};

export const setToday = (today: number) => {
  setLocalStorage(GateUserDefaultKey._TODAY, today);
};

export const getToday = () => {
  const email = getLocalStorage<number>(GateUserDefaultKey._TODAY);
  return email;
};

export const deleteToday = () => {
  removeLocalStorage(GateUserDefaultKey._TODAY);
};

export const setUserType = (userType: string) => {
  setLocalStorage(GateUserDefaultKey._USER_TYPE, userType);
};

export const getUserType = () => {
  const userType = getLocalStorage<string>(GateUserDefaultKey._USER_TYPE);
  return userType;
};

export const deleteUserType = () => {
  removeLocalStorage(GateUserDefaultKey._USER_TYPE);
};

export const setIsCertified = (isCertified: string) => {
  setLocalStorage(GateUserDefaultKey._IS_CERTIFIED, isCertified);
};

export const getIsCertified = () => {
  const isCertified = getLocalStorage<string>(GateUserDefaultKey._IS_CERTIFIED);
  return isCertified;
};

export const deleteIsCertified = () => {
  removeLocalStorage(GateUserDefaultKey._IS_CERTIFIED);
};

export const setIsIntruduce = (isIntruduce: string) => {
  setLocalStorage(GateUserDefaultKey._IS_INTRUDUCE, isIntruduce);
};

export const getIsIntruduce = () => {
  const isCertified = getLocalStorage<string>(GateUserDefaultKey._IS_INTRUDUCE);
  return isCertified;
};

export const deleteIsIntruduce = () => {
  removeLocalStorage(GateUserDefaultKey._IS_INTRUDUCE);
};

export const setPopup = (guestType: string) => {
  setLocalStorage(GateUserDefaultKey._HOME_VISITIED, guestType);
};

export const getPopup = () => {
  const homeVisited = getLocalStorage<string>(
    GateUserDefaultKey._HOME_VISITIED,
  );
  return homeVisited;
};

export const deletePopup = () => {
  removeLocalStorage(GateUserDefaultKey._HOME_VISITIED);
};

export const setUserInfo = (
  token: TokenType,
  // userId: string,
  // socailType: string,
  // nickName: string,
  // isCertified: string,
  // isFinishProfileSetting: string,
  // userType: string,
) => {
  setToken(token);
  // setUserId(userId);
  // setServiceProvider(socailType);
  // setNickname(nickName);
  // setIsCertified(isCertified);
  // setIsFinishSetting(isFinishProfileSetting);
  // setUserType(userType);
};

export const deleteUserInfo = () => {
  deleteToken();
  deleteNickname();
  deleteServiceProvider();
  deleteUserId();
  deleteGuest();
  deleteIsCertified();
  deleteIsFinishSetting();
  deleteUserType();
};
