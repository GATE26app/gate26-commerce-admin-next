import axios from 'axios';

import { CONFIG } from '../../../../config';
import * as Sentry from '@sentry/nextjs';
import { apiLogger } from '@/utils/apiLogger';
import * as common from '@/utils/common/CommonFunction';
import {
  deleteErrorCode,
  deleteUserInfo,
  getToken,
  getUserId,
  setToken,
} from '@/utils/localStorage/token';

import {
  getApi,
  setErrorCode,
  // setPassCheck,
} from '../../../utils/localStorage/token';
import { sanitizeInput } from '@/utils/sanitizeInput';

const isDev = CONFIG.ENV === 'development';

const instance = axios.create({
  baseURL: isDev ? '/backoffice' : '/backoffice',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthHeader = (token: string) => {
  if (token) {
    instance.defaults.headers.common['X-AUTH-TOKEN'] = token;
  }
};

const unsetAuthHeader = () => {
  delete instance.defaults.headers.common['X-AUTH-TOKEN'];
};

function refreshToken() {
  return axios({
    method: 'post',
    url: `/api/auth/jwt/refresh`,
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': `${getToken().refresh}`,
    },
  });
}

const alarmOffClosure = () => {
  let isCalled = false;
  let runningPromise: any = undefined;

  return () => {
    if (isCalled) {
      return runningPromise;
    } else {
      isCalled = true;
      const userId = getUserId();

      if (userId !== null) {
        runningPromise = axios({
          method: 'POST',
          url: `/api/rest/users/${userId}/chatroom/alarm-off`,
        }).then(
          (response) => {
            isCalled = false; // 성공 시 플래그 리셋
            return response;
          },
          (error) => {
            isCalled = false; // 실패 시 플래그 리셋
            return Promise.reject(error);
          },
        );
        return runningPromise;
      } else {
        isCalled = false; // userId가 null인 경우 플래그 리셋
        return Promise.resolve(); // userId가 null이면 빈 Promise 반환
      }
    }
  };
};

const alarmOff = alarmOffClosure();

const Logout = async () => {
  const param = { id: '', incorrectNum: 0 };
  // setPassCheck(param);
  await alarmOff();
  deleteUserInfo();

  if (common.checkUserAgent() === 'ios') {
    (window as any).webkit?.messageHandlers?.LOGOUT_BRIDGE?.postMessage({});
  } else if (common.checkUserAgent() === 'android') {
    (window as any).android?.logout();
  } else {
    window.location.href = '/login';
  }
};

// 객체의 모든 문자열 값에 대해 sanitize를 수행하는 함수
const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return sanitizeInput(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (typeof obj === 'object' && obj !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }

  return obj;
};

instance.interceptors.request.use(
  (config) => {
    const token = getToken().access;
    const apiType = getApi();
    if (token && apiType !== 'auth') setAuthHeader(token);
    if (apiType === 'auth') {
      unsetAuthHeader();
    }

    // 요청 데이터 sanitize 처리
    if (config.data) {
      config.data = sanitizeObject(config.data);
    }
    if (config.params) {
      config.params = sanitizeObject(config.params);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const refreshExpiredTokenClosure = () => {
  let isCalled = false;
  let runningPromise: any = undefined;

  return () => {
    if (isCalled) {
      return runningPromise;
    } else {
      isCalled = true;
      runningPromise = refreshToken().then(
        (response) => {
          isCalled = false; // 토큰 갱신 성공 시 플래그 리셋
          return response;
        },
        (error) => {
          isCalled = false; // 토큰 갱신 실패 시 플래그 리셋
          return Promise.reject(error);
        },
      );
      return runningPromise;
    }
  };
};

const refreshExpiredToken = refreshExpiredTokenClosure();

instance.interceptors.response.use(
  (res) => {
    const { status, config: reqData, data: resData } = res;
    if (isDev) apiLogger({ status, reqData, resData });
    return res;
  },
  async (error) => {
    const { response: res, config: originalRequest } = error || {};
    const { status } = res || {};
    const isUnAuthError = status === 401;
    const code = res?.data?.code;
    setErrorCode(code);

    if (isDev) {
      apiLogger({
        status,
        reqData: originalRequest,
        resData: error,
        method: 'error',
      });
    }

    if (isUnAuthError) {
      console.log(!getToken().refresh);
      if (!getToken().refresh) {
        Sentry.captureMessage(
          `리프레쉬 토큰 발급 중 refresh Token ${getToken().refresh}`,
        );
        Logout();
        return Promise.reject(error);
      }

      try {
        const res = await refreshExpiredToken();
        if (res.data.data.accessToken) {
          const param = {
            access: res.data.data.accessToken,
            refresh: getToken().refresh,
          };
          setToken(param);
          deleteErrorCode();
          originalRequest.headers['X-AUTH-TOKEN'] = res.data.data.accessToken;
          return instance(originalRequest);
        }
      } catch (err) {
        Sentry.captureMessage(`리프레쉬 토큰 에러 ${getUserId()}`);
        Logout();
        unsetAuthHeader();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export { setAuthHeader, unsetAuthHeader };
export default instance;
