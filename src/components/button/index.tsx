import * as React from "react";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      {...props}
      style={{
        border: "none",
        padding: "0.5rem 1rem",
      }}
    />
  );
};

export default Button;
