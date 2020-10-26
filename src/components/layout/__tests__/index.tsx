import * as React from "react";

import { VISITOR_VIEWS } from "lib/routes";
import * as utils from "test";

import Layout from "..";

describe("<Layout />", () => {
  it("shows log in to unauthed users", () => {
    const { queryByRole, getByTestId } = utils.render(<Layout />, {
      router: { pathname: "/" },
    });
    const menu = getByTestId("desktop-menu");
    const login = utils.getByRole(menu, "button", { name: /log in/i });
    const logout = queryByRole("button", { name: /log out/i });
    expect(login).toBeInTheDocument();
    expect(logout).toBeNull();
  });

  it("shows log out to authed users", () => {
    const { getByTestId } = utils.render(<Layout />, { auth: { user: {} } });
    const menu = getByTestId("desktop-menu");
    const login = utils.queryByRole(menu, "button", { name: /log in/i });
    const logout = utils.getByRole(menu, "button", { name: /log out/i });
    expect(logout).toBeInTheDocument();
    expect(login).toBeNull();
  });

  describe("visitor views", () => {
    Object.keys(VISITOR_VIEWS).forEach((view) => {
      it(`shows the content to an unauthed user for the "${view}" view`, () => {
        const { getByText } = utils.render(<Layout>content</Layout>, {
          router: {
            pathname: view,
          },
        });
        const text = getByText(/content/i);
        expect(text).toBeInTheDocument();
      });
    });
  });

  it("hides content for non root views", () => {
    const { queryByTestId } = utils.render(<Layout>content</Layout>, {
      router: {
        pathname: "/something-else",
      },
    });
    const text = queryByTestId(/content/i);
    expect(text).toBeNull();
  });

  it("has stateful login/logout buttons", async () => {
    const { getByTestId, getByLabelText, getByRole } = utils.render(
      <Layout />,
      {
        router: {
          pathname: VISITOR_VIEWS[0],
        },
      }
    );
    const menu = getByTestId("desktop-menu");
    const login = utils.getByRole(menu, "button", { name: /log in/i });
    utils.user.click(login);
    const input = getByLabelText(/email/i);
    utils.user.type(input, "blah@blah.blag");
    utils.user.click(getByRole("button", { name: /login link/i }));

    const logout = await utils.waitFor(() =>
      utils.getByRole(menu, "button", { name: /log out/i })
    );
    utils.user.click(logout);
  });

  it("handles route changes", async () => {
    const onMock = jest.fn((_event, fn) => fn());
    const offMock = jest.fn();
    const { unmount } = utils.render(<Layout />, {
      router: {
        pathname: "/",
        events: {
          on: onMock,
          off: offMock,
          emit: jest.fn(),
        },
      },
    });
    expect(onMock).toHaveBeenCalledTimes(1);
    expect(onMock).toHaveBeenCalledWith(
      "routeChangeComplete",
      expect.any(Function)
    );

    unmount();
    expect(offMock).toHaveBeenCalledTimes(1);
    expect(offMock).toHaveBeenCalledWith(
      "routeChangeComplete",
      expect.any(Function)
    );
  });
});
