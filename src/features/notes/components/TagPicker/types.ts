import type { TagSelectorProps } from "@/features/notes/components/TagSelector";

import type { TagPickerPlacement } from "./constants";

export type TagPickerProps = Omit<
  TagSelectorProps,
  "onEscape" | "className"
> & {
  disabled?: boolean;
};

export type TagPickerPlacementValue =
  (typeof TagPickerPlacement)[keyof typeof TagPickerPlacement];

export interface TagPickerLayout {
  placement: TagPickerPlacementValue;
  /** Max panel height in px; null leaves the CSS default */
  maxHeight: number | null;
}
