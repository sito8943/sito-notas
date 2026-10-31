import { useEditorState } from "@tiptap/react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @sito/ui
import { ICON_BUTTON_SIZES, IconButton, Tooltip } from "@sito/ui";

import { EDITOR_TOOLBAR_GROUPS } from "./constants";
import type { EditorToolbarProps } from "./types";
import { getToolbarState } from "./utils";
import "./styles.css";

/** Formatting buttons of the note editor */
function EditorToolbar({ editor }: EditorToolbarProps) {
  const { t } = useTranslation();

  // Re-renders only when a button state changes, not on every keystroke
  const state = useEditorState({
    editor,
    selector: ({ editor: current }) =>
      current ? getToolbarState(current) : null,
  });

  if (!editor || !state) return null;

  return (
    <div
      role="toolbar"
      aria-label={t("_pages:note.toolbar.label")}
      className="editor-toolbar"
    >
      {EDITOR_TOOLBAR_GROUPS.map((group) => (
        <div key={group[0].id} className="editor-toolbar-group">
          {group.map((action) => {
            const label = t(action.labelKey);
            const { active, disabled } = state[action.id];
            return (
              <Tooltip key={action.id} label={label}>
                <IconButton
                  size={ICON_BUTTON_SIZES.SM}
                  aria-label={label}
                  aria-pressed={action.isActive ? active : undefined}
                  disabled={disabled}
                  onClick={() => action.run(editor)}
                  icon={
                    action.icon ? (
                      <FontAwesomeIcon icon={action.icon} />
                    ) : (
                      <span className="editor-toolbar-text">{action.text}</span>
                    )
                  }
                  className={`editor-toolbar-button ${active ? "active" : ""}`}
                />
              </Tooltip>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default EditorToolbar;
