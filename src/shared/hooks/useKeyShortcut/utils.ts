import { ESCAPE_OVERLAY_SELECTOR } from "@/shared/hooks/useEscapeKey";

import { EDITABLE_SELECTOR } from "./constants";

/**
 * @param target - element that received the key press
 * @returns true when it is a text field (typing there is not a shortcut)
 */
export const isEditableTarget = (target: EventTarget | null): boolean =>
  target instanceof Element && target.closest(EDITABLE_SELECTOR) !== null;

/**
 * Whether a key press is free for a single-key page shortcut: not already
 * handled, not held down, not typed into a field, without Ctrl/Cmd/Alt
 * (browser and editor shortcuts) and with no dialog open.
 * @param event - keydown event
 * @returns true when the page may act on it
 */
export const isFreeShortcut = (event: KeyboardEvent): boolean =>
  !event.defaultPrevented &&
  !event.repeat &&
  !event.isComposing &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  !isEditableTarget(event.target) &&
  document.querySelector(ESCAPE_OVERLAY_SELECTOR) === null;
