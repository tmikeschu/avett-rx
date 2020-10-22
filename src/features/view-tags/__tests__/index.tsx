import * as React from "react";
import { graphql } from "msw";

import {
  GetTagsQuery,
  GetTagsQueryVariables,
  newGetTagsData,
  newTag,
} from "api";
import { server } from "mocks/server";
import * as utils from "test";

import ViewTags from "..";

describe("<ViewTags />", () => {
  it("renders the tags", async () => {
    server.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(
            ctx.data(
              newGetTagsData({
                allTags: {
                  data: [newTag({ name: "testing tag" }), null],
                },
              })
            )
          );
        }
      )
    );
    const { findByText } = utils.render(<ViewTags />);

    expect(await findByText(/testing tag/)).toBeInTheDocument();
  });
});
