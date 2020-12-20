import * as React from "react";

import * as utils from "test";

import EmptyVoid from "../empty-void";
import Heartbroken from "../heartbroken";

describe("Drawings", () => {
  [Heartbroken, EmptyVoid].forEach((C) => {
    it(`${C.name} matches snapshot`, () => {
      const { asFragment } = utils.render(<C />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
