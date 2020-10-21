import * as React from "react";

type ClassName = string | null | undefined | ClassName[];

export const joinClassNames = (structure: ClassName[]): string => {
  return structure
    .map((className) =>
      Array.isArray(className) ? joinClassNames(className) : className
    )
    .join(" ")
    .replace(/\s\s+/g, " ")
    .trim();
};

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
