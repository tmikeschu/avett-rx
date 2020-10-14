import * as React from "react";
import { Meta, Story } from "@storybook/react";

import Button, { COLORS, Props, SIZES, VARIANTS } from ".";

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
  size: "md",
} as Args;

export const Suite: Story = () => (
  <div>
    {COLORS.map((c) => (
      <div key={c} className="mb-4">
        <h2 className="text-xl mr-4">{capitalize(c)}</h2>
        {VARIANTS.map((v) => (
          <div key={v} className="flex items-end mb-4">
            {SIZES.map((s) => (
              <Button
                size={s}
                color={c}
                key={`${c}:${v}:${s}`}
                className="mr-4"
                variant={v}
              >
                {capitalize(v)}: {s}
              </Button>
            ))}
          </div>
        ))}
      </div>
    ))}
  </div>
);
Suite.args = {};
