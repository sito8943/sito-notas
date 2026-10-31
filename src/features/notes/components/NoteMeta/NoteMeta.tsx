import { useTranslation } from "react-i18next";

// utils
import { formatNoteDate } from "@/features/notes/utils";

import { SAVE_STATUS_LABEL_KEYS } from "./constants";
import type { NoteMetaProps } from "./types";
import "./styles.css";

/** "Updated today · Saved" under the note title */
function NoteMeta({ updatedAt, status }: NoteMetaProps) {
  const { t, i18n } = useTranslation();

  const statusKey = SAVE_STATUS_LABEL_KEYS[status];

  return (
    <p className="note-meta">
      <span>
        {t("_pages:note.updated", {
          date: formatNoteDate(updatedAt, i18n.language),
        })}
      </span>
      {/* Announced to screen readers when the save status changes */}
      <span role="status" className={`note-meta-status ${status}`}>
        {statusKey ? t(statusKey) : null}
      </span>
    </p>
  );
}

export default NoteMeta;
