import * as React from "react";
import {
  ApolloClient,
  ApolloProvider as AP,
  createHttpLink,
  HttpOptions,
  InMemoryCache,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

import { Route } from "./routes";
import { Any } from "./types";

type Cache = Record<string, Any>;
export type InitialState = Record<string, Any>;

let apolloClient: ApolloClient<Cache>;

type CreateClientOptions = {
  httpOptions?: HttpOptions;
};

function createApolloClient({
  httpOptions = {},
}: CreateClientOptions = {}): ApolloClient<Cache> {
  const httpLink = createHttpLink({
    uri: Route.ApiGraphql,
    credentials: "same-origin",
    ...httpOptions,
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: httpLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allSongs: relayStylePagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState: InitialState = {},
  options: CreateClientOptions = {}
): ApolloClient<Cache> {
  const _apolloClient = apolloClient
    ? apolloClient
    : createApolloClient({ ...options });

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

export function useApollo(
  initialState: InitialState,
  options: CreateClientOptions = {}
): ApolloClient<Cache> {
  const store = React.useMemo(() => {
    return initializeApollo(initialState, options);
  }, [initialState, options]);

  return store;
}

export const ApolloProvider: React.FC<{
  initialState?: InitialState;
  options?: CreateClientOptions;
}> = ({ children, initialState = {}, options }) => {
  const client = useApollo(initialState, options);
  return <AP client={client}>{children}</AP>;
};
