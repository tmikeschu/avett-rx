import React from "react";

import Button from "components/button";
import { Dialog } from "components/dialog";
import Text from "components/text";
import TextField from "components/text-field";
import { useAuth } from "lib/auth";

const FORM_ID = "login-form";
export const LoginButton: React.FC = () => {
  const { login } = useAuth();
  const [showForm, setShowForm] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const ref = React.useRef<HTMLFormElement>(null);

  return (
    <>
      <Button variant="link" onClick={() => setShowForm(true)} size="sm">
        Log In
      </Button>

      <Dialog
        isOpen={showForm}
        aria-label="login dialog"
        onDismiss={() => setShowForm(false)}
        titleSlot={<Text variant="h2">Login</Text>}
        actionsSlot={
          <Button
            form={FORM_ID}
            type="submit"
            disabled={!isValid}
            color="success"
          >
            Get login link
          </Button>
        }
      >
        <form
          ref={ref}
          id={FORM_ID}
          className="w-full"
          onChange={() => setIsValid(ref.current?.checkValidity() || false)}
          onSubmit={(e) => {
            e.preventDefault();
            login(email);
          }}
        >
          <TextField
            type="email"
            placeholder="coolperson@coolorg.org"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          >
            Email
          </TextField>
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
