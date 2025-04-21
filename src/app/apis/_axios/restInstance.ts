import axios from 'axios';
import { CONFIG } from '../../../../config';

import { apiLogger } from '@/utils/apiLogger';
import { getApi, getToken } from '@/utils/localStorage/token/index';
import { sanitizeInput } from '@/utils/sanitizeInput';

const isDev = CONFIG.ENV === 'development';

// 객체의 모든 문자열 값에 대해 sanitize를 수행하는 함수
const sanitizeObject = (obj: any): any => {
  // FormData나 Blob 객체는 sanitize하지 않음
  if (obj instanceof FormData || obj instanceof Blob) {
    return obj;
  }

  if (typeof obj === 'string') {
    return sanitizeInput(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (typeof obj === 'object' && obj !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'content') {
        sanitized[key] = value;
      } else {
        sanitized[key] = sanitizeObject(value);
      }
    }
    return sanitized;
  }

  return obj;
};

const instance = axios.create({
  baseURL: isDev ? '/api' : '/api',
  withCredentials: true,
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

instance.interceptors.response.use(
  (res) => {
    const { status, config: reqData, data: resData } = res;
    if (isDev) apiLogger({ status, reqData, resData });
    return res;
  },
  (error) => {
    const { response: res, config: originalRequest } = error || {};
    const { status } = res || {};
    const code = res?.data?.code;

    if (isDev) {
      apiLogger({
        status,
        reqData: originalRequest,
        resData: error,
        method: 'error',
      });
    }

    return Promise.reject(error);
  },
);

export default instance;
