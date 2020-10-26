import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { Color, COLORS } from "lib/constants";

import LoadingCircle, { Props } from ".";

export default {
  title: "Icons/LoadingCircle",
  component: LoadingCircle,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: COLORS,
      },
    },
    size: {
      control: {
        type: "inline-radio",
        options: ["sm", "md", "lg"] as Props["size"][],
      },
    },
  },
} as Meta;

type Args = Props & {
  color?: Color;
};

const Template: Story<Args> = ({ color, ...args }) => (
  <LoadingCircle className={`text-${color}`} {...args} />
);

export const Demo = Template.bind({});
Demo.args = { color: "primary", size: "md" };
