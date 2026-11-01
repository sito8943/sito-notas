import { useTranslation } from "react-i18next";

// @sito/ui
import { Button, useToast } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

// routes
import {
  getAbsoluteRoute,
  getNoteRoute,
  getPublicNoteShareUrl,
} from "@/shared/routes";

// hooks
import { useNoteLink } from "@/features/notes/hooks/useNoteLink";

import type { ShareCopyLinkButtonProps } from "./types";
import "./styles.css";

/**
 * Copies the public link when the note has one; otherwise the note's app
 * URL, which opens for the people with access (as in Google Docs)
 */
function ShareCopyLinkButton({ noteId }: ShareCopyLinkButtonProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const { token, isLoading } = useNoteLink(noteId);

  const copy = async () => {
    if (noteId === null) return;
    const url = token
      ? getPublicNoteShareUrl(token)
      : getAbsoluteRoute(getNoteRoute(noteId));
    try {
      await navigator.clipboard.writeText(url);
      toast({ message: t("_pages:share.link.copied"), color: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      type="button"
      variant="outlined"
      color="primary"
      disabled={noteId === null || isLoading}
      onClick={() => void copy()}
      className="share-copy-link"
    >
      <FontAwesomeIcon icon={faLink} />
      {t("_pages:share.link.copy")}
    </Button>
  );
}

export default ShareCopyLinkButton;
