import { Role, User } from "api";

import { adminClient, getClient, q } from "../fauna";

type AuthUser = { secret: string; data: User };

export const findOrCreateUserByEmail = async (
  email: string
): Promise<AuthUser | undefined> => {
  return await adminClient
    .query<AuthUser>(
      q.Call("user_login_or_create", email, { email, roles: [Role.Basic] })
    )
    .catch(() => undefined);
};

export const invalidateFaunaDBToken = async (token: string): Promise<void> => {
  await getClient(token).query(q.Logout(true));
};
