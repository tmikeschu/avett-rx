import styles from "../styles/Home.module.css";

import * as React from "react";
import Head from "next/head";

import { useGetTagsQuery } from "api";
import Text from "components/text";

const Home: React.FC = () => {
  const { data, loading } = useGetTagsQuery();
  const tags = data && data.allTags ? data.allTags.data : [];

  return (
    <div className={styles.container}>
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/avettrx.svg" />
      </Head>

      <main className={styles.main}>
        <Text variant="h2">Tags</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          tags.map((tag) => (tag ? <div key={tag._id}>{tag.name}</div> : null))
        )}
      </main>
    </div>
  );
};

export default Home;
