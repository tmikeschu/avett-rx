import { assertRESTMethod, isRESTMethod, REST_METHODS } from "../rest-handlers";

describe("isRESTMethod", () => {
  REST_METHODS.forEach((m) => {
    it(`returns true for: ${m}`, () => {
      expect(isRESTMethod(m)).toBe(true);
    });
  });

  it(`returns false for: CHANGE`, () => {
    expect(isRESTMethod("CHANGE")).toBe(false);
  });
});

describe("assertRESTMethod", () => {
  it("throws if not valid", () => {
    REST_METHODS.forEach((m) => {
      expect(() => assertRESTMethod(m)).not.toThrow();
    });

    expect(() => assertRESTMethod("CHANGE")).toThrow();
  });
});
