import { AxiosInstance } from 'axios';

import { LoginDTO, LoginDTOType } from './AuthApi.type';
import instance from '../_axios/instance';

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 로그인
  postLogin = async (body: LoginDTOType): Promise<LoginDTO> => {
    const { data } = await this.axios({
      method: 'post',
      url: '/admin/member/login',
      data: JSON.stringify(body),
    });
    return data;
  };
}

const authApi = new AuthApi();

export default authApi;
