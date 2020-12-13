import * as React from "react";

import * as utils from "test";

import Pharmacy from "..";

const { user } = utils;

describe("<Pharmacy />", () => {
  it("allows a user to view songs based on a tag", async () => {
    const {
      queryByText,
      getByRole,
      findByRole,
      findByTestId,
      findByText,
      getByText,
      getByTestId,
      queryByTestId,
    } = utils.render(<Pharmacy />);

    const spinner = getByTestId("loading");
    expect(spinner).toBeInTheDocument();
    expect(await findByText(/select.*feeling/i));
    expect(spinner).not.toBeInTheDocument();
    expect(getByRole("heading", { name: /pharmacy/i })).toBeInTheDocument();

    expect(queryByText(/sanguine/i)).toBeNull();
    const btn = getByText(/test tag$/);
    user.click(btn);
    expect(await findByTestId("loading")).toBeInTheDocument();
    expect(
      await findByRole("heading", { name: /sanguine/i })
    ).toBeInTheDocument();
    expect(queryByTestId("loading")).toBeNull();
    expect(getByText(/make me sanguine/i)).toBeInTheDocument();
    expect(getByText(/from: the gleam/i)).toBeInTheDocument();
  });
});
