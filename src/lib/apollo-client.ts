import * as React from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { Any } from "./types";

type Cache = Record<string, Any>;
type InitialState = Record<string, Any>;

let apolloClient: ApolloClient<Cache>;

function createApolloClient(): ApolloClient<Cache> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "https://graphql.fauna.com/graphql", // Server URL (must be absolute)
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_VISITOR_KEY}`,
      },
    }),
    cache: new InMemoryCache({}),
  });
}

export function initializeApollo(
  initialState: InitialState = null
): ApolloClient<Cache> {
  const _apolloClient = apolloClient ?? createApolloClient();

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
  const store = React.useMemo(() => initializeApollo(initialState), [
    initialState,
  ]);
  return store;
}
