export const COLORS = [
  "dark",
  "light",
  "primary",
  "secondary",
  "cancel",
  "warning",
  "error",
  "success",
] as const;
export type Color = typeof COLORS[number];
