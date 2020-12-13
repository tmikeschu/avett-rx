import { graphql } from "msw";

import {
  GetTagsQuery,
  GetTagsQueryVariables,
  newAlbum,
  newGetTagsData,
  newSong,
  newSongsForTagData,
  newTag,
  SongsForTagQuery,
  SongsForTagQueryVariables,
} from "api";

const tags = ["test tag", "test tag 2", null].map((name) =>
  name ? newTag({ name }) : null
);

const songs = [
  {
    title: "Sanguine",
    lyrics: "Make me sanguine\nHelp me genuinely",
    album: newAlbum({ title: "The Gleam" }),
  },
  null,
].map((s) => (s ? newSong(s) : s));

if (tags[0]?.songs && songs[0]) {
  tags[0].songs.data = [songs[0]];
}

export const handlers = [
  graphql.query<GetTagsQuery, GetTagsQueryVariables>(
    "GetTags",
    (_req, res, ctx) => {
      return res(
        ctx.data(
          newGetTagsData({
            allTags: {
              data: tags,
            },
          })
        )
      );
    }
  ),
  graphql.query<SongsForTagQuery, SongsForTagQueryVariables>(
    "SongsForTag",
    (req, res, ctx) => {
      const { tagID } = req.variables;
      const tag = tags.find((t) => t?._id === tagID);
      return res(
        ctx.data(
          newSongsForTagData({
            songsForTag: {
              data: tag?.songs.data || [],
            },
          })
        )
      );
    }
  ),
];
