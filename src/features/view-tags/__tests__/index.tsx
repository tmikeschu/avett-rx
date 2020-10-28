import * as React from "react";
import { graphql } from "msw";

import { GetTagsQuery, GetTagsQueryVariables, newTag, Tag } from "api";
import { server } from "mocks/server";
import * as utils from "test";

import ViewTags from "..";

describe("<ViewTags />", () => {
  const useMock = (data: (Tag | null)[]) => {
    server.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(ctx.data({ allTags: { data } }));
        }
      )
    );
  };

  it("shows an empty state", async () => {
    useMock([]);
    const { queryByTestId, getByText } = utils.render(<ViewTags />);
    await utils.waitFor(() => expect(queryByTestId("loading")).toBeNull());
    expect(getByText(/no tags/i)).toBeInTheDocument();
  });

  it("renders the tags", async () => {
    useMock([newTag({ name: "testing tag" }), null]);
    const { findByText } = utils.render(<ViewTags />);

    expect(await findByText(/testing tag/)).toBeInTheDocument();
  });
});
