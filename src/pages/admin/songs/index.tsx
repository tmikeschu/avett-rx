import * as React from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";

import AdminSongs from "features/admin/songs";
import { useAuthContext } from "lib/auth";

const AdminSongsPage: NextPage = () => {
  const { user } = useAuthContext();
  if (!user) return <Spinner />;
  return (
    <Flex direction="column" align="flex-start" w="full" h="full" pt="4">
      <Flex w="full" justify="space-between" px={[4, null, 0]}>
        <AdminSongs />
      </Flex>
    </Flex>
  );
};

export default AdminSongsPage;
