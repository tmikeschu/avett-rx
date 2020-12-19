import * as React from "react";
import { Flex } from "@chakra-ui/react";

import { LogoutButton } from "features/auth";
import { useAuthContext } from "lib/auth";

import { AppMetaData } from "./meta-data";

const AppLayout: React.FC = ({ children }) => {
  const { user } = useAuthContext();
  return (
    <Flex direction="column" maxWidth="lg" mx="auto">
      <AppMetaData />
      {children}

      {user ? <LogoutButton /> : null}
    </Flex>
  );
};

export default AppLayout;
