import "@reach/dialog/styles.css";

import * as React from "react";
import { DialogContent, DialogOverlay, DialogProps } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";

import { joinClassNames } from "lib/utils";

export * from "@reach/dialog";

export const Dialog: React.FC<DialogProps> = ({
  onDismiss,
  children,
  "aria-label": label,
  ...props
}) => {
  return (
    <>
      <DialogOverlay {...props} onDismiss={onDismiss} className="z-50">
        <DialogContent
          aria-label={label}
          className={joinClassNames(["rounded"])}
        >
          <button onClick={onDismiss}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
          {children}
        </DialogContent>
      </DialogOverlay>
    </>
  );
};
