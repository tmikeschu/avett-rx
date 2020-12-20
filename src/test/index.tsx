import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderResult } from "@testing-library/react";
import { NextRouter } from "next/router";
import { theme } from "styles/theme";

import { AuthContext, AuthProvider } from "lib/auth";

import { ApolloProvider } from "./apollo-provider";
import RouterProvider from "./router-provider";

const queryClient = new QueryClient();
type AllTheProvidersProps = {
  router?: Partial<NextRouter>;
  auth?: Partial<AuthContext>;
  wrapper?: React.FC;
};

const makeOmniWrapper = ({
  router,
  wrapper: Wrapper = ({ children }) => <>{children}</>,
}: AllTheProvidersProps) => {
  const AllTheProviders: React.FC = ({ children }) => {
    return (
      <RouterProvider router={router}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ApolloProvider>
              <ChakraProvider theme={theme}>
                <Wrapper>{children}</Wrapper>
              </ChakraProvider>
            </ApolloProvider>
          </AuthProvider>
        </QueryClientProvider>
      </RouterProvider>
    );
  };
  return AllTheProviders;
};

type RenderParams = Parameters<typeof render>;
const customRender = (
  ui: RenderParams[0],
  {
    router,
    wrapper,
    auth,
    ...options
  }: RenderParams[1] & AllTheProvidersProps = {}
): RenderResult =>
  render(ui, {
    wrapper: makeOmniWrapper({ router, wrapper, auth }),
    ...options,
  });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
export { default as user } from "@testing-library/user-event";
