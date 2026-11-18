import type { Editor } from "@tiptap/react";

import type { ShortcutInfo } from "@/shared/lib/hotkeys";

import {
  BLOCK_TYPES,
  EXTRA_EDITOR_SHORTCUTS,
  PARAGRAPH_BLOCK_ID,
  TOOLBAR_ACTIONS,
  UNDO_ACTION,
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
 * Light on purpose (no editor code): the feature index exports it.
 * @returns every editor shortcut with what it does: toolbar actions, undo,
 * block types and the extra ones (move list items, open links)
 */
export const getEditorShortcuts = (): ShortcutInfo[] => [
  ...[...TOOLBAR_ACTIONS, UNDO_ACTION, ...BLOCK_TYPES].flatMap(
    ({ hotkey, labelKey }) => (hotkey ? [{ hotkey, labelKey }] : []),
  ),
  ...EXTRA_EDITOR_SHORTCUTS,
];
