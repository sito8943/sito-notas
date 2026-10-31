import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { Editor } from "@tiptap/react";

export interface EditorToolbarProps {
  editor: Editor | null;
}

/** One toolbar button; labels are i18n keys resolved at render */
export interface EditorToolbarAction {
  id: string;
  labelKey: string;
  icon: IconDefinition;
  /** Tiptap shortcut ("Mod-Shift-8"), shown in the tooltip */
  hotkey?: string;
  run: (editor: Editor) => void;
  /** Format on at the cursor (button shows pressed) */
  isActive?: (editor: Editor) => boolean;
  /** Whether it can run now (undo) */
  canRun?: (editor: Editor) => boolean;
}

/** Entry of the block menu (text, headings, quote, code block, divider) */
export interface EditorBlockType {
  id: string;
  labelKey: string;
  /** Short name shown on the menu button (H2) */
  shortLabelKey: string;
  /** Tiptap shortcut, shown in the menu */
  hotkey?: string;
  run: (editor: Editor) => void;
  /** Missing for insert-only entries (divider) */
  isActive?: (editor: Editor) => boolean;
}

export interface EditorToolbarActionState {
  active: boolean;
  disabled: boolean;
}

export interface EditorToolbarState {
  actions: Record<string, EditorToolbarActionState>;
  /** Block type at the cursor */
  blockId: string;
  /** Link at the cursor, if any */
  linkHref: string;
}
