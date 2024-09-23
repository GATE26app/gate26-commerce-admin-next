import axios from 'axios';
import { CONFIG } from '../../../../config';
import * as Sentry from '@sentry/nextjs';
import { apiLogger } from '@/utils/apiLogger';

const isDev = CONFIG.ENV === 'development';

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
