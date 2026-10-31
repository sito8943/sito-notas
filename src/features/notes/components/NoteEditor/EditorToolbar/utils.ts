import type { Editor } from "@tiptap/react";

import { EDITOR_TOOLBAR_GROUPS } from "./constants";
import type { EditorToolbarState } from "./types";

/**
 * @param editor - Tiptap editor
 * @returns pressed/disabled state of every toolbar button
 */
export const getToolbarState = (editor: Editor): EditorToolbarState =>
  Object.fromEntries(
    EDITOR_TOOLBAR_GROUPS.flat().map((action) => [
      action.id,
      {
        active: action.isActive?.(editor) ?? false,
        disabled: action.canRun ? !action.canRun(editor) : false,
      },
    ]),
  );
