import * as React from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Role, User } from "api";
import { LoginButton, LogoutButton } from "features/auth";
import { useAuthContext } from "lib/auth";
import { Route } from "lib/routes";

import { AdminMetaData } from "./meta-data";

const isAdmin = (u: User): boolean => u.roles.includes(Role.Admin);

type Status = "nouser" | "checking" | "notallowed" | "permitted";
const AdminLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [status, setStatus] = React.useState<Status>("nouser");

  React.useEffect(() => {
    if (user && status === "nouser") {
      setStatus("checking");
    }
  }, [user, status]);

  React.useEffect(() => {
    if (!user) return;

    if (user && !isAdmin(user)) {
      setStatus("notallowed");
      router.push(Route.Root);
      return;
    }
    setStatus("permitted");
  }, [user, router, status]);

  return (
    <Box
      h="100vh"
      w="100vw"
      bg="gray.100"
      overflowY="auto"
      pb={4}
      borderTopWidth="0.75rem"
      borderTopStyle="solid"
      borderTopColor="purple.500"
    >
      <Flex
        direction="column"
        maxWidth="2xl"
        w="full"
        mx="auto"
        align="flex-start"
        minH="full"
        bg="gray.100"
      >
        {(() => {
          switch (status) {
            case "nouser": {
              return (
                <Flex
                  align="center"
                  justify="center"
                  direction="column"
                  h="full"
                  w="full"
                >
                  <LoginButton />
                </Flex>
              );
            }
            case "permitted": {
              return (
                <>
                  <AdminMetaData />
                  {children}
                  <LogoutButton />
                </>
              );
            }
            default: {
              return (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  h="full"
                  w="full"
                >
                  <Spinner />
                </Flex>
              );
            }
          }
        })()}
      </Flex>
    </Box>
  );
};

export default AdminLayout;
