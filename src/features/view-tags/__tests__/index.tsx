import * as React from "react";
import { graphql } from "msw";

import { GetTagsQuery, GetTagsQueryVariables, newGetTagsData } from "api";
import { tags } from "mocks/data";
import { server } from "mocks/server";
import * as utils from "test";

import ViewTags from "..";

describe("<ViewTags />", () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it("shows a loading spinner while fetching data", async () => {
    const { container } = utils.render(<ViewTags />);
    expect(utils.screen.getByText(/loading.../i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("shows an empty state", async () => {
    server.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(ctx.data(newGetTagsData({ allTags: { data: [] } })));
        }
      )
    );
    const { findByText, container } = utils.render(<ViewTags />);
    expect(utils.screen.getByText(/loading.../i)).toBeInTheDocument();
    expect(await findByText(/don't have any tags/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(utils.screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  it("shows an error state", async () => {
    jest.spyOn(console, "error").mockImplementation();
    server.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(ctx.errors([{ message: "unable to fetch" }]));
        }
      )
    );
    const { findByText, container } = utils.render(<ViewTags />);
    expect(utils.screen.getByText(/loading.../i)).toBeInTheDocument();
    expect(await findByText(/oh no!/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(utils.screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    jest.restoreAllMocks();
  });

  it("shows data after loading", async () => {
    const { getByRole, findByText } = utils.render(<ViewTags />);
    expect(utils.screen.getByText(/loading.../i)).toBeInTheDocument();

    expect(await findByText(tags[0].name)).toBeInTheDocument();
    expect(getByRole("list", { name: /tags list/i })).toMatchSnapshot();
    expect(utils.screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });
});
