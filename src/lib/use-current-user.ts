import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { User } from "api";

const FAUNA_SECRET_KEY = "https://faunadb.com/id/secret";

export default function useCurrentUser(): { user?: User } {
  const { user } = useAuth0() as {
    user: User & { [FAUNA_SECRET_KEY]: string };
  };
  const token = user ? user[FAUNA_SECRET_KEY] : "";
  React.useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return { user: user || undefined };
}
