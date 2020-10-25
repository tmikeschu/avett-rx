import * as React from "react";
import { Meta, Story } from "@storybook/react";

import Hamburger from "components/icons/hamburger";

import Button, { BUTTON_COLORS, Props, SIZES, VARIANTS } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
    color: {
      control: {
        type: "select",
        options: BUTTON_COLORS,
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
    {BUTTON_COLORS.map((c) => (
      <div key={c} className="mb-4 items-end flex flex-wrap">
        <h2 className="text-xl mr-4 mb-4 w-24">{capitalize(c)}</h2>
        {VARIANTS.map((v) =>
          SIZES.map((s) => (
            <Button
              size={s}
              color={c}
              key={`${c}:${v}:${s}`}
              className="mr-4 mb-4"
              variant={v}
            >
              {v === "icon" ? (
                <Hamburger className="w-full h-full" />
              ) : (
                `${capitalize(v)}: ${s}`
              )}
            </Button>
          ))
        )}
      </div>
    ))}
  </div>
);
Suite.args = {};
