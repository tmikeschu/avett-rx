import * as React from "react";

import { Any } from "./types";

export function randomElement<T>(items: T[]): T | undefined {
  return items[Math.floor(Math.random() * (items.length - 1))];
}

const newlineRegex = /(\r\n|\r|\n)/g;
export const nl2br = (str: string): Array<string | React.ReactElement> => {
  return str.split(newlineRegex).map((line, index) => {
    if (line.match(newlineRegex)) {
      return React.createElement("br", { key: index });
    }
    return line;
  });
};

export function createUsableContext<T>({
  providerName,
  useName,
}: {
  providerName: string;
  useName: string;
}): readonly [() => T, React.Context<T | undefined>] {
  const ctx = React.createContext<T | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c)
      throw new Error(`${useName} must be inside ${providerName} with a value`);
    return c;
  }
  return [useCtx, ctx] as const;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function noop(..._args: Any[]): void {
  void 0;
}

export function isDefinedAndNonNull<T>(x: T | undefined | null): x is T {
  return typeof x !== "undefined" && x !== null;
}

export function assertIsDefinedAndNonNull<T>(
  x: T | undefined | null
): asserts x is T {
  if (!isDefinedAndNonNull(x)) {
    throw new Error(`value null or undefined: ${x}`);
  }
}
