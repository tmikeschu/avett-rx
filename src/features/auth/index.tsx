import React from "react";

import Button from "components/button";
import { Dialog } from "components/dialog";
import { useAuth } from "lib/auth";

export const LoginButton: React.FC = () => {
  const { login } = useAuth();
  const [showForm, setShowForm] = React.useState(false);
  const [email, setEmail] = React.useState("");

  return (
    <>
      <Button variant="link" onClick={() => setShowForm(true)} size="sm">
        Log In
      </Button>

      <Dialog
        isOpen={showForm}
        aria-label="login dialog"
        onDismiss={() => setShowForm(false)}
      >
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            login(email).then(() => {
              setShowForm(false);
            });
          }}
        >
          <input
            className="border-primary border-solid border px-4 py-2 rounded mb-4 w-full max-w-sm"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
          <label></label>
          <Button type="submit" disabled={!email}>
            Get login link
          </Button>
        </form>
      </Dialog>
    </>
  );
};

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  return (
    <Button variant="link" onClick={() => logout()} size="sm">
      Log Out
    </Button>
  );
};
