import { graphql, rest } from "msw";

import { GetTagsQuery, GetTagsQueryVariables } from "../../__generated__/api";

export const handlers = [
  graphql.query<GetTagsQuery, GetTagsQueryVariables>(
    "GetTags",
    (_req, res, ctx) => {
      return res(
        ctx.data({
          __typename: "Query",
          allTags: {
            __typename: "TagPage",
            data: [{ _id: "aoeu", name: "😭", __typename: "Tag" }, null],
          },
        })
      );
    }
  ),
];
