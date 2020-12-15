import * as React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Role, User } from "api";
import { LoginButton, LogoutButton } from "features/auth";
import { useAuthContext } from "lib/auth";
import { Route } from "lib/routes";

const isAdmin = (u: User): boolean => u.roles.includes(Role.Admin);

const AdminHome: NextPage = () => {
  const { push } = useRouter();
  const { user } = useAuthContext();
  React.useEffect(() => {
    if (user && !isAdmin(user)) {
      push(Route.Root);
    }
  }, [user, push]);
  return user ? <LogoutButton /> : <LoginButton />;
};

export default AdminHome;
