import { graphql } from "msw";

import { GetTagsQuery, GetTagsQueryVariables, newGetTagsData } from "api";

export const handlers = [
  graphql.query<GetTagsQuery, GetTagsQueryVariables>(
    "GetTags",
    (_req, res, ctx) => {
      return res(
        ctx.data(
          newGetTagsData({
            allTags: {
              data: [{ name: "😭" }, null],
            },
          })
        )
      );
    }
  ),
];
