import "@reach/dialog/styles.css";
import styles from "./Dialog.module.css";

import * as React from "react";
import {
  DialogContent,
  DialogOverlay,
  DialogProps as RDialogProps,
} from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";

import Button from "components/button";
import Close from "components/icons/close";
import { joinClassNames } from "lib/utils";

export * from "@reach/dialog";

export type DialogProps = RDialogProps & {
  titleSlot?: React.ReactElement;
  actionsSlot?: React.ReactElement;
};

export const Dialog: React.FC<DialogProps> = ({
  onDismiss,
  children,
  titleSlot,
  actionsSlot,
  "aria-label": label,
  ...props
}) => {
  return (
    <>
      <DialogOverlay
        {...props}
        onDismiss={onDismiss}
        className={joinClassNames([
          "Dialog__overlay z-50",
          styles.Dialog__overlay,
        ])}
      >
        <DialogContent
          aria-label={label}
          className={joinClassNames([
            "Dialog__content rounded flex flex-col items-start",
            styles.Dialog__content,
          ])}
        >
          <div
            className={joinClassNames([
              "flex items-center flex-row-reverse mb-8 w-full justify-between",
            ])}
          >
            <Button variant="icon" onClick={onDismiss} className="">
              <VisuallyHidden>Close</VisuallyHidden>
              <Close />
            </Button>
            {titleSlot}
          </div>
          {children}
          {actionsSlot ? (
            <div className="w-full flex justify-end mt-8">{actionsSlot}</div>
          ) : null}
        </DialogContent>
      </DialogOverlay>
    </>
  );
};
