import * as React from "react";
import { Meta, Story } from "@storybook/react";

import Button from "components/button";
import Text from "components/text";
import TextField from "components/text-field";

import { Dialog, DialogProps } from ".";

export default {
  title: "Components/Dialog",
  component: Dialog,
} as Meta;

const Template: Story<DialogProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Dialog
        titleSlot={<Text variant="h2">Login</Text>}
        actionsSlot={
          <>
            <Button
              variant="outline"
              color="cancel"
              className="mr-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="solid" color="success">
              Submit
            </Button>
          </>
        }
        {...args}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
      >
        {args.children || (
          <TextField type="email" placeholder="user@place.com">
            Email
          </TextField>
        )}
      </Dialog>
    </>
  );
};

export const Demo = Template.bind({});
Demo.args = {
  "aria-label": "dialog story",
};

export const NoActions = Template.bind({});
NoActions.args = {
  "aria-label": "dialog story",
  actionsSlot: undefined,
  children: <div>content</div>,
};
