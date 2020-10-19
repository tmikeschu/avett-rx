import React from "react";
import { render, RenderResult } from "@testing-library/react";
import fetch from "cross-fetch";
import { NextRouter } from "next/router";

import { ApolloProvider } from "lib/apollo-client";

import RouterProvider from "./router-provider";

type AllTheProvidersProps = {
  router?: Partial<NextRouter>;
  wrapper?: React.FC;
};

const AllTheProviders = ({
  router,
  wrapper: Wrapper = ({ children }) => <>{children}</>,
}: AllTheProvidersProps) => {
  const _AllTheProviders: React.FC = ({ children }) => {
    return (
      <RouterProvider router={router}>
        <ApolloProvider options={{ httpOptions: { fetch } }}>
          <Wrapper>{children}</Wrapper>
        </ApolloProvider>
      </RouterProvider>
    );
  };
  return _AllTheProviders;
};

type RenderParams = Parameters<typeof render>;
const customRender = (
  ui: RenderParams[0],
  { router, wrapper, ...options }: RenderParams[1] & AllTheProvidersProps = {}
): RenderResult =>
  render(ui, {
    wrapper: AllTheProviders({ router, wrapper }),
    ...options,
  });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
export { default as user } from "@testing-library/user-event";
