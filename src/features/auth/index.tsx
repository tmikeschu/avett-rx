import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "components/button";

export const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="link" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="link"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
};
