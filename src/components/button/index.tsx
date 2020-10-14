import * as React from "react";

export type Props = {
  variant: "primary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = (props) => {
  return (
    <button
      {...props}
      style={{
        border: "none",
        padding: "0.5rem 1rem",
        ...props.style,
      }}
    />
  );
};

export default Button;
