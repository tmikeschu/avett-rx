import * as React from "react";
import { Magic } from "magic-sdk";
import Router from "next/router";

import { Any } from "./types";
import useCurrentUser from "./use-current-user";
import { createUsableContext } from "./utils";

const M =
  typeof window === "undefined"
    ? undefined
    : new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || "");

export type AuthContext = {
  user?: Any;
  status: "loading" | "ready";
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  client?: Magic;
};
export const [useAuth, AuthContext] = createUsableContext<AuthContext>();

const logout = async () => {
  fetch("/api/logout");
};

const login = async (email: string): Promise<void> => {
  const body = { email };

  try {
    const didToken = await M?.auth.loginWithMagicLink({
      email: body.email,
    });
    const res = await fetch("/api/login", {
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

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<AuthContext>({
    status: "loading",
    user: undefined,
    client: M,
    login: async (email: string) => {
      const user = await login(email);
      setState((s) => ({ ...s, user }));
    },
    logout: async () => {
      await logout();
      setState((s) => ({ ...s, user: undefined }));
    },
  });
  const currentUser = useCurrentUser();

  React.useEffect(() => {
    setState((s) => ({ ...s, status: "ready" }));
  }, []);

  React.useEffect(() => {
    setState((s) => ({ ...s, user: currentUser }));
  }, [currentUser]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const MockAuthProvider: React.FC<{
  initialState?: Partial<AuthContext>;
}> = ({ children, initialState }) => {
  const mockLogin = React.useCallback(async (): Promise<void> => {
    setState((s) => ({ ...s, user: {} }));
  }, []);

  const mockLogout = React.useCallback(async (): Promise<void> => {
    setState((s) => ({ ...s, user: undefined }));
  }, []);

  const [state, setState] = React.useState<AuthContext>({
    status: "ready",
    user: undefined,
    client: undefined,
    login: mockLogin,
    logout: mockLogout,
    ...initialState,
  });

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
