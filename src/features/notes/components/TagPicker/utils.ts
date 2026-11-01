import type { ViewportSpace } from "@/shared/hooks";

import {
  MIN_PANEL_HEIGHT_PX,
  PANEL_OFFSET_PX,
  TagPickerPlacement,
} from "./constants";
import type { TagPickerLayout } from "./types";

/**
 * Opens below unless the keyboard/screen edge leaves too little room there
 * and there is more above; the panel never grows past the free room.
 * @param space - free room around the button (null: not measured yet)
 * @returns placement and max panel height (null: no limit)
 */
export function getTagPickerLayout(
  space: ViewportSpace | null,
): TagPickerLayout {
  if (!space) return { placement: TagPickerPlacement.Below, maxHeight: null };
  const above = space.below < MIN_PANEL_HEIGHT_PX && space.above > space.below;
  const room = (above ? space.above : space.below) - PANEL_OFFSET_PX;
  return {
    placement: above ? TagPickerPlacement.Above : TagPickerPlacement.Below,
    maxHeight: Math.max(0, room),
  };
}
