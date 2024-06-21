import { StringLocale } from 'yup/lib/locale';

export type TokenType = NullAble<{
  access: string;
  refresh: string;
  // isRegister: boolean;
}>;

export type LoginDTOType = {
  adminId: string;
  adminPwd: string;
};

export type LoginDTO = {
  data?: LoginInfo;
  message?: string;
  success: boolean;
};

export type LoginInfo = {
  accessToken: string;
  refreshToken: string;
};
