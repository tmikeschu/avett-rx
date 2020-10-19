import * as React from "react";

import * as utils from "test";

import Button, { BUTTON_COLORS, SIZES, VARIANTS } from "../";

describe("<Button />", () => {
  it("matches snapshot", () => {
    const { getByRole, rerender } = utils.render(<Button>Snapshot</Button>);
    const button = getByRole("button");
    expect(button).toMatchInlineSnapshot(`
      <button
        class="text-base hover:opacity-75 focus:opacity-75 focus:outline-none rounded px-4 py-2 bg-primary text-light border-primary"
      >
        <span
          class="text-dark font-bold text-base sm:text-lg font-body uppercase"
        >
          Snapshot
        </span>
      </button>
    `);

    rerender(<Button disabled={true}>Snapshot</Button>);
    expect(button).toMatchInlineSnapshot(`
      <button
        class="text-base cursor-not-allowed opacity-25 rounded px-4 py-2 bg-primary text-light border-primary"
        disabled=""
      >
        <span
          class="text-dark font-bold text-base sm:text-lg font-body uppercase"
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
        class="text-base cursor-not-allowed opacity-25 rounded px-4 py-2 bg-primary text-light border-primary"
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
