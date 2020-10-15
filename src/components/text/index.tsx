import * as React from "react";

import { Color } from "lib/constants";

export const VARIANTS = [
  "body1",
  "button",
  "caption",
  "overline",
  "subtitle",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
] as const;
type Variant = typeof VARIANTS[number];

const TEXT_NODES = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"] as const;
type TextNode = typeof TEXT_NODES[number];

const variantMap: Record<Variant, TextNode> = {
  body1: "p",
  button: "span",
  caption: "span",
  overline: "span",
  subtitle: "h6",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

type TextElement = HTMLHeadingElement | HTMLSpanElement | HTMLParagraphElement;

type Props<T extends TextElement> = (T extends HTMLHeadingElement
  ? React.HTMLAttributes<T>
  : React.HTMLProps<T>) & {
  variant?: Variant;
  as?: TextNode;
  color?: Color;
};

function Text<T extends TextElement>({
  variant = "body1",
  className = "",
  color,
  as,
  ...props
}: Props<T>): React.ReactElement {
  const ComponentToUse: TextNode = as || variantMap[variant];
  return (
    <ComponentToUse
      {...props}
      className={[
        color
          ? ({
              cancel: "text-cancel",
              primary: "text-primary",
              secondary: "text-secondary",
              success: "text-success",
              error: "text-error",
              warning: "text-dark border-warning border-b-4 border-solid",
              dark: "text-dark",
              light: "text-light",
            } as Record<Color, string>)[color] || ""
          : "",
        variant
          ? ({
              h1: "text-4xl tracking-tighter font-display leading-tight",
              h2: "text-2xl tracking-tighter font-display leading-tight",
              h3: "text-xl tracking-tighter font-display leading-tight",
              h4: "text-lg tracking-tight font-display leading-tight",
              h5: "text-sm tracking-tight font-display leading-tight",
              h6: "text-xs font-display leading-tight",
              subtitle: "text-sm font-body",
              body1: "leading-normal font-body",
              overline: "uppercase text-sm font-body",
              caption: "text-xs text-gray-600 font-body",
              button: "font-bold text-base sm:text-lg font-body uppercase",
            } as Record<Variant, string>)[variant] || ""
          : "",
        className,
      ]
        .map((x) => (Array.isArray(x) ? x.join(" ") : x))
        .join(" ")}
    />
  );
}

export default Text;
