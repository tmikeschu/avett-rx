import * as React from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Role, User } from "api";
import { useAuthContext } from "lib/auth";
import { Route } from "lib/routes";

import { AdminMetaData } from "./meta-data";

const isAdmin = (u: User): boolean => u.roles.includes(Role.Admin);

type Status = "checking" | "notallowed" | "permitted";
const AdminLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [status, setStatus] = React.useState<Status>("checking");
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
    <Box h="100vh" w="100vw">
      <Flex
        direction="column"
        maxWidth="2xl"
        mx="auto"
        align="flex-start"
        h="full"
      >
        {status === "permitted" ? (
          <>
            <AdminMetaData />
            {children}
          </>
        ) : (
          <Flex
            direction="column"
            align="center"
            justify="center"
            h="full"
            w="full"
          >
            <Spinner color="purple.500" />
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default AdminLayout;
