import * as React from "react";
import {
  ApolloClient,
  ApolloProvider as AP,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import { Any } from "./types";
import useCurrentUser from "./use-current-user";

type Cache = Record<string, Any>;
export type InitialState = Record<string, Any>;

let apolloClient: ApolloClient<Cache>;

function createApolloClient({
  token,
}: {
  token?: string;
} = {}): ApolloClient<Cache> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_FAUNA_GRAPHQL_URI,
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${
          token || process.env.NEXT_PUBLIC_FAUNA_VISITOR_KEY
        }`,
      },
      ...(process.env.NODE_ENV === "test"
        ? { fetch: require("cross-fetch") }
        : {}),
    }),
    cache: new InMemoryCache({}),
  });
}

export function initializeApollo({
  token,
  ...initialState
}: InitialState = {}): ApolloClient<Cache> {
  const _apolloClient = apolloClient ?? createApolloClient({ token });

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: InitialState): ApolloClient<Cache> {
  const { user = { token: "" } } = useCurrentUser();

  const store = React.useMemo(
    () => initializeApollo({ ...initialState, token: user.token }),
    [initialState, user.token]
  );

  return store;
}

export const ApolloProvider: React.FC<{
  initialState?: InitialState;
}> = ({ children, initialState = {} }) => {
  const client = useApollo(initialState);
  return <AP client={client}>{children}</AP>;
};
