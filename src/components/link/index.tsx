import * as React from "react";
import { Link as ChLink, LinkProps as ChProps, Text } from "@chakra-ui/react";
import NextLink, { LinkProps } from "next/link";

import { joinClassNames } from "lib/utils";

const Link: React.FC<LinkProps & ChProps> = ({
  className,
  children,
  passHref,
  href,
  as,
  shallow,
  replace,
  prefetch,
  scroll,
  ...props
}) => {
  return (
    <NextLink
      href={href}
      shallow={shallow}
      as={as}
      passHref={passHref}
      replace={replace}
      prefetch={prefetch}
      scroll={scroll}
    >
      {typeof children === "string" ? (
        <ChLink {...props} className={joinClassNames([className])}>
          <Text>{children}</Text>
        </ChLink>
      ) : (
        children
      )}
    </NextLink>
  );
};

export default Link;
