import { useTranslation } from "react-i18next";

// @sito/ui
import { Button, useToast } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faLink } from "@fortawesome/free-solid-svg-icons";

// routes
import { getAbsoluteRoute, getPublicNoteRoute } from "@/shared/routes";

// hooks
import { useNoteLink } from "@/features/notes/hooks/useNoteLink";

import type { ShareLinkSectionProps } from "./types";
import "./styles.css";

/** Share dialog part: create, copy or turn off the public read-only link */
function ShareLinkSection({ noteId }: ShareLinkSectionProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const { token, isLoading, create, remove } = useNoteLink(noteId);

  const url = token ? getAbsoluteRoute(getPublicNoteRoute(token)) : "";
  const busy = create.isPending || remove.isPending;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ message: t("_pages:share.link.copied"), color: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="share-link">
      <h3 className="share-link-title">{t("_pages:share.link.title")}</h3>
      {isLoading ? (
        <div className="share-link-skeleton skeleton-box" />
      ) : token ? (
        <>
          <div className="share-link-row">
            <input
              readOnly
              value={url}
              onFocus={(event) => event.target.select()}
              aria-label={t("_pages:share.link.urlLabel")}
              className="share-link-url"
            />
            <Button
              type="button"
              variant="submit"
              color="primary"
              onClick={() => void copy()}
              aria-label={t("_pages:share.link.copy")}
              className="share-link-copy"
            >
              <FontAwesomeIcon icon={faCopy} />
              <span className="share-link-copy-label">
                {t("_pages:share.link.copy")}
              </span>
            </Button>
          </div>
          <div className="share-link-footer">
            <p className="share-link-hint">{t("_pages:share.link.off")}</p>
            <Button
              type="button"
              variant="text"
              color="error"
              disabled={busy}
              onClick={() => remove.mutate()}
              aria-label={t("_pages:share.link.removeLabel")}
              className="share-link-remove"
            >
              {t("_pages:share.link.remove")}
            </Button>
          </div>
        </>
      ) : (
        <div className="share-link-footer">
          <p className="share-link-hint">{t("_pages:share.link.off")}</p>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            disabled={busy || noteId === null}
            onClick={() => create.mutate()}
            className="share-link-create"
          >
            <FontAwesomeIcon icon={faLink} />
            {t("_pages:share.link.create")}
          </Button>
        </div>
      )}
    </section>
  );
}

export default ShareLinkSection;
