import * as React from "react";

import Text from "components/text";
import { Color } from "lib/constants";
import { joinClassNames, TypedKey } from "lib/utils";

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  color?: Color;
  children?: string;
};

const TextField: React.FC<Props> = ({
  color = "primary",
  className,
  children,
  ...props
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const isValid = props.value ? ref.current?.checkValidity() : true;
  return (
    <label className="relative block w-full">
      <Text
        variant="caption"
        color="primary"
        className="absolute bg-light px-1"
        style={{ top: "-0.5rem", left: "0.5rem" }}
      >
        {children}
      </Text>
      <input
        ref={ref}
        className={joinClassNames([
          "border border-solid rounded px-3 py-2 w-full",
          isValid
            ? TypedKey<Color>({
                cancel: "border-cancel",
                error: "border-error",
                success: "border-success",
                primary: "border-primary",
                secondary: "border-secondary",
                dark: "border-dark",
                light: "border-light",
                warning: "border-warning",
              })[color]
            : "border-error",
          className,
        ])}
        {...props}
      />
    </label>
  );
};

export default TextField;
