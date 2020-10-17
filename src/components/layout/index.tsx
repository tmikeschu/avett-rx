import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/dist/client/router";

import Text from "components/text";
import { LoginButton, LogoutButton } from "features/auth";

export const VISITOR_VIEWS = ["/"] as const;

const Layout: React.FC = ({ children }) => {
  const { asPath } = useRouter();
  const { isAuthenticated } = useAuth0();
  const openView = VISITOR_VIEWS.some((pattern) =>
    new RegExp(pattern).test(asPath)
  );

  return openView || isAuthenticated ? (
    <div>
      <nav className="p-4 flex items-center justify-between">
        <div>
          <Text variant="h1">Avett Rx</Text>
        </div>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </nav>
      <main>{children}</main>
    </div>
  ) : (
    <LoginButton />
  );
};

export default Layout;
