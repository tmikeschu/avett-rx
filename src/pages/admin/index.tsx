import * as React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";

import { LoginButton, LogoutButton } from "features/auth";
import { useAuthContext } from "lib/auth";

const AdminHome: NextPage = () => {
  const { user } = useAuthContext();
  return user ? (
    <Flex direction="column" align="flex-start" w="full" h="full" pt="4">
      <Flex w="full" justify="space-between" px={[4, null, 0]}>
        <Box>
          <Heading as="h1" fontSize="2xl">
            Avett Rx Admin
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {user.email}
          </Text>
        </Box>
        <LogoutButton />
      </Flex>
    </Flex>
  ) : (
    <Flex align="center" justify="center" direction="column" h="full" w="full">
      <LoginButton />
    </Flex>
  );
};

export default AdminHome;
