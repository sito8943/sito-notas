import type { Editor } from "@tiptap/react";

import {
  BLOCK_TYPES,
  HOTKEY_SYMBOLS_MAC,
  HOTKEY_SYMBOLS_OTHER,
  PARAGRAPH_BLOCK_ID,
  TOOLBAR_ACTIONS,
} from "./constants";
import type { EditorToolbarState } from "./types";

/**
 * @param editor - Tiptap editor
 * @returns button states, block type and link at the cursor
 */
export const getToolbarState = (editor: Editor): EditorToolbarState => ({
  actions: Object.fromEntries(
    TOOLBAR_ACTIONS.map((action) => [
      action.id,
      {
        active: action.isActive?.(editor) ?? false,
        disabled: action.canRun ? !action.canRun(editor) : false,
      },
    ]),
  ),
  // Paragraph is the fallback: quotes and code blocks also hold one
  blockId:
    BLOCK_TYPES.find(
      (block) => block.id !== PARAGRAPH_BLOCK_ID && block.isActive?.(editor),
    )?.id ?? PARAGRAPH_BLOCK_ID,
  linkHref: (editor.getAttributes("link").href as string | undefined) ?? "",
});

/**
 * @param hotkey - Tiptap shortcut ("Mod-Shift-8")
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
