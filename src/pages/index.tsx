import styles from "../styles/Home.module.css";

import * as React from "react";
import Head from "next/head";

import ViewTags from "features/view-tags";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/avettrx.svg" />
      </Head>

      <main className={styles.main}>
        <ViewTags />
      </main>
    </div>
  );
};

export default Home;
