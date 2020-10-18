import * as React from "react";

import * as utils from "test";

import ViewTags from "../";

describe("<ViewTags />", () => {
  it("renders the tags", async () => {
    const { findByText } = utils.render(<ViewTags />);

    expect(await findByText("😭")).toBeInTheDocument();
  });
});
