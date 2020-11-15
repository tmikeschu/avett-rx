import "../styles/globals.css";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "styles/theme";

import Layout from "components/layout";
import { ApolloProvider, InitialState } from "lib/apollo-client";
import { AuthProvider } from "lib/auth";
import mockServiceWorker from "mocks";

if (process.env.MOCK_SERVICE_WORKER === "1") {
  mockServiceWorker();
}

const AvettRxApp: React.FC<AppProps<{
  initialApolloState: InitialState;
}>> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ApolloProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default AvettRxApp;
