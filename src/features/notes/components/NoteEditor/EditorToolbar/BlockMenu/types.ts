import type { Editor } from "@tiptap/react";

export interface BlockMenuProps {
  editor: Editor;
  /** Block type at the cursor (BLOCK_TYPES id) */
  blockId: string;
  /** Shortcut labels use Apple symbols */
  isMac: boolean;
}
