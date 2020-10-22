import * as React from "react";
import Head from "next/head";

import Link from "components/link";
import Text from "components/text";
import ViewTags from "features/view-tags";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen px-2 flex flex-col items-center justify-center">
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/avettrx.svg" />
      </Head>

      <main className="px-20 flex-1 flex flex-col mt-48 items-center text-center">
        <Text variant="h2" className="mb-4">
          Welcome to Avett Rx.
        </Text>
        <Text variant="h3" className="mb-4">
          You&apos;ve got the feels,
          <br />
          they&apos;ve got the tunes.
        </Text>
        <ViewTags />
        <Link
          href="/pharmacy"
          className="underline mt-4 bg-primary px-2 py-1 rounded"
        >
          <Text className="mt-8" variant="button" color="light">
            Get a prescription
          </Text>
        </Link>
      </main>
    </div>
  );
};

export default Home;
