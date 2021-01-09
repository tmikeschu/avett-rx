import * as React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Theme/TextStyles",
} as Meta;

const TextTemplate: Story<TextProps> = (args) => <Text {...args} />;

export const ErrorText = TextTemplate.bind({});
ErrorText.args = {
  textStyle: "error",
  children: "This is bad",
};

export const WarningText = TextTemplate.bind({});
WarningText.args = {
  textStyle: "warning",
  children: "This _could_ be bad",
};
