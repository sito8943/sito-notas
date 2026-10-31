import type { MediaColumnsRule } from "@/shared/hooks";

/** Same breakpoints the CSS masonry used (columns-4 xl:3 lg:2 sm:1) */
export const NOTES_GRID_COLUMNS: MediaColumnsRule[] = [
  { maxWidth: 1279, columns: 3 },
  { maxWidth: 1023, columns: 2 },
  { maxWidth: 639, columns: 1 },
];

export const NOTES_GRID_MAX_COLUMNS = 4;

/** Attribute that marks each draggable card with its note id */
export const NOTE_ID_ATTRIBUTE = "data-note-id";

/** Touch: hold this long before a drag starts (shorter = page scroll) */
export const TOUCH_DRAG_DELAY_MS = 250;

/** Touch: holding still this long opens the card menu (moving = drag) */
export const LONG_PRESS_MS = 500;

/** Touch: moving more than this (px) before the menu opens cancels it */
export const LONG_PRESS_TOLERANCE_PX = 8;

/** Short buzz when the long-press menu opens (where supported) */
export const LONG_PRESS_VIBRATION_MS = 10;

/** Pressing these never starts a drag (card actions) */
export const NO_DRAG_SELECTOR = "button, input, textarea, select";
