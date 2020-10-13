//eslint-disable-next-line
export type Any = any;

export type AuthedUser = {
  token: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
};
