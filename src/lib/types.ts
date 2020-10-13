import { User } from "api";

//eslint-disable-next-line
export type Any = any;

export interface AuthedUser extends User {
  token: string;
}
