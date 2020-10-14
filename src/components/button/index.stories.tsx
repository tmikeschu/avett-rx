import * as React from "react";
import { Meta, Story } from "@storybook/react";

import Button, { COLORS, Props, VARIANTS } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
    color: {
      control: {
        type: "select",
        options: COLORS,
      },
    },
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

const capitalize = (s: string): string =>
  `${s[0].toUpperCase()}${s.slice(1).toLowerCase()}`;

export const Demo = Template.bind({});
Demo.args = {
  color: "primary",
  variant: "solid",
  children: "Submit",
  disabled: false,
} as Args;

export const Suite: Story = () => (
  <div>
    {COLORS.map((c) => (
      <div key={c}>
        <h2>{capitalize(c)}</h2>
        {VARIANTS.map((v) => (
          <Button color={c} key={`${c}:${v}`} className="mr-4 mb-4" variant={v}>
            {capitalize(v)}
          </Button>
        ))}
      </div>
    ))}
  </div>
);
Suite.args = {};
