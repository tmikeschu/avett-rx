import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

import Button from "components/button";
import Hamburger from "components/hamburger";
import Text from "components/text";
import { LoginButton, LogoutButton } from "features/auth";
import { joinClassNames } from "lib/utils";

export const VISITOR_VIEWS = ["/"] as const;

const Layout: React.FC = ({ children }) => {
  const { asPath } = useRouter();
  const { isAuthenticated } = useAuth0();
  const openView = VISITOR_VIEWS.some((pattern) =>
    new RegExp(pattern).test(asPath)
  );
  const [showMenu, setShowMenu] = React.useState(false);

  return openView || isAuthenticated ? (
    <div className="max-w-full w-full overflow-x-hidden">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav className="p-4 flex items-center justify-between">
        <div>
          <Text variant="h1">Avett Rx</Text>
        </div>

        <Button
          className="lg:hidden z-10"
          style={{ border: "none" }}
          aria-label="menu"
          onClick={() => setShowMenu(true)}
          variant="outline"
        >
          <Hamburger />
        </Button>

        <section className="hidden lg:block">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </section>

        <section
          data-testid="menu"
          className={joinClassNames([
            "top-0 left-0 justify-end flex lg:hidden absolute z-20 h-screen w-screen",
            "transition-transform ease-in duration-300 transform",
            showMenu ? "translate-x-0 visible" : "translate-x-full invisible",
          ])}
        >
          <div
            className={`w-full h-full z-0 transition-opacity bg-primary duration-300 ease ${
              showMenu ? "opacity-75" : "opacity-0"
            }`}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowMenu(false);
              }
            }}
          />
          <div
            className={`p-4 absolute top-0 z-10 right-0 h-full w-64 bg-light`}
          >
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </section>
      </nav>
      <main>{children}</main>
    </div>
  ) : (
    <LoginButton />
  );
};

export default Layout;
