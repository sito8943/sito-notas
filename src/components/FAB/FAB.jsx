/* eslint-disable react/prop-types */
import { useMemo } from "react";

// @sito/ui
import { IconButton } from "@sito/ui";

export const FAB = (props) => {
  const {
    position = "bottom-right",
    className = "",
    shape = "filled",
    ...rest
  } = props;

  const lPosition = useMemo(() => {
    switch (position) {
      case "top-left":
        return "top-5 left-5";
      case "top-right":
        return "top-5 right-5";
      case "bottom-left":
        return "bottom-5 left-5";
      default: // bottom - right
        return "bottom-5 right-5";
    }
  }, [position]);

  return (
    <IconButton
      {...rest}
      shape={shape}
      className={`fixed ${lPosition} ${className}`}
    />
  );
};
