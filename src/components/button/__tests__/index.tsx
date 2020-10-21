import * as React from "react";

import * as utils from "test";

import Button, { BUTTON_COLORS, SIZES, VARIANTS } from "../";

describe("<Button />", () => {
  it("matches snapshot", () => {
    const { getByRole, rerender } = utils.render(<Button>Snapshot</Button>);
    const button = getByRole("button");
    expect(button).toMatchInlineSnapshot(`
      <button
        class="hover:opacity-75 focus:opacity-75 focus:outline-none rounded bg-primary text-light border-primary px-4 py-2 text-base"
      >
        <span
          class="font-bold font-body uppercase"
        >
          Snapshot
        </span>
      </button>
    `);

    rerender(<Button disabled={true}>Snapshot</Button>);
    expect(button).toMatchInlineSnapshot(`
      <button
        class="cursor-not-allowed opacity-25 rounded bg-primary text-light border-primary px-4 py-2 text-base"
        disabled=""
      >
        <span
          class="font-bold font-body uppercase"
        >
          Snapshot
        </span>
      </button>
    `);

    rerender(
      <Button disabled={true}>
        <pre>Snapshot</pre>
      </Button>
    );
    expect(button).toMatchInlineSnapshot(`
      <button
        class="cursor-not-allowed opacity-25 rounded bg-primary text-light border-primary px-4 py-2 text-base"
        disabled=""
      >
        <pre>
          Snapshot
        </pre>
      </button>
    `);
  });

  describe("variants", () => {
    VARIANTS.forEach((variant) => {
      BUTTON_COLORS.forEach((color) => {
        SIZES.forEach((size) => {
          it(`Variant: ${variant}, color: ${color}, size: ${size} matches snapshot`, () => {
            const { getByRole } = utils.render(
              <Button variant={variant} color={color} size={size}>
                Snapshot
              </Button>
            );
            const button = getByRole("button");
            expect(button.className).toMatchSnapshot();
          });
        });
      });
    });
  });
});
