import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { Editor } from "@tiptap/react";

export interface EditorToolbarProps {
  editor: Editor | null;
}

/** One toolbar button; labels are i18n keys resolved at render */
export interface EditorToolbarAction {
  id: string;
  labelKey: string;
  /** Icon, or a short text when no icon fits (H1) */
  icon?: IconDefinition;
  text?: string;
  run: (editor: Editor) => void;
  /** Format on at the cursor (button shows pressed) */
  isActive?: (editor: Editor) => boolean;
  /** Whether it can run now (undo/redo) */
  canRun?: (editor: Editor) => boolean;
}

export interface EditorToolbarActionState {
  active: boolean;
  disabled: boolean;
}

export type EditorToolbarState = Record<string, EditorToolbarActionState>;
