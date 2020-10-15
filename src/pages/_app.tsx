import "../styles/globals.css";

import * as React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { AppState } from "@auth0/auth0-react/dist/auth0-provider";
import { AppProps } from "next/app";
import Router from "next/router";

import Layout from "components/layout";
import { ApolloProvider, InitialState } from "lib/apollo-client";

const onRedirectCallback = (appState: AppState): void => {
  Router.replace(appState?.returnTo || "/");
};

const AvettRxApp: React.FC<AppProps<{
  initialApolloState: InitialState;
}>> = ({ Component, pageProps }) => {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
      redirectUri={typeof window !== "undefined" ? window.location.origin : ""}
      onRedirectCallback={onRedirectCallback}
    >
      <ApolloProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Auth0Provider>
  );
};

export default AvettRxApp;
