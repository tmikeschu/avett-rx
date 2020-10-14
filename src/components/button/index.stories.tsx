import * as React from "react";
import { Meta, Story } from "@storybook/react";

import Button, { Props } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: { onClick: { action: "clicked" } },
} as Meta;

type Args = Props;

const Template: Story<Args> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Primary",
} as Args;
