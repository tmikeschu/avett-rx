import { graphql } from "msw";

import {
  AdminAllSongsQuery,
  AdminAllSongsQueryVariables,
  AdminAllTagsQuery,
  AdminAllTagsQueryVariables,
  GetTagsQuery,
  GetTagsQueryVariables,
  newAdminAllSongsData,
  newAdminAllTagsData,
  newGetTagsData,
  newSongsForTagData,
  SongsForTagQuery,
  SongsForTagQueryVariables,
} from "api";

import { songs, tags } from "./data";

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
  graphql.query<AdminAllSongsQuery, AdminAllSongsQueryVariables>(
    "AdminAllSongs",
    (_req, res, ctx) => {
      return res(
        ctx.data(
          newAdminAllSongsData({
            allSongs: {
              data: songs,
            },
          })
        )
      );
    }
  ),
  graphql.query<AdminAllTagsQuery, AdminAllTagsQueryVariables>(
    "AdminAllTags",
    (_req, res, ctx) => {
      return res(
        ctx.data(
          newAdminAllTagsData({
            allTags: {
              data: tags,
            },
          })
        )
      );
    }
  ),
];
