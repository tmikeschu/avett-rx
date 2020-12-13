import "../styles/globals.css";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { theme } from "styles/theme";

import { ApolloProvider } from "lib/apollo-client";
import { AuthProvider } from "lib/auth";
import mockServiceWorker from "mocks";

if (process.env.MOCK_SERVICE_WORKER === "1") {
  mockServiceWorker();
}

const IMAGE_URI = "https://avettrx.com/social.png";
const AvettRxApp: React.FC<AppProps> = ({
  Component,
  pageProps: { initialApolloState = {}, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ApolloProvider initialState={initialApolloState}>
          <Head>
            <title>Avett Rx</title>
            <meta name="title" content="Avett Rx" />
            <meta
              name="description"
              content="You've got the feels. They've got the tunes. Get an Avett Brothers song prescribed for whatever mood you'd like."
            />
            <meta name="image" content={IMAGE_URI} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://avettrx.com/" />
            <meta property="og:title" content="Avett Rx" />
            <meta
              property="og:description"
              content="You've got the feels. They've got the tunes. Get an Avett Brothers song prescribed for whatever mood you'd like."
            />
            <meta property="og:image" content={IMAGE_URI} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://avettrx.com/" />
            <meta property="twitter:title" content="Avett Rx" />
            <meta
              property="twitter:description"
              content="You've got the feels.  They've got the tunes. Get an Avett Brothers song prescribed for whatever mood you'd like."
            />
            <meta property="twitter:image" content={IMAGE_URI}></meta>
          </Head>
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default AvettRxApp;
