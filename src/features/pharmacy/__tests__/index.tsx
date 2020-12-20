import * as React from "react";

import { tags } from "mocks/data";
import * as utils from "test";

import Pharmacy from "..";

const { user } = utils;

describe("<Pharmacy />", () => {
  it("allows a user to view songs based on a tag", async () => {
    const {
      queryByText,
      getByRole,
      findByRole,
      findByText,
      getByText,
    } = utils.render(<Pharmacy />);

    const spinner = utils.screen.getByText(/loading.../i);
    expect(spinner).toBeInTheDocument();
    expect(await findByText(/select.*feeling/i));
    expect(spinner).not.toBeInTheDocument();
    expect(getByRole("heading", { name: /pharmacy/i })).toBeInTheDocument();

    expect(queryByText(/sanguine/i)).toBeNull();
    const btn = getByText(tags[0].name);
    user.click(btn);
    expect(
      await utils.screen.findByLabelText(/loading.../i)
    ).toBeInTheDocument();
    expect(
      await findByRole("heading", { name: /sanguine/i })
    ).toBeInTheDocument();
    expect(utils.screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    expect(getByText(/make me sanguine/i)).toBeInTheDocument();
    expect(getByText(/from: the gleam/i)).toBeInTheDocument();
  });
});
