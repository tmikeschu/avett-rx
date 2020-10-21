import * as React from "react";
import NextLink, { LinkProps } from "next/link";

import { joinClassNames } from "lib/utils";

const Link: React.FC<
  LinkProps & {
    className?: string;
    aProps?: React.HTMLProps<HTMLAnchorElement>;
  }
> = ({ className, aProps = {}, children, ...props }) => {
  return (
    <NextLink {...props}>
      <a {...aProps} className={joinClassNames([className])}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
