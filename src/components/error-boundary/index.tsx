import * as React from "react";
import {
  ErrorBoundary as EB,
  ErrorBoundaryProps,
  FallbackProps,
} from "react-error-boundary";
import { Button, Code, Flex, Text } from "@chakra-ui/react";

export type { ErrorBoundaryProps, FallbackProps };

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Flex role="alert" direction="column" boxShadow="md" py={3} px={4}>
      <Flex>
        <Text textStyle="error" mb={4} flex={1} mr={4}>
          Something went wrong!
        </Text>
      </Flex>

      <Code mb="4" layerStyle="block" colorScheme="yellow">
        {error.message}
      </Code>

      <Flex justifyContent="flex-end">
        <Button
          colorScheme="red"
          onClick={resetErrorBoundary}
          variant="outline"
        >
          Try again
        </Button>
      </Flex>
    </Flex>
  );
};

export const ErrorBoundary: React.FC<Partial<ErrorBoundaryProps>> = ({
  children,
  ...props
}) => {
  return (
    <EB
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
      {...props}
    >
      {children}
    </EB>
  );
};
