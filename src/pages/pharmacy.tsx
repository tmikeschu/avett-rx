import * as React from "react";
import Head from "next/head";

import Pharmacy from "features/pharmacy";

const PharmacyPage: React.FC = () => {
  return (
    <div className="px-4 flex flex-col items-center justify-center">
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/avettrx.svg" />
      </Head>

      <main className="flex-1 flex flex-col w-full">
        <Pharmacy />
      </main>
    </div>
  );
};

export default PharmacyPage;
