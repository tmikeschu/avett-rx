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
