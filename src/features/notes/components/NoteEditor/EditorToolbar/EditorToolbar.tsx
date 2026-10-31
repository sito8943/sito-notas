import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { ICON_BUTTON_SIZES, IconButton, Tooltip, useDialog } from "@sito/ui";

import { LinkDialog } from "@/features/notes/components/NoteEditor/LinkDialog";
import { BlockMenu } from "./BlockMenu";
import {
  CODE_ACTION,
  INLINE_ACTIONS,
  LIST_ACTIONS,
  TOOLBAR_TOOLTIP_SIDE,
  UNDO_ACTION,
} from "./constants";
import type { EditorToolbarAction, EditorToolbarProps } from "./types";
import { formatHotkey, getToolbarState, isApplePlatform } from "./utils";
import "./styles.css";

/** Formatting bar of the note editor */
function EditorToolbar({ editor }: EditorToolbarProps) {
  const { t } = useTranslation();
  const linkDialog = useDialog();
  const isMac = isApplePlatform();

  // Re-renders only when a button state changes, not on every keystroke
  const state = useEditorState({
    editor,
    selector: ({ editor: current }) =>
      current ? getToolbarState(current) : null,
  });

  if (!editor || !state) return null;

  const renderAction = (action: EditorToolbarAction, current: Editor) => {
    const label = t(action.labelKey);
    const { active, disabled } = state.actions[action.id];
    return (
      <Tooltip
        key={action.id}
        label={label}
        hotkey={action.hotkey ? formatHotkey(action.hotkey, isMac) : undefined}
        side={TOOLBAR_TOOLTIP_SIDE}
      >
        <IconButton
          size={ICON_BUTTON_SIZES.SM}
          aria-label={label}
          aria-pressed={action.isActive ? active : undefined}
          disabled={disabled}
          onClick={() => action.run(current)}
          icon={<FontAwesomeIcon icon={action.icon} />}
          className={`editor-toolbar-button ${active ? "active" : ""}`}
        />
      </Tooltip>
    );
  };

  const linkLabel = t("_pages:note.toolbar.link");
  const hasLink = state.linkHref !== "";

  return (
    <div
      role="toolbar"
      aria-label={t("_pages:note.toolbar.label")}
      className="editor-toolbar"
    >
      <div className="editor-toolbar-group">
        {INLINE_ACTIONS.map((action) => renderAction(action, editor))}
      </div>
      <div className="editor-toolbar-group">
        <BlockMenu editor={editor} blockId={state.blockId} isMac={isMac} />
      </div>
      <div className="editor-toolbar-group">
        {LIST_ACTIONS.map((action) => renderAction(action, editor))}
        <Tooltip label={linkLabel} side={TOOLBAR_TOOLTIP_SIDE}>
          <IconButton
            size={ICON_BUTTON_SIZES.SM}
            aria-label={linkLabel}
            aria-pressed={hasLink}
            onClick={linkDialog.handleOpen}
            icon={<FontAwesomeIcon icon={faLink} />}
            className={`editor-toolbar-button ${hasLink ? "active" : ""}`}
          />
        </Tooltip>
        {renderAction(CODE_ACTION, editor)}
      </div>
      <div className="editor-toolbar-end">
        {renderAction(UNDO_ACTION, editor)}
      </div>
      <LinkDialog
        editor={editor}
        open={linkDialog.open}
        initialUrl={state.linkHref}
        onClose={linkDialog.handleClose}
      />
    </div>
  );
}

export default EditorToolbar;
