import * as React from "react";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";

import Pharmacy from "features/pharmacy";

const PharmacyPage: React.FC = () => {
  return (
    <Flex direction="column" align="center" justify="center" px={4}>
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/avettrx.svg" />
      </Head>

      <Flex as="main" flex={1} direction="column" w="100%">
        <Pharmacy />
      </Flex>
    </Flex>
  );
};

export default PharmacyPage;
