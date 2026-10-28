// @sito/ui
import { IconButton } from "@sito/ui";

import { FAB_POSITION_CLASSNAME, FabPosition } from "./constants";
import type { FABProps } from "./types";

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
      className={`fixed ${FAB_POSITION_CLASSNAME[position]} ${className}`}
    />
  );
};
