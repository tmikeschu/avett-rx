import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { COLORS } from "lib/constants";

import TextField, { Props } from ".";

export default {
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    color: {
      control: {
        type: "inline-radio",
        options: COLORS,
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => {
  const [v, setV] = React.useState("");
  return (
    <TextField {...args} value={v} onChange={(e) => setV(e.target.value)}>
      {args.type}
    </TextField>
  );
};

export const Text = Template.bind({});
Text.args = {
  color: "primary",
  type: "text",
  placeholder: "First name",
};

export const Number = Template.bind({});
Number.args = {
  color: "primary",
  type: "number",
  placeholder: "Age",
};

export const Email = Template.bind({});
Email.args = {
  color: "primary",
  type: "email",
  placeholder: "user@place.org",
};

export const Url = Template.bind({});
Url.args = {
  color: "primary",
  type: "url",
  placeholder: "Url",
};
