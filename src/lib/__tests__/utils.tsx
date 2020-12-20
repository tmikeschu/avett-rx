import * as React from "react";

import {
  assertIsDefinedAndNonNull,
  createUsableContext,
  isDefinedAndNonNull,
  nl2br,
  randomElement,
} from "../utils";

describe("nl2br", () => {
  it("replaces newlines with break tags", () => {
    const input = "hello\nyou";
    const actual = nl2br(input);
    const expected = ["hello", <br key={1} />, "you"];
    expect(actual).toEqual(expected);
  });
});

const DEFINED_NON_NULL_VALUES = [
  1,
  0,
  "",
  "hi",
  {},
  [],
  [0],
  { a: "b" },
  true,
  false,
];
const UNDEFINED_NULL = [undefined, null];
describe("isDefinedOrNonNull", () => {
  DEFINED_NON_NULL_VALUES.forEach((m) => {
    it(`returns true for: ${m}`, () => {
      expect(isDefinedAndNonNull(m)).toBe(true);
    });
  });

  it(`returns false for null and undefined`, () => {
    UNDEFINED_NULL.forEach((value) => {
      expect(isDefinedAndNonNull(value)).toBe(false);
    });
  });
});

describe("assertIsDefinedAndNonNull", () => {
  it("does not throw if valid", () => {
    DEFINED_NON_NULL_VALUES.forEach((m) => {
      expect(() => assertIsDefinedAndNonNull(m)).not.toThrow();
    });
  });

  it("throws if not valid", () => {
    UNDEFINED_NULL.forEach((value) => {
      expect(() => assertIsDefinedAndNonNull(value)).toThrow();
    });
  });
});

describe("createUsableContext", () => {
  it("returns a hook that throws if outside the provider", () => {
    const [hook] = createUsableContext({ providerName: "P", useName: "u" });
    expect(() => hook()).toThrow();
  });
  it("returns the context object", () => {
    const [, ctx] = createUsableContext({ providerName: "P", useName: "u" });
    expect(ctx.Provider).toBeDefined();
    expect(ctx.Consumer).toBeDefined();
  });
});

describe("randomElement", () => {
  it("uses Math.random to generate a random index", () => {
    const rand = jest.spyOn(Math, "random");
    rand.mockReturnValue(0);
    const x = [1, 2, 3];
    let actual = randomElement(x);
    expect(actual).toEqual(1);
    rand.mockReturnValue(0.5);
    actual = randomElement(x);
    expect(actual).toEqual(2);
    rand.mockReturnValue(1);
    actual = randomElement(x);
    expect(actual).toEqual(3);
  });
});
