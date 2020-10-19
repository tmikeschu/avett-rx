import { joinClassNames } from "../utils";

describe("joinClassNames", () => {
  it("takes an array of className strings and joins them to a single string", () => {
    const actual = joinClassNames(["a", "b", ["c"]]);
    const expected = "a b c";
    expect(actual).toEqual(expected);
  });

  it("handles arbitrarily nested arrays", () => {
    const actual = joinClassNames(["a", "b", ["c", ["d", "e", ["f"]]]]);
    const expected = "a b c d e f";
    expect(actual).toEqual(expected);
  });

  it("cleans up whitespace", () => {
    const actual = joinClassNames([
      "  a   ",
      undefined,
      "b",
      null,
      ["c", ["d", "e", [" f    "]]],
    ]);
    const expected = "a b c d e f";
    expect(actual).toEqual(expected);
  });
});
