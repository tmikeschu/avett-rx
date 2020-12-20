import React from "react";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { useAuthContext, useAuthDispatch } from "lib/auth";

const FORM_ID = "login-form";
export const LoginButton: React.FC = () => {
  const { status } = useAuthContext();
  const { login } = useAuthDispatch();
  const [showForm, setShowForm] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [validForm, setValidForm] = React.useState(false);
  const ref = React.useRef<HTMLFormElement>(null);

  const canSubmit = email && validForm;

  return (
    <>
      <Button
        variant="link"
        onClick={() => setShowForm(true)}
        size="sm"
        colorScheme="purple"
      >
        Log In
      </Button>

      <Modal
        isOpen={showForm}
        aria-label="login dialog"
        onClose={() => setShowForm(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h2">Login</Heading>
          </ModalHeader>

          <ModalBody>
            <form
              ref={ref}
              id={FORM_ID}
              className="w-full"
              onChange={() =>
                setValidForm(ref.current?.checkValidity() || false)
              }
              onSubmit={(e) => {
                e.preventDefault();
                login(email);
              }}
            >
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>

                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon />
                  </InputLeftElement>
                  <Input
                    isInvalid={!validForm && Boolean(email)}
                    type="email"
                    placeholder="coolperson@coolorg.org"
                    value={email}
                    onChange={(e) => {
                      e.preventDefault();
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>

                <FormHelperText>
                  We&apos;ll never share your email.
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={status !== "ready"}
              form={FORM_ID}
              type="submit"
              disabled={!canSubmit}
              colorScheme="green"
            >
              Get login link
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const LogoutButton: React.FC = () => {
  const { logout } = useAuthDispatch();
  return (
    <Button variant="link" onClick={() => logout()} size="sm">
      Log Out
    </Button>
  );
};
