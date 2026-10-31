import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// @sito/ui
import { ICON_BUTTON_SIZES, IconButton, Tooltip } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faShareNodes,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

// routes
import { getNoteRoute } from "@/shared/routes";

// utils
import { formatNoteDate } from "@/features/notes/utils";

// hooks
import { useShareNote } from "@/features/notes/hooks/useShareNote";
import { useToggleFavorite } from "@/features/notes/hooks/useToggleFavorite";

import type { PreviewNoteProps } from "./types";
import { toExcerpt } from "./utils";
import "./styles.css";

function PreviewNote(props: PreviewNoteProps) {
  const { note, onDelete } = props;
  const { id, title, content, categories, favorite, updatedAt } = note;

  const { t, i18n } = useTranslation();
  const shareNote = useShareNote();
  const toggleFavorite = useToggleFavorite();

  const excerpt = useMemo(() => toExcerpt(content), [content]);
  const date = formatNoteDate(updatedAt, i18n.language);
  const [tag] = categories;
  const displayTitle = title || t("_pages:home.notes.untitled");

  const favoriteLabel = favorite
    ? t("_accessibility:ariaLabels.unfavorite")
    : t("_accessibility:ariaLabels.favorite");
  const shareLabel = t("_accessibility:ariaLabels.share");
  const removeLabel = t("_pages:trash.moveToTrash");

  return (
    <article className="preview-note appear">
      <Link to={getNoteRoute(id)} className="preview-note-link">
        <h3 className="preview-note-title">{displayTitle}</h3>
        {excerpt ? <p className="preview-note-excerpt">{excerpt}</p> : null}
      </Link>
      <p className="preview-note-date">{date}</p>
      <footer className="preview-note-footer">
        {tag ? (
          <span className="preview-note-tag">
            <FontAwesomeIcon
              icon={faTag}
              style={tag.color ? { color: tag.color } : undefined}
            />
            <span className="preview-note-tag-name">{tag.name}</span>
          </span>
        ) : (
          <span />
        )}
        <div className="preview-note-actions">
          <Tooltip label={shareLabel}>
            <IconButton
              color="primary"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={shareLabel}
              onClick={() => shareNote(displayTitle, content)}
              icon={<FontAwesomeIcon icon={faShareNodes} />}
            />
          </Tooltip>
          <Tooltip label={favoriteLabel}>
            <IconButton
              color="primary"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={favoriteLabel}
              aria-pressed={favorite}
              onClick={() => toggleFavorite.mutate({ id, favorite: !favorite })}
              icon={
                <FontAwesomeIcon icon={favorite ? faHeartSolid : faHeart} />
              }
            />
          </Tooltip>
          <Tooltip label={removeLabel} align="end">
            <IconButton
              color="error"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={removeLabel}
              onClick={() => onDelete(id)}
              icon={<FontAwesomeIcon icon={faTrash} />}
            />
          </Tooltip>
        </div>
      </footer>
    </article>
  );
}

// React Query keeps unchanged notes as the same object: compare by reference
const PreviewNoteMemo = memo(
  PreviewNote,
  (oldProps, newProps) => oldProps.note === newProps.note,
);

export default PreviewNoteMemo;
