import "../styles/globals.css";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "styles/theme";

const queryClient = new QueryClient();

import { useRouter } from "next/router";

import { AdminLayout, AppLayout } from "components/layouts";
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
  const router = useRouter();
  const Layout = router.asPath.match(/^\/admin/) ? AdminLayout : AppLayout;
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ApolloProvider initialState={initialApolloState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default AvettRxApp;
