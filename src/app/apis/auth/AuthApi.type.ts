export type TokenType = NullAble<{
  access: string;
  refresh: string;
  // isRegister: boolean;
}>;
export type SendBirdTokenType = {
  sendBird: string;
  expiresAt: number;
  user_id: string;
};

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
