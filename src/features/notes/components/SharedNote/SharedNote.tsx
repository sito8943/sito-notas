import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// routes
import { getNoteRoute } from "@/shared/routes";

// utils
import { formatNoteDate, getOwnerName } from "@/features/notes/utils";

// components
import { MarkdownPreview } from "@/features/notes/components/MarkdownPreview";

import type { SharedNoteProps } from "./types";
import "./styles.css";

/** Card of a note shared with the user: preview, owner and last edit */
function SharedNote({ note }: SharedNoteProps) {
  const { t, i18n } = useTranslation();

  const title = note.title || t("_pages:home.notes.untitled");
  const owner = note.owner ? getOwnerName(note.owner) : "";

  return (
    <article className="shared-note appear sito-ui-pressable">
      <Link to={getNoteRoute(note.id)} className="shared-note-link">
        <h3 className="shared-note-title">{title}</h3>
        <MarkdownPreview content={note.content} />
      </Link>
      <footer className="shared-note-footer">
        <span className="shared-note-owner" title={note.owner?.email}>
          <FontAwesomeIcon icon={faUser} className="shared-note-owner-icon" />
          <span className="shared-note-owner-name">
            {t("_pages:shared.from", { name: owner })}
          </span>
        </span>
        <span className="shared-note-date">
          {formatNoteDate(note.updatedAt, i18n.language)}
        </span>
      </footer>
    </article>
  );
}

export default SharedNote;
