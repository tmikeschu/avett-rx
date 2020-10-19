type ClassName = string | null | undefined | ClassName[];

export const joinClassNames = (structure: Array<ClassName>): string => {
  return structure
    .map((className) =>
      Array.isArray(className) ? joinClassNames(className) : className
    )
    .join(" ")
    .replace(/\s\s+/g, " ")
    .trim();
};
