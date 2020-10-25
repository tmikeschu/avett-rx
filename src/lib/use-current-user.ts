import * as React from "react";
import Router from "next/router";
import useSWR from "swr";

import { Any } from "./types";

const fetcher = (url: string): Promise<{ user: Any }> =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

export default function useCurrentUser({
  redirectTo,
  redirectIfFound,
}: { redirectTo?: string; redirectIfFound?: boolean } = {}): Any | null {
  const { data, error } = useSWR("/api/user", fetcher);
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  React.useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  React.useEffect(() => {
    if (user) {
      localStorage.setItem("faunaToken", user.faunaToken);
    }
  }, [user]);

  return error ? null : user;
}
