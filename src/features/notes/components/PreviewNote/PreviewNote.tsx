import { memo, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getNoteRoute } from "@/shared/routes";
import { useTranslation } from "react-i18next";

// @sito/ui
import { IconButton } from "@sito/ui";

import { marked } from "marked";

// icons
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PREVIEW_CONTENT_LENGTH, PREVIEW_DATE_FORMAT } from "./constants";
import type { PreviewNoteProps } from "./types";

import "./styles.css";

function PreviewNote(props: PreviewNoteProps) {
  const { id, title, content, updatedAt, onDelete } = props;

  const { t } = useTranslation();

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current)
      contentRef.current.innerHTML = marked.parse(
        content.substring(0, PREVIEW_CONTENT_LENGTH),
        { async: false },
      );
  }, [contentRef, content]);

  const parsedLastDate = useMemo(() => {
    const date = new Date(updatedAt);
    return date.toLocaleDateString("en-US", PREVIEW_DATE_FORMAT);
  }, [updatedAt]);

  return (
    <div className="preview-note appear card-shadow">
      <div className="preview-note-header">
        <Link to={getNoteRoute(id)} className="preview-note-link">
          <div>
            <h3>{title || "Nota sin título"}</h3>
            <p className="preview-note-date">{parsedLastDate}</p>
          </div>
        </Link>
        <IconButton
          icon={<FontAwesomeIcon icon={faTrash} />}
          color="primary"
          aria-label={t("_accessibility:buttons.remove")}
          onClick={() => onDelete(id)}
        />
      </div>

      <hr className="card-divider" />
      <div ref={contentRef} className="preview-note-content" />
      <div className="card-overflow-background"></div>
    </div>
  );
}

const PreviewNoteMemo = memo(
  (props: PreviewNoteProps) => <PreviewNote {...props} />,
  (oldProps, newProps) =>
    oldProps.id === newProps.id &&
    oldProps.content === newProps.content &&
    oldProps.title === newProps.title &&
    oldProps.updatedAt === newProps.updatedAt,
);

PreviewNoteMemo.displayName = "PreviewNote";

export default PreviewNoteMemo;
