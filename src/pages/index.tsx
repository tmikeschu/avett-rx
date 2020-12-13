import * as React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import Link from "components/link";
import ViewTags from "features/view-tags";

const Home: NextPage = () => {
  return (
    <Flex
      minHeight="100vh"
      px="2"
      direction="column"
      justify="center"
      align="center"
    >
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex py="20" flex="1" direction="column" justify="center" align="center">
        <Heading
          as="h1"
          m="0"
          lineHeight="shorter"
          fontSize={["4xl", "6xl"]}
          textAlign="center"
        >
          Welcome to Avett Rx
        </Heading>

        <Text m="0" fontSize="xl" textAlign="center" mb={4}>
          You&apos;ve got the feels.
          <br />
          They&apos;ve got the tunes.
        </Text>

        <ViewTags />

        <Link href="/pharmacy">
          <Button variant="link" colorScheme="purple" mt={4}>
            Get a prescription
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Home;
