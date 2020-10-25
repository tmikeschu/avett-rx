import * as React from "react";
import Router, { useRouter } from "next/dist/client/router";
import Head from "next/head";

import Button from "components/button";
import Hamburger from "components/icons/hamburger";
import Link from "components/link";
import Text from "components/text";
import { LoginButton, LogoutButton } from "features/auth";
import { useAuth } from "lib/auth";
import { joinClassNames } from "lib/utils";

export const VISITOR_VIEWS = ["/"] as const;

const LINKS = [["/pharmacy", "Pharmacy"]];

const Layout: React.FC = ({ children }) => {
  const { pathname, events, query, back } = useRouter();
  const { status, user } = useAuth();
  const isLoading = status === "loading";
  React.useEffect(() => {
    const handle = () => {
      setShowMenu(false);
    };
    events.on("routeChangeComplete", handle);

    return () => {
      events.off("routeChangeComplete", handle);
    };
  }, [events]);
  const openView = VISITOR_VIEWS.some((path) => path === pathname);
  const [showMenu, setShowMenu] = React.useState(false);

  React.useEffect(() => {
    if (query.code && query.state) {
      Router.push("/").then(() => {
        window.location.reload();
      });
    }
  }, [query.code, query.state, pathname]);

  return (
    <div className="w-screen min-h-screen bg-primary bg-opacity-25">
      <div className="max-w-screen-md min-h-screen mx-auto w-full overflow-x-hidden bg-light">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>

        <nav className="p-4 flex items-center justify-between relative">
          <div>
            <Link href="/">
              <Text variant="h1">Avett Rx</Text>
            </Link>
          </div>

          <section
            data-testid="desktop-menu"
            className="hidden lg:flex items-center flex-1 justify-between ml-8"
          >
            <div>
              {LINKS.map((link) => (
                <Link
                  key={link[0]}
                  href={link[0]}
                  className={joinClassNames([
                    "text-primary border-primary border-b border-solid inline pb-1 mr-4 last:mr-0",
                    pathname === link[0] ? "font-bold" : "",
                  ])}
                >
                  {link[1]}
                </Link>
              ))}
            </div>
            {user ? <LogoutButton /> : <LoginButton />}
          </section>

          <Button
            className="lg:hidden z-10"
            style={{ border: "none" }}
            aria-label="menu"
            onClick={() => setShowMenu(true)}
            variant="icon"
          >
            <Hamburger />
          </Button>

          <section
            data-testid="mobile-menu"
            className={joinClassNames([
              "top-0 left-0 justify-end flex lg:hidden absolute z-20 h-screen w-screen",
              "transition-transform ease-in duration-300 transform",
              showMenu ? "translate-x-0 visible" : "translate-x-full invisible",
            ])}
          >
            <div
              aria-label="close-menu"
              role="button"
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
              className={`flex flex-col p-4 absolute top-0 z-10 right-0 h-full w-64 bg-light justify-between`}
            >
              <div className="flex flex-col">
                {LINKS.map((link) => (
                  <Link
                    key={link[0]}
                    href={link[0]}
                    className="text-primary border-primary border-b border-solid inline pb-2"
                  >
                    {link[1]}
                  </Link>
                ))}
              </div>
              <div>{user ? <LogoutButton /> : <LoginButton />}</div>
            </div>
          </section>
        </nav>
        {openView || (!isLoading && user) ? (
          children
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <Text color="error">
              Whoops! You have to be logged in to see that page.
            </Text>
            <Button
              size="sm"
              variant="link"
              color="cancel"
              className="mt-4"
              onClick={() => back()}
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
