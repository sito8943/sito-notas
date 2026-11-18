/** Option/Alt key press passed to an Alt shortcut handler */
export interface AltShortcut {
  /** Physical key (`KeyboardEvent.code`: "KeyT", "Digit1", "ArrowLeft"),
   * the same on every layout (Option changes the typed character on macOS) */
  code: string;
  shift: boolean;
  /** Pressed while typing in a text field */
  inField: boolean;
}

/** @returns true when the press was a shortcut (its default is then prevented) */
export type AltShortcutHandler = (shortcut: AltShortcut) => boolean;
