import { ESCAPE_OVERLAY_SELECTOR } from "./constants";

/**
 * Whether a plain Escape press is free for a page shortcut: not already
 * handled, not part of a key combo or IME composition, and no dialog open.
 * @param event - keydown event
 * @returns true when the page may act on it
 */
export const isFreeEscape = (event: KeyboardEvent): boolean =>
  event.key === "Escape" &&
  !event.defaultPrevented &&
  !event.isComposing &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  !event.shiftKey &&
  document.querySelector(ESCAPE_OVERLAY_SELECTOR) === null;
