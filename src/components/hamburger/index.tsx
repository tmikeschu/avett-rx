import * as React from "react";

export type Props = React.SVGAttributes<HTMLOrSVGElement>;
const Hamburger: React.FC<Props> = (props) => {
  // https://css-tricks.com/snippets/svg/svg-hamburger-menu/
  return (
    <svg
      viewBox="0 0 100 80"
      width="1.5rem"
      height="1.5rem"
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
