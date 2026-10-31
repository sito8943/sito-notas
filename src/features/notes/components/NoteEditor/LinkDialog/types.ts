import type { Editor } from "@tiptap/react";

export interface LinkDialogProps {
  editor: Editor;
  open: boolean;
  /** Link at the cursor ("" for a new one) */
  initialUrl: string;
  onClose: () => void;
}
