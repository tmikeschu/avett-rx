import * as React from "react";

import * as utils from "test";

import Layout, { VISITOR_VIEWS } from "..";

let mockIsLoggedIn = false;

jest.mock("@auth0/auth0-react", () => {
  return {
    useAuth0: () => ({
      isAuthenticated: mockIsLoggedIn,
      loginWithRedirect: () => (mockIsLoggedIn = true),
      logout: () => (mockIsLoggedIn = false),
      user: mockIsLoggedIn ? {} : undefined,
    }),
  };
});

describe("<Layout />", () => {
  it("shows log in to unauthed users", () => {
    mockIsLoggedIn = false;
    const { getByRole, queryByRole } = utils.render(<Layout />);
    const login = getByRole("button", { name: /log in/i });
    const logout = queryByRole("button", { name: /log out/i });
    expect(login).toBeInTheDocument();
    expect(logout).toBeNull();
  });

  it("shows log out to authed users", () => {
    mockIsLoggedIn = true;
    const { getByTestId } = utils.render(<Layout />);
    const menu = getByTestId("desktop-menu");
    const login = utils.queryByRole(menu, "button", { name: /log in/i });
    const logout = utils.getByRole(menu, "button", { name: /log out/i });
    expect(logout).toBeInTheDocument();
    expect(login).toBeNull();
  });

  describe("visitor views", () => {
    VISITOR_VIEWS.forEach((view) => {
      it(`shows the content to an unauthed user for the "${view}" view`, () => {
        mockIsLoggedIn = false;
        const { getByText } = utils.render(<Layout>content</Layout>, {
          router: {
            asPath: view,
          },
        });
        const text = getByText(/content/i);
        expect(text).toBeInTheDocument();
      });
    });
  });

  it("hides content for non root views", () => {
    mockIsLoggedIn = false;
    const { queryByTestId } = utils.render(<Layout>content</Layout>, {
      router: {
        asPath: "/something-else",
      },
    });
    const text = queryByTestId(/content/i);
    expect(text).toBeNull();
  });

  it("has stateful login/logout buttons", () => {
    mockIsLoggedIn = false;
    const { getByTestId, rerender } = utils.render(<Layout />, {
      router: {
        asPath: VISITOR_VIEWS[0],
      },
    });
    const menu = getByTestId("desktop-menu");
    const login = utils.getByRole(menu, "button", { name: /log in/i });
    utils.user.click(login);
    expect(mockIsLoggedIn).toBe(true);

    rerender(<Layout />);
    const logout = utils.getByRole(menu, "button", { name: /log out/i });
    utils.user.click(logout);
    expect(mockIsLoggedIn).toBe(false);
  });

  it("handles route changes", async () => {
    const onMock = jest.fn((event, fn) => fn());
    const offMock = jest.fn();
    const { unmount } = utils.render(<Layout />, {
      router: {
        asPath: "/",
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
