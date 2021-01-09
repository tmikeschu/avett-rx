import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

import EV from "./empty-void";
import HB from "./heartbroken";

export default {
  title: "Components/Art",
  decorators: [
    (Story) => (
      <Box maxW="lg">
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Heartbroken: Story = () => <HB />;
export const EmptyVoid: Story = () => <EV />;
