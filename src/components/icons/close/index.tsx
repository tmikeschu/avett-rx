import * as React from "react";

import { joinClassNames } from "lib/utils";

export type Props = React.SVGAttributes<HTMLOrSVGElement>;

const Close: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="currentColor"
      className={joinClassNames(["w-6 h-6", className])}
      strokeWidth="0.1px"
      {...props}
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
};

export default Close;
