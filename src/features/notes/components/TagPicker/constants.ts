/** Where the panel opens relative to the "+ Tag" button */
export const TagPickerPlacement = {
  Below: "below",
  Above: "above",
} as const;

/** Gap between the button and the panel (mt-2 / mb-2) plus screen margin */
export const PANEL_OFFSET_PX = 16;

/** Below this room under the button the panel opens above (if roomier) */
export const MIN_PANEL_HEIGHT_PX = 180;
