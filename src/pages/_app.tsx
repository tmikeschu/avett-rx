import "../styles/globals.css";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "styles/theme";

import { ApolloProvider } from "lib/apollo-client";
import { AuthProvider } from "lib/auth";
import mockServiceWorker from "mocks";

if (process.env.MOCK_SERVICE_WORKER === "1") {
  mockServiceWorker();
}

const AvettRxApp: React.FC<AppProps> = ({
  Component,
  pageProps: { initialApolloState = {}, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ApolloProvider initialState={initialApolloState}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default AvettRxApp;
