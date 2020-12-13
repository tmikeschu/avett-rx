import * as React from "react";

import { Any } from "./types";

export const TypedKey = <T extends string>(
  map: Record<T, string>
): Record<T, string> => map;

export function randomElement<T>(items: T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)];
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

export function createUsableContext<T>(): readonly [
  () => T,
  React.Context<T | undefined>
] {
  const ctx = React.createContext<T | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx] as const;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function noop(..._args: Any[]): void {
  void 0;
}
