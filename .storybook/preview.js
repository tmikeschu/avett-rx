import "../src/styles/globals.css";
import * as React from "React";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../src/styles/theme";
import { worker } from "../src/mocks/browser";
import { ApolloProvider } from "../src/test/apollo-provider";
import { AuthProvider } from "../src/lib/auth";
import RouterProvider from "../src/test/router-provider";
import { QueryClient, QueryClientProvider } from "react-query";

worker.start();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

const queryClient = new QueryClient();
export const decorators = [
  (Story) => <Story />,
  (Story) => (
    <RouterProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <ApolloProvider>
              <Story />
            </ApolloProvider>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </RouterProvider>
  ),
];
