import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { Color, COLORS } from "lib/constants";

import Hamburger, { Props } from ".";

export default {
  title: "Icons/Hamburger",
  component: Hamburger,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: COLORS,
      },
    },
  },
} as Meta;

type Args = Props & {
  color?: Color;
};

const Template: Story<Args> = ({ color, ...args }) => (
  <Hamburger className={`text-${color}`} {...args} />
);

export const Demo = Template.bind({});
Demo.args = { color: "primary" } as Args;
