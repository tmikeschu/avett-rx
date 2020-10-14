import * as React from "react";

export const VARIANTS = [
  "primary",
  "secondary",
  "primaryOutlined",
  "cancel",
] as const;
type Variant = typeof VARIANTS[number];

export type Props = {
  variant: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({ variant, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={[
        "py-2 px-4 rounded",
        props.disabled
          ? "cursor-not-allowed opacity-25"
          : "hover:opacity-75 focus:opacity-75 focus:outline-none",
        (() => {
          switch (variant) {
            case "primary":
              return "bg-primary text-light border-primary";

            case "secondary":
              return "bg-secondary text-dark border-secondary";

            case "primaryOutlined":
              return "border-primary border border-solid bg-light text-primary";

            case "cancel":
              return "border-gray-600 border border-solid bg-light text-gray-600";

            default:
              return "bg-gray-500 text-dark";
          }
        })(),
        className,
      ].join(" ")}
    />
  );
};

export default Button;
