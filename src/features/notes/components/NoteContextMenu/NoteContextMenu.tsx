import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// @sito/ui
import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faHeart as faHeartSolid,
  faShareNodes,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

// routes
import { getNoteRoute } from "@/shared/routes";

// hooks
import { useToggleFavorite } from "@/features/notes/hooks/useToggleFavorite";

import type { NoteContextMenuProps } from "./types";
import "./styles.css";

/**
 * Actions of a note card (right click, wide screens): open, share,
 * favorite, add to tag and move to trash
 */
function NoteContextMenu(props: NoteContextMenuProps) {
  const { open, position, note, onClose, onAddTags, onShare, onDelete } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const toggleFavorite = useToggleFavorite();

  const choose = (action: () => void) => () => {
    action();
    onClose();
  };

  const title = note?.title || t("_pages:home.notes.untitled");

  return (
    <ContextMenu
      open={open && note !== null}
      position={position}
      onClose={onClose}
      ariaLabel={t("_pages:note.actions", { title })}
    >
      {note ? (
        <>
          <ContextMenuItem
            leading={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
            onClick={choose(() => navigate(getNoteRoute(note.id)))}
          >
            {t("_pages:note.open")}
          </ContextMenuItem>
          <ContextMenuItem
            leading={<FontAwesomeIcon icon={faShareNodes} />}
            onClick={choose(() => onShare(note))}
          >
            {t("_accessibility:ariaLabels.share")}
          </ContextMenuItem>
          <ContextMenuItem
            leading={
              <FontAwesomeIcon icon={note.favorite ? faHeartSolid : faHeart} />
            }
            onClick={choose(() =>
              toggleFavorite.mutate({ id: note.id, favorite: !note.favorite }),
            )}
          >
            {note.favorite
              ? t("_accessibility:ariaLabels.unfavorite")
              : t("_accessibility:ariaLabels.favorite")}
          </ContextMenuItem>
          <ContextMenuItem
            leading={<FontAwesomeIcon icon={faTag} />}
            onClick={choose(() => onAddTags(note))}
          >
            {t("_pages:tags.addToTag")}
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            leading={<FontAwesomeIcon icon={faTrash} />}
            onClick={choose(() => onDelete(note.id))}
            className="note-context-menu-remove"
          >
            {t("_pages:trash.moveToTrash")}
          </ContextMenuItem>
        </>
      ) : null}
    </ContextMenu>
  );
}

export default NoteContextMenu;
