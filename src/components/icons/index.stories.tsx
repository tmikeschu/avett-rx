import * as React from "react";
import { Meta, Story } from "@storybook/react";

import Close from "components/icons/close";
import Hamburger from "components/icons/hamburger";
import { Color, COLORS } from "lib/constants";
import { joinClassNames, TypedKey } from "lib/utils";

export default {
  title: "Icons/All",
  argTypes: {
    color: {
      control: {
        type: "radio",
        options: COLORS,
      },
    },
  },
} as Meta;

const Template: Story<{ color: Color }> = (args) => {
  return (
    <div
      className={joinClassNames([
        TypedKey<Color>({
          dark: "text-dark",
          light: "text-light",
          cancel: "text-cancel",
          error: "text-error",
          primary: "text-primary",
          secondary: "text-secondary",
          success: "text-success",
          warning: "text-warning",
        })[args.color],
      ])}
    >
      <Hamburger />
      <Close />
    </div>
  );
};

export const Demo = Template.bind({});
Demo.args = {
  color: "dark",
};
