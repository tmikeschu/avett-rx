import * as React from "react";

import LoadingCircle from "components/icons/loading-circle";
import Text from "components/text";
import { Color } from "lib/constants";
import { joinClassNames, TypedKey } from "lib/utils";
const LETTERS = "...".split("");

export type Props = {
  color?: Color;
  type?: "text" | "spin";
  size?: "sm" | "md" | "lg";
};
const Loading: React.FC<Props> = ({
  color = "primary",
  type = "spin",
  size = "md",
}) => {
  return (
    <Text
      as="span"
      variant="caption"
      color={color}
      className={joinClassNames([
        TypedKey<"sm" | "md" | "lg">({
          sm: "text-xs",
          md: "text-base",
          lg: "text-2xl",
        })[size],
      ])}
    >
      {type === "text" ? (
        <>
          <span className="inline-block animate-pulse">loading</span>
          {LETTERS.map((letter, i) => (
            <span
              className={joinClassNames(["inline-block animate-pulse"])}
              style={{
                animationDelay: ["0ms", "333ms", "667ms"][i % LETTERS.length],
              }}
              key={`${letter}:${i}`}
            >
              {letter}
            </span>
          ))}
        </>
      ) : (
        <LoadingCircle size={size} />
      )}
    </Text>
  );
};

export default Loading;
