import * as React from "react";

import Text from "components/text";
import { Color, COLORS } from "lib/constants";
import { joinClassNames } from "lib/utils";

export type ButtonColor = Exclude<Color, "dark" | "light">;
export const BUTTON_COLORS = COLORS.filter(
  (c) => c !== "dark" && c !== "light"
) as ButtonColor[];

export const SIZES = ["sm", "md", "lg"] as const;
type Size = typeof SIZES[number];

export const VARIANTS = ["solid", "outline", "link"] as const;
type Variant = typeof VARIANTS[number];

export type Props = {
  color?: ButtonColor;
  variant?: Variant;
  size?: Size;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const TypedKey = <U extends string>(
  map: Record<U, string>
): Record<U, string> => map;

const Button: React.FC<Props> = ({
  color = "primary",
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={joinClassNames([
        TypedKey<Size>({
          sm: "text-sm",
          md: "text-base",
          lg: "text-lg",
        })[size],
        props.disabled
          ? "cursor-not-allowed opacity-25"
          : "hover:opacity-75 focus:opacity-75 focus:outline-none",
        variant === "solid" ? "rounded" : "",
        variant === "outline" ? "rounded border border-solid bg-light" : "",
        variant === "link"
          ? "border-b border-solid bg-none p-0"
          : TypedKey<Size>({
              sm: "px-2 py-1",
              md: "px-4 py-2",
              lg: "px-8 py-4",
            })[size],
        (() => {
          switch (variant) {
            case "solid": {
              return TypedKey<ButtonColor>({
                primary: "bg-primary text-light border-primary",
                secondary: "bg-secondary border-secondary text-light",
                cancel: "bg-gray-600 border-gray-600 text-light",
                warning: "bg-warning text-dark border-warning",
                error: "bg-error text-light border-error",
                success: "bg-success text-light border-success",
              })[color];
            }
            case "outline": {
              return TypedKey<ButtonColor>({
                primary: "text-primary border-primary",
                secondary: "text-secondary border-secondary",
                cancel: "border-cancel text-cancel",
                warning: "border-warning text-black",
                success: "border-success text-success",
                error: "border-error text-error",
              })[color];
            }
            case "link": {
              return TypedKey<ButtonColor>({
                primary: "text-primary border-primary",
                secondary: "text-secondary border-secondary",
                cancel: "border-cancel text-cancel",
                warning: "border-warning text-black",
                success: "border-success text-success",
                error: "border-error text-error",
              })[color];
            }
          }
        })(),
        className,
      ])}
    >
      {typeof children === "string" ? (
        <Text variant="button">{children}</Text>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
