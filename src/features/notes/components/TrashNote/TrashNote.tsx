import { useTranslation } from "react-i18next";

// @sito/ui
import { ICON_BUTTON_SIZES, IconButton, Tooltip } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

// components
import { MarkdownPreview } from "@/features/notes/components/MarkdownPreview";

// utils
import { formatNoteDate, getDaysUntilPurge } from "@/features/notes/utils";

import type { TrashNoteProps } from "./types";
import "./styles.css";

/** Card of a trashed note: when it goes away, restore or delete for good */
function TrashNote(props: TrashNoteProps) {
  const { note, onRestore, onDelete, disabled = false } = props;
  const { id, title, content, deletedAt = note.updatedAt } = note;

  const { t, i18n } = useTranslation();

  const daysLeft = getDaysUntilPurge(deletedAt);

  const restoreLabel = t("_pages:trash.restore");
  const deleteLabel = t("_pages:trash.deleteForever");

  return (
    <article className="trash-note appear">
      <h3 className="trash-note-title">
        {title || t("_pages:home.notes.untitled")}
      </h3>
      <MarkdownPreview content={content} className="trash-note-excerpt" />
      <footer className="trash-note-footer">
        <p className="trash-note-meta">
          <span>
            {t("_pages:trash.deletedAt", {
              date: formatNoteDate(deletedAt, i18n.language),
            })}
          </span>
          <span className={`trash-note-purge ${daysLeft <= 3 ? "soon" : ""}`}>
            {daysLeft === 0
              ? t("_pages:trash.purgeToday")
              : t("_pages:trash.purgeIn", { count: daysLeft })}
          </span>
        </p>
        <div className="trash-note-actions">
          <Tooltip label={restoreLabel}>
            <IconButton
              color="primary"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={restoreLabel}
              disabled={disabled}
              onClick={() => onRestore(id)}
              icon={<FontAwesomeIcon icon={faRotateLeft} />}
            />
          </Tooltip>
          <Tooltip label={deleteLabel} align="end">
            <IconButton
              color="error"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={deleteLabel}
              disabled={disabled}
              onClick={() => onDelete(id)}
              icon={<FontAwesomeIcon icon={faTrash} />}
            />
          </Tooltip>
        </div>
      </footer>
    </article>
  );
}

export default TrashNote;
