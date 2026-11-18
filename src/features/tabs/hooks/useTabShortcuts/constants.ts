/** Physical keys (`KeyboardEvent.code`) of the Option/Alt tab shortcuts */
export const TabShortcutCode = {
  New: "KeyT",
  Close: "KeyW",
  Previous: "ArrowLeft",
  Next: "ArrowRight",
} as const;

/** Codes of the number row ("Digit1"…"Digit9") */
export const DIGIT_CODE_PREFIX = "Digit";

/** `aria-keyshortcuts` of the tab actions */
export const TabAriaShortcut = {
  New: "Alt+T",
  Close: "Alt+W",
} as const;
