import type { Editor } from "@tiptap/react";

import { BLOCK_TYPES, PARAGRAPH_BLOCK_ID, TOOLBAR_ACTIONS } from "./constants";
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
