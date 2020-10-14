import styles from "../styles/Home.module.css";

import * as React from "react";
import Head from "next/head";

import { LoginButton } from "features/auth";

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Avett Rx Log in</title>
        <link rel="icon" href="/avettrx.svg" />
      </Head>

      <main className={styles.main}>
        <LoginButton />
      </main>
    </div>
  );
};

export default Login;
