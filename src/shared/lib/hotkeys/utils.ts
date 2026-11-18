import { HOTKEY_SYMBOLS_MAC, HOTKEY_SYMBOLS_OTHER } from "./constants";

/**
 * @param hotkey - shortcut in Tiptap notation ("Mod-Shift-8", "Alt-T")
 * @param isMac - Apple keyboard
 * @returns label for the user ("⌘⇧8" or "Ctrl+Shift+8")
 */
export const formatHotkey = (hotkey: string, isMac: boolean): string => {
  const symbols = isMac ? HOTKEY_SYMBOLS_MAC : HOTKEY_SYMBOLS_OTHER;
  const keys = hotkey.split("-").map((key) => symbols[key] ?? key);
  return keys.join(isMac ? "" : "+");
};

/** @returns whether the user is on an Apple device */
export const isApplePlatform = (): boolean =>
  /Mac|iPhone|iPad/.test(navigator.userAgent);
