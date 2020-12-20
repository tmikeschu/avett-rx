import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

import { newAlbum, newSong } from "api";
import { tags } from "mocks/data";

import AdminSongs, { SongRow, SongRowProps } from ".";

export default {
  title: "Features/Admin/Songs",
  decorators: [
    (Story) => (
      <Box maxW="lg">
        <Story />
      </Box>
    ),
  ],
} as Meta;

const Template: Story = () => <AdminSongs />;

export const Demo = Template.bind({});

const SongTemplate: Story<SongRowProps> = (args) => <SongRow {...args} />;

export const SongWithoutTags = SongTemplate.bind({});
SongWithoutTags.args = {
  song: newSong({
    title: "Kickdrum Heart",
    album: newAlbum({
      title: "I and Love and You",
    }),
    tags: {
      data: [],
    },
  }),
};

export const SongWithTag = SongTemplate.bind({});
SongWithTag.args = {
  song: newSong({
    title: "Kickdrum Heart",
    album: newAlbum({
      title: "I and Love and You",
    }),
    tags: {
      data: tags.slice(0, 1),
    },
  }),
};

export const SongWithTags = SongTemplate.bind({});
SongWithTags.args = {
  song: newSong({
    title: "Kickdrum Heart",
    album: newAlbum({
      title: "I and Love and You",
    }),
    tags: {
      data: tags.slice(0, 3),
    },
  }),
};
