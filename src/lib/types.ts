import { User } from "api";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export interface AuthedUser extends User {
  token: string;
}
