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

/** Tab shortcuts with what they do (listed in Settings) */
export const TAB_SHORTCUTS = [
  { hotkey: "Alt-T", labelKey: "_pages:settings.sections.shortcuts.newTab" },
  { hotkey: "Alt-W", labelKey: "_pages:settings.sections.shortcuts.closeTab" },
  { hotkey: "Alt-1–8", labelKey: "_pages:settings.sections.shortcuts.goToTab" },
  { hotkey: "Alt-9", labelKey: "_pages:settings.sections.shortcuts.lastTab" },
  {
    hotkey: "Alt-Shift-←",
    labelKey: "_pages:settings.sections.shortcuts.previousTab",
  },
  {
    hotkey: "Alt-Shift-→",
    labelKey: "_pages:settings.sections.shortcuts.nextTab",
  },
] as const;
