import type { Editor } from "@tiptap/react";

export interface UndoButtonProps {
  /** Rich editor of the note; null renders nothing */
  editor: Editor | null;
  className?: string;
}
