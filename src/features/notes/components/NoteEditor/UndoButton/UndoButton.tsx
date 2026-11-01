import { useEditorState } from "@tiptap/react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @sito/ui
import { ICON_BUTTON_SIZES, IconButton, Tooltip } from "@sito/ui";

import { UNDO_ACTION } from "@/features/notes/components/NoteEditor/EditorToolbar/constants";
import {
  formatHotkey,
  isApplePlatform,
} from "@/features/notes/components/NoteEditor/EditorToolbar/utils";
import type { UndoButtonProps } from "./types";

/** Undo of the rich editor, shown in the page header */
function UndoButton({ editor, className = "" }: UndoButtonProps) {
  const { t } = useTranslation();

  // Re-renders only when undo becomes (un)available
  const canUndo = useEditorState({
    editor,
    selector: ({ editor: current }) =>
      current ? (UNDO_ACTION.canRun?.(current) ?? true) : false,
  });

  if (!editor) return null;

  const label = t(UNDO_ACTION.labelKey);
  const hotkey = UNDO_ACTION.hotkey
    ? formatHotkey(UNDO_ACTION.hotkey, isApplePlatform())
    : undefined;

  return (
    <Tooltip label={label} hotkey={hotkey}>
      <IconButton
        size={ICON_BUTTON_SIZES.SM}
        aria-label={label}
        disabled={!canUndo}
        onClick={() => UNDO_ACTION.run(editor)}
        icon={<FontAwesomeIcon icon={UNDO_ACTION.icon} />}
        className={className}
      />
    </Tooltip>
  );
}

export default UndoButton;
