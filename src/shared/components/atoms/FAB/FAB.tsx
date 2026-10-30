// @sito/ui
import { IconButton } from "@sito/ui";

import { FabPosition } from "./constants";
import type { FABProps } from "./types";
import "./styles.css";

export const FAB = (props: FABProps) => {
  const {
    position = FabPosition.BottomRight,
    className = "",
    variant = "submit",
    ...rest
  } = props;

  return (
    <IconButton
      {...rest}
      variant={variant}
      className={`fab ${position} ${className}`}
    />
  );
};
