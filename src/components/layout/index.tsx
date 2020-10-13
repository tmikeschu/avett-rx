import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/dist/client/router";

import LoginButton from "features/login/login-button";
import LogoutButton from "features/logout/logout-button";

const Layout: React.FC = ({ children }) => {
  const { asPath } = useRouter();
  const { isAuthenticated } = useAuth0();
  const openView = ["/"].some((pattern) => new RegExp(pattern).test(asPath));

  return openView || isAuthenticated ? (
    <div>
      <nav>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</nav>
      <main>{children}</main>
    </div>
  ) : (
    <LoginButton />
  );
};

export default Layout;
