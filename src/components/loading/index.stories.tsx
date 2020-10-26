import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { COLORS } from "lib/constants";

import Loading, { Props } from ".";

export default {
  title: "Components/Loading",
  component: Loading,
  argTypes: {
    color: {
      control: {
        type: "radio",
        options: COLORS,
      },
    },
    type: {
      control: {
        type: "inline-radio",
        options: ["text", "spin"] as Props["type"][],
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

const Template: Story<Props> = (args) => <Loading {...args} />;

export const Demo = Template.bind({});
Demo.args = {
  color: "primary",
  type: "text",
  size: "md",
};
