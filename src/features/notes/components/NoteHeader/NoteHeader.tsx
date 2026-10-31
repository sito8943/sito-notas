import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// @sito/ui
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  ICON_BUTTON_SIZES,
  IconButton,
  Tooltip,
  useContextMenu,
} from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faEllipsis,
  faHeart as faHeartSolid,
  faPen,
  faShareNodes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";

// routes
import { AppRoute } from "@/shared/routes";

// components
import { NoteEditorMode } from "@/features/notes/components/NoteEditor";

import { MENU_OFFSET_PX } from "./constants";
import type { NoteHeaderProps } from "./types";
import "./styles.css";

/** Top bar of the note page: breadcrumb and note actions */
function NoteHeader(props: NoteHeaderProps) {
  const {
    title,
    mode,
    onModeChange,
    favorite,
    onToggleFavorite,
    onShare,
    onRemove,
    disabled = false,
  } = props;

  const { t } = useTranslation();
  const menu = useContextMenu<null>();

  const isMarkdown = mode === NoteEditorMode.Markdown;

  const shareLabel = t("_accessibility:ariaLabels.share");
  const moreLabel = t("_pages:note.more");

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    menu.openAt(rect.right, rect.bottom + MENU_OFFSET_PX, null);
  };

  const choose = (action: () => void) => () => {
    action();
    menu.close();
  };

  return (
    <header className="note-header">
      <nav aria-label={t("_pages:note.breadcrumb")} className="note-header-nav">
        <ol className="note-header-crumbs">
          <li>
            <Link to={AppRoute.Home} className="note-header-crumb-link">
              {t("_pages:note.notes")}
            </Link>
          </li>
          <li aria-hidden="true" className="note-header-crumb-separator">
            <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li aria-current="page" className="note-header-crumb-current">
            {title}
          </li>
        </ol>
      </nav>
      {disabled ? null : (
        <div className="note-header-actions">
          <Tooltip label={shareLabel}>
            <IconButton
              size={ICON_BUTTON_SIZES.SM}
              aria-label={shareLabel}
              onClick={onShare}
              icon={<FontAwesomeIcon icon={faShareNodes} />}
              className="note-header-action"
            />
          </Tooltip>
          <Tooltip label={moreLabel} align="end">
            <IconButton
              size={ICON_BUTTON_SIZES.SM}
              aria-label={moreLabel}
              aria-haspopup="menu"
              aria-expanded={menu.open}
              onClick={openMenu}
              icon={<FontAwesomeIcon icon={faEllipsis} />}
              className="note-header-action"
            />
          </Tooltip>
          <ContextMenu
            open={menu.open}
            position={menu.position}
            onClose={menu.close}
            ariaLabel={moreLabel}
          >
            <ContextMenuItem
              leading={
                <FontAwesomeIcon icon={favorite ? faHeartSolid : faHeart} />
              }
              onClick={choose(onToggleFavorite)}
            >
              {favorite
                ? t("_accessibility:ariaLabels.unfavorite")
                : t("_accessibility:ariaLabels.favorite")}
            </ContextMenuItem>
            <ContextMenuItem
              leading={
                <FontAwesomeIcon icon={isMarkdown ? faPen : faMarkdown} />
              }
              onClick={choose(() =>
                onModeChange(
                  isMarkdown ? NoteEditorMode.Rich : NoteEditorMode.Markdown,
                ),
              )}
            >
              {isMarkdown
                ? t("_pages:note.richText")
                : t("_pages:note.markdown")}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              leading={<FontAwesomeIcon icon={faTrash} />}
              onClick={choose(onRemove)}
              className="note-header-remove"
            >
              {t("_pages:trash.moveToTrash")}
            </ContextMenuItem>
          </ContextMenu>
        </div>
      )}
    </header>
  );
}

export default NoteHeader;
