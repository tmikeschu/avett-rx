import * as React from "react";
import Head from "next/head";

const IMAGE_URI = "https://avettrx.com/social.png";
const TITLE = "Avett Rx";
const URL = "https://avettrx.com/";
const DESCRIPTION =
  "You've got the feels. They've got the tunes. Get an Avett Brothers song prescribed for whatever mood you'd like.";

export const AppMetaData: React.FC = ({ children }) => {
  return (
    <Head>
      <title>{TITLE}</title>
      <link rel="icon" type="image/svg+xml" href="/avettrx.svg" />

      <meta name="title" content={TITLE} />
      <meta name="description" content={DESCRIPTION} />
      <meta name="image" content={IMAGE_URI} />
      <meta name="url" content={URL} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={URL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={IMAGE_URI} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={URL} />
      <meta property="twitter:title" content={TITLE} />
      <meta property="twitter:description" content={DESCRIPTION} />
      <meta property="twitter:image" content={IMAGE_URI}></meta>
      {children}
    </Head>
  );
};

export const AdminMetaData: React.FC = ({ children }) => {
  return (
    <Head>
      <title>{TITLE}</title>
      <link rel="icon" type="image/svg+xml" href="/avettrx.svg" />

      <meta name="title" content={TITLE} />
      <meta name="description" content={DESCRIPTION} />
      <meta name="image" content={IMAGE_URI} />
      <meta name="url" content={URL} />
      {children}
    </Head>
  );
};
