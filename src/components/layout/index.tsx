import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/dist/client/router";

import { LoginButton, LogoutButton } from "features/auth";

const VISITOR_VIEWS = ["/"] as const;

const Layout: React.FC = ({ children }) => {
  const { asPath } = useRouter();
  const { isAuthenticated } = useAuth0();
  const openView = VISITOR_VIEWS.some((pattern) =>
    new RegExp(pattern).test(asPath)
  );

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
