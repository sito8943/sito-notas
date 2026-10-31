import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// @sito/ui
import { ICON_BUTTON_SIZES, IconButton, Tooltip } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHeart as faHeartSolid,
  faShareNodes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";

// routes
import { AppRoute } from "@/shared/routes";

// components
import { NoteEditorMode } from "@/features/notes/components/NoteEditor";

import { SAVE_STATUS_LABEL_KEYS } from "./constants";
import type { NoteHeaderProps } from "./types";
import "./styles.css";

/** Top bar of the note page: back, save status and note actions */
function NoteHeader(props: NoteHeaderProps) {
  const {
    status,
    mode,
    onModeChange,
    favorite,
    onToggleFavorite,
    onShare,
    onRemove,
    disabled = false,
  } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const statusKey = SAVE_STATUS_LABEL_KEYS[status];
  const isMarkdown = mode === NoteEditorMode.Markdown;

  const backLabel = t("_accessibility:buttons.back");
  const markdownLabel = t("_pages:note.markdown");
  const favoriteLabel = favorite
    ? t("_accessibility:ariaLabels.unfavorite")
    : t("_accessibility:ariaLabels.favorite");
  const shareLabel = t("_accessibility:ariaLabels.share");
  const removeLabel = t("_accessibility:buttons.remove");

  return (
    <header className="note-header">
      <Tooltip label={backLabel} align="start">
        <IconButton
          color="primary"
          aria-label={backLabel}
          onClick={() => navigate(AppRoute.Home)}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
        />
      </Tooltip>
      <p className={`note-header-status ${status}`} role="status">
        {statusKey ? t(statusKey) : null}
      </p>
      {disabled ? null : (
        <div className="note-header-actions">
          <Tooltip label={markdownLabel}>
            <IconButton
              color="primary"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={markdownLabel}
              aria-pressed={isMarkdown}
              onClick={() =>
                onModeChange(
                  isMarkdown ? NoteEditorMode.Rich : NoteEditorMode.Markdown,
                )
              }
              icon={<FontAwesomeIcon icon={faMarkdown} />}
              className={`note-header-toggle ${isMarkdown ? "active" : ""}`}
            />
          </Tooltip>
          <Tooltip label={favoriteLabel}>
            <IconButton
              color="primary"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={favoriteLabel}
              aria-pressed={favorite}
              onClick={onToggleFavorite}
              icon={
                <FontAwesomeIcon icon={favorite ? faHeartSolid : faHeart} />
              }
            />
          </Tooltip>
          <Tooltip label={shareLabel}>
            <IconButton
              color="primary"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={shareLabel}
              onClick={onShare}
              icon={<FontAwesomeIcon icon={faShareNodes} />}
            />
          </Tooltip>
          <Tooltip label={removeLabel} align="end">
            <IconButton
              color="error"
              size={ICON_BUTTON_SIZES.SM}
              aria-label={removeLabel}
              onClick={onRemove}
              icon={<FontAwesomeIcon icon={faTrash} />}
            />
          </Tooltip>
        </div>
      )}
    </header>
  );
}

export default NoteHeader;
