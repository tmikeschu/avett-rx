import "../styles/globals.css";

import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";

import { useApollo } from "lib/apollo-client";
import { Any } from "lib/types";

const MyApp: React.FC<AppProps<{
  initialApolloState: Record<string, Any>;
}>> = ({ Component, pageProps }) => {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
