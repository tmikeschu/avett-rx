import { User } from "api";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export type AuthSession = {
  token: string;
  issuer: string;
} & Pick<User, "_id" | "email" | "roles" | "_ts">;

type UserResponse = Omit<AuthSession, "token"> | undefined;
export type ApiResponse = {
  user: { user: UserResponse };
};
