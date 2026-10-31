import { memo } from "react";
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

// components
import { MarkdownPreview } from "@/features/notes/components/MarkdownPreview";

// components
import { TagChip } from "@/features/notes/components/TagChip";

// constants
import { CARD_MAX_TAGS } from "@/features/notes/constants";

// hooks
import { useShareNote } from "@/features/notes/hooks/useShareNote";
import { useToggleFavorite } from "@/features/notes/hooks/useToggleFavorite";

import type { PreviewNoteProps } from "./types";
import "./styles.css";

function PreviewNote(props: PreviewNoteProps) {
  const { note, onDelete, onAddTags } = props;
  const { id, title, content, categories, favorite, updatedAt } = note;

  const { t, i18n } = useTranslation();
  const shareNote = useShareNote();
  const toggleFavorite = useToggleFavorite();

  const date = formatNoteDate(updatedAt, i18n.language);
  const shownTags = categories.slice(0, CARD_MAX_TAGS);
  const hiddenTags = categories.length - shownTags.length;
  const displayTitle = title || t("_pages:home.notes.untitled");

  const favoriteLabel = favorite
    ? t("_accessibility:ariaLabels.unfavorite")
    : t("_accessibility:ariaLabels.favorite");
  const shareLabel = t("_accessibility:ariaLabels.share");
  const removeLabel = t("_pages:trash.moveToTrash");
  const addTagLabel = t("_pages:tags.addToTag");

  return (
    <article className="preview-note appear sito-ui-pressable">
      <Link to={getNoteRoute(id)} className="preview-note-link">
        <h3 className="preview-note-title">{displayTitle}</h3>
        <MarkdownPreview content={content} />
      </Link>
      <p className="preview-note-date">{date}</p>
      <footer className="preview-note-footer">
        <div className="preview-note-tags">
          {shownTags.map((tag) => (
            <TagChip key={tag.id} tag={tag} className="preview-note-tag" />
          ))}
          {hiddenTags > 0 ? (
            <span
              className="preview-note-more-tags"
              title={categories
                .slice(CARD_MAX_TAGS)
                .map((tag) => tag.name)
                .join(", ")}
            >
              +{hiddenTags}
            </span>
          ) : null}
        </div>
        <div className="preview-note-actions">
          <Tooltip label={addTagLabel} className="preview-note-add-tag">
            <IconButton
              color="primary"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={addTagLabel}
              onClick={() => onAddTags(id)}
              icon={<FontAwesomeIcon icon={faTag} />}
            />
          </Tooltip>
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
