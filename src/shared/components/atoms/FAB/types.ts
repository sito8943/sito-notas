import type { IconButtonProps } from "@sito/ui";

import type { FabPosition } from "./constants";

export type FABProps = IconButtonProps & {
  position?: FabPosition;
};
