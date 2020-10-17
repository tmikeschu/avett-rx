import * as React from "react";

import Text from "components/text";
import { Color } from "lib/constants";
import { joinClassNames } from "lib/utils";

export const SIZES = ["sm", "md", "lg"] as const;
type Size = typeof SIZES[number];

export const VARIANTS = ["solid", "outline", "link"] as const;
type Variant = typeof VARIANTS[number];

export type Props = {
  color?: Color;
  variant?: Variant;
  size?: Size;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
        (() => {
          switch (size) {
            case "sm":
              return "text-sm";
            case "md":
              return "text-base";
            case "lg":
              return "text-lg";
          }
        })(),
        props.disabled
          ? "cursor-not-allowed opacity-25"
          : "hover:opacity-75 focus:opacity-75 focus:outline-none",
        variant === "solid" ? "rounded" : "",
        variant === "outline" ? "rounded border border-solid bg-light" : "",
        variant === "link"
          ? [
              "border-b border-solid bg-none p-0",
              (() => {
                switch (size) {
                  case "sm":
                    return "";
                  case "md":
                    return "";
                  case "lg":
                    return "";
                }
              })(),
            ]
          : [
              (() => {
                switch (size) {
                  case "sm":
                    return "px-2 py-1";
                  case "md":
                    return "px-4 py-2";
                  case "lg":
                    return "px-8 py-4";
                }
              })(),
            ],
        (() => {
          switch (color) {
            case "primary": {
              switch (variant) {
                case "solid":
                  return "bg-primary text-light border-primary";

                case "outline":
                case "link":
                  return "text-primary border-primary";

                default:
                  return "bg-primary text-light border-primary";
              }
            }

            case "secondary": {
              switch (variant) {
                case "solid":
                  return "bg-secondary border-secondary text-light";

                case "outline":
                case "link":
                  return "text-secondary border-secondary";

                default:
                  return "bg-secondary border-secondary";
              }
            }

            case "cancel": {
              switch (variant) {
                case "solid":
                  return "bg-gray-600 border-gray-600 text-light";

                case "outline":
                case "link":
                  return "border-gray-600 text-gray-600";

                default:
                  return "bg-gray-600 border-gray-600";
              }
            }

            case "warning": {
              switch (variant) {
                case "solid":
                  return "bg-warning text-dark border-warning";

                case "outline":
                case "link":
                  return "border-warning text-black";

                default:
                  return "bg-warning text-dark border-warning";
              }
            }

            case "error": {
              switch (variant) {
                case "solid":
                  return "bg-error text-light border-error";

                case "outline":
                case "link":
                  return "border-error text-error";

                default:
                  return "bg-error text-light border-error";
              }
            }

            case "success": {
              switch (variant) {
                case "solid":
                  return "bg-success text-light border-success";

                case "outline":
                case "link":
                  return "border-success text-success";

                default:
                  return "bg-success text-light border-success";
              }
            }

            default:
              return "bg-gray-500 text-dark";
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
