import axios from 'axios';
import { CONFIG } from '../../../../config';
import * as Sentry from '@sentry/nextjs';
import { apiLogger } from '@/utils/apiLogger';
import { sanitizeInput } from '@/utils/sanitizeInput';

const isDev = CONFIG.ENV === 'development';

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

const instance = axios.create({
  baseURL: isDev ? '/api' : '/api',
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
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
