import * as React from "react";

import * as utils from "test";

import Pharmacy from "..";

const { user } = utils;

describe("<Pharmacy />", () => {
  it("allows a user to view songs based on a tag", async () => {
    const { queryByText, getByRole, findByText, getByText } = utils.render(
      <Pharmacy />
    );

    expect(await findByText(/select.*feeling/i));
    expect(getByRole("heading", { name: /pharmacy/i })).toBeInTheDocument();

    expect(queryByText(/sanguine/)).toBeNull();
    const btn = getByText("😭");
    user.click(btn);
    expect(await findByText(/sanguine/)).toBeInTheDocument();
    expect(getByText(/make me sanguine/i)).toBeInTheDocument();
    expect(getByText(/from: the gleam/i)).toBeInTheDocument();
  });

  it("has an empty state", async () => {
    const { findByText, getByText } = utils.render(<Pharmacy />);

    await findByText(/select.*feeling/i);

    const btn = getByText("🥰");
    user.click(btn);
    await utils.waitFor(() =>
      expect(getByText(/haven't.*tagged/)).toBeInTheDocument()
    );
  });
});
