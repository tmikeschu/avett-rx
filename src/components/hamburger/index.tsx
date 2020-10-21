import * as React from "react";

import { joinClassNames } from "lib/utils";

export type Props = React.SVGAttributes<HTMLOrSVGElement>;
const Hamburger: React.FC<Props> = ({ className, ...props }) => {
  // https://css-tricks.com/snippets/svg/svg-hamburger-menu/
  return (
    <svg
      className={joinClassNames(["w-6 h-6", className])}
      viewBox="0 0 100 80"
      fill="currentColor"
      {...props}
    >
      <rect width="100" height="10"></rect>
      <rect y="30" width="100" height="10"></rect>
      <rect y="60" width="100" height="10"></rect>
    </svg>
  );
};

export default Hamburger;
