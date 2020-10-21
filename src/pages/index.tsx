import * as React from "react";
import Head from "next/head";

import ViewTags from "features/view-tags";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen px-2 flex flex-col items-center justify-center">
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/avettrx.svg" />
      </Head>

      <main className="px-20 flex-1 flex flex-col justify-center items-center">
        <ViewTags />
      </main>
    </div>
  );
};

export default Home;
