import axios from 'axios';
import { CONFIG } from '../../../../config';

import { apiLogger } from '@/utils/apiLogger';
import { getApi, getToken } from '@/utils/localStorage/token/index';

const isDev = CONFIG.ENV === 'development';

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
