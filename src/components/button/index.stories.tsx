import * as React from "react";
import { Meta, Story } from "@storybook/react";

import Button, { Props, VARIANTS } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: {
        type: "select",
        options: VARIANTS,
      },
    },
  },
} as Meta;

type Args = Props;

const Template: Story<Args> = (args) => <Button {...args} />;

export const Demo = Template.bind({});
Demo.args = {
  variant: "primary",
  children: "Submit",
  disabled: false,
} as Args;
