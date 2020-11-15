import * as React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";

import Link from "components/link";
import ViewTags from "features/view-tags";

const Home: React.FC = () => {
  return (
    <Flex justify="center" align="center" px={2} direction="column">
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/avettrx.svg" />
      </Head>

      <Flex
        as="main"
        px={20}
        flex={1}
        direction="column"
        mt={48}
        align="center"
        textAlign="center"
      >
        <Heading as="h2" mb={4} fontSize="6xl" letterSpacing="-0.05rem">
          Welcome to Avett Rx.
        </Heading>
        <Heading as="h3" mb={6} fontSize="3xl" lineHeight="1.2">
          You&apos;ve got the feels,
          <br />
          they&apos;ve got the tunes.
        </Heading>
        <ViewTags />
        <Link
          href="/pharmacy"
          mt={6}
          px={4}
          py={2}
          rounded="0.25rem"
          backgroundColor="purple.700"
          color="white"
          textTransform="uppercase"
          fontWeight="bold"
          _hover={{ backgroundColor: "purple.600" }}
        >
          Get a prescription
        </Link>
      </Flex>
    </Flex>
  );
};

export default Home;
