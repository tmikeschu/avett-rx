import * as React from "react";
import { useQuery } from "react-query";
import { Magic } from "magic-sdk";

import { User } from "api";
import { ApiResponse } from "lib/types";

import { Route } from "./routes";
import { createUsableContext } from "./utils";

const M =
  typeof window === "undefined"
    ? undefined
    : new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || "");

export type AuthContext = {
  user?: User;
  // TODO: state machine
  status: "loading" | "ready" | "loggingIn" | "loggingOut";
  client?: Magic;
};
export const [useAuthContext, AuthContext] = createUsableContext<AuthContext>({
  providerName: "AuthProvider",
  useName: "useAuth",
});

export type AuthDispatch = {
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};
export const [
  useAuthDispatch,
  AuthDispatch,
] = createUsableContext<AuthDispatch>({
  providerName: "AuthProvider",
  useName: "useAuthDispatch",
});

const logout = async () => {
  fetch(Route.ApiLogout);
};

const fetchUser = (): Promise<ApiResponse["user"]> =>
  fetch(Route.ApiUser)
    .then((r) => r.json())
    .then((data: ApiResponse["user"]) => {
      return { user: data?.user };
    });

const login = async (email: string): Promise<void> => {
  const body = { email };

  try {
    const didToken = await M?.auth.loginWithMagicLink({
      email: body.email,
    });
    const res = await fetch(Route.ApiLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error(await res.text());
    }
  } catch (error) {
    console.error("An unexpected error happened occurred:", error);
  }
};

const reducer = (
  state: AuthContext,
  action: Partial<AuthContext> | ((s: AuthContext) => Partial<AuthContext>)
): AuthContext => {
  switch (typeof action) {
    case "function": {
      return { ...state, ...action(state) };
    }
    default: {
      return { ...state, ...action };
    }
  }
};

const initialState: AuthContext = {
  status: "loading",
  user: undefined,
  client: M,
};

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useReducer(reducer, initialState);

  const { data, isLoading, refetch } = useQuery("user", fetchUser);
  React.useEffect(() => {
    setState({ user: data?.user });
  }, [data]);

  const dispatch = React.useMemo(
    () => ({
      login: async (email: string) => {
        setState({ status: "loggingIn" });
        await login(email);
        refetch();
      },
      logout: async () => {
        setState({ status: "loggingOut" });
        await logout();
        setState({ user: undefined, status: "ready" });
      },
    }),
    [refetch]
  );

  React.useEffect(() => {
    setState({
      status: isLoading ? "loading" : "ready",
    });
  }, [isLoading]);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatch.Provider value={dispatch}>{children}</AuthDispatch.Provider>
    </AuthContext.Provider>
  );
};
