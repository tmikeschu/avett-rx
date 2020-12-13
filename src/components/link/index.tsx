import * as React from "react";
import { Link as ChLink, LinkProps as ChProps, Text } from "@chakra-ui/react";
import NextLink, { LinkProps } from "next/link";

const Link: React.FC<LinkProps & ChProps> = ({
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
        <ChLink {...props}>
          <Text>{children}</Text>
        </ChLink>
      ) : (
        children
      )}
    </NextLink>
  );
};

export default Link;
