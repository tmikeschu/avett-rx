import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { ErrorFallback, FallbackProps } from ".";

export default {
  title: "Error Boundary",
  argTypes: {
    resetErrorBoundary: {
      action: "reset",
    },
  },
} as Meta<FallbackProps>;

const Template: Story<FallbackProps> = (args) => <ErrorFallback {...args} />;
Template.args = {
  error: new Error(
    `
import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const ui = (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <ComponentThatMayError />
  </ErrorBoundary>
)
  `.trim()
  ),
};

export const Demo = Template.bind({});
Demo.args = {
  ...Template.args,
};
