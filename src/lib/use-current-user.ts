import { useAuth0 } from "@auth0/auth0-react";

import { AuthedUser } from "./types";

const FAUNA_SECRET_KEY = "https://faunadb.com/id/secret";

export default function useCurrentUser(): { user?: AuthedUser } {
  const { user } = useAuth0();
  return {
    user: user ? { ...user, token: user[FAUNA_SECRET_KEY] } : undefined,
  };
}
