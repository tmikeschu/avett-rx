import React from "react";
import { Box, Button, ChakraComponent, Input, Text } from "@chakra-ui/react";

import { Dialog } from "components/dialog";
import { useAuth } from "lib/auth";

const FormBox = Box as ChakraComponent<"form">;

const FORM_ID = "login-form";
export const LoginButton: React.FC = () => {
  const { login } = useAuth();
  const [showForm, setShowForm] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [validForm, setValidForm] = React.useState(false);
  const ref = React.useRef<HTMLFormElement>(null);

  const canSubmit = email && validForm;

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
            disabled={!canSubmit}
            color="success"
          >
            Get login link
          </Button>
        }
      ></Dialog>
      <FormBox
        ref={ref}
        as="form"
        id={FORM_ID}
        className="w-full"
        onChange={() => setValidForm(ref.current?.checkValidity() || false)}
        onSubmit={(e) => {
          e.preventDefault();
          login(email);
        }}
      >
        <Input
          type="email"
          placeholder="coolperson@coolorg.org"
          value={email}
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        >
          Email
        </Input>
      </FormBox>
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
