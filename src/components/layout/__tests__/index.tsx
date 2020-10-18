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
      user: {},
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
    const { getByRole, queryByRole } = utils.render(<Layout />);
    const login = queryByRole("button", { name: /log in/i });
    const logout = getByRole("button", { name: /log out/i });
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
    const { getByRole, rerender } = utils.render(<Layout />, {
      router: {
        asPath: VISITOR_VIEWS[0],
      },
    });
    const login = getByRole("button", { name: /log in/i });
    utils.user.click(login);
    expect(mockIsLoggedIn).toBe(true);

    rerender(<Layout />);
    const logout = getByRole("button", { name: /log out/i });
    utils.user.click(logout);
    expect(mockIsLoggedIn).toBe(false);
  });
});
