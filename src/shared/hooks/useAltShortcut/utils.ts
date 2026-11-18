import { ESCAPE_OVERLAY_SELECTOR } from "@/shared/hooks/useEscapeKey";
import { isEditableTarget } from "@/shared/hooks/useKeyShortcut";

import type { AltShortcut } from "./types";

/**
 * Option/Alt press free for a page shortcut: Alt without Ctrl/Cmd, not
 * already handled, not held down, not composing and with no dialog open.
 * @param event - keydown event
 * @returns the shortcut, or null when the page must leave the press alone
 */
export const toAltShortcut = (event: KeyboardEvent): AltShortcut | null => {
  if (
    !event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.defaultPrevented ||
    event.repeat ||
    event.isComposing ||
    document.querySelector(ESCAPE_OVERLAY_SELECTOR) !== null
  )
    return null;
  return {
    code: event.code,
    shift: event.shiftKey,
    inField: isEditableTarget(event.target),
  };
};
