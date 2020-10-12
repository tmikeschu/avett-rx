import "../styles/globals.css";

import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { AppProps } from "next/app";

import Layout from "components/layout";
import { useApollo } from "lib/apollo-client";
import { Any } from "lib/types";

const MyApp: React.FC<AppProps<{
  initialApolloState: Record<string, Any>;
}>> = ({ Component, pageProps }) => {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
    >
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Auth0Provider>
  );
};

export default MyApp;
