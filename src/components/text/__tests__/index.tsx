import * as React from "react";

import { COLORS } from "lib/constants";
import * as utils from "test";

import Text, { VARIANTS } from "../";

describe("<Text />", () => {
  it("matches snapshot", () => {
    const { getByText } = utils.render(<Text>Snapshot</Text>);
    const p = getByText(/snapshot/i);
    expect(p).toMatchInlineSnapshot(`
      <p
        class="text-dark leading-normal font-body"
      >
        Snapshot
      </p>
    `);
  });

  it("can be rendered as a different component", () => {
    const { getByText } = utils.render(
      <Text variant="h1" as="span">
        Snapshot
      </Text>
    );
    const span = getByText(/snapshot/i);
    expect(span).toMatchInlineSnapshot(`
      <span
        class="text-dark text-4xl tracking-tighter font-display leading-tight"
      >
        Snapshot
      </span>
    `);
  });

  describe("variants and colors", () => {
    VARIANTS.forEach((variant) => {
      COLORS.forEach((color) => {
        it(`variant: ${variant}, color: ${color} matches snapshot`, () => {
          const { getByText } = utils.render(
            <Text variant={variant} color={color}>
              snapshot
            </Text>
          );
          const p = getByText(/snapshot/i);
          expect(p.className).toMatchSnapshot();
        });
      });
    });
  });
});
