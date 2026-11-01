import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { Select } from "@/shared/components/molecules/Select";

// hooks
import { useNoteLink } from "@/features/notes/hooks/useNoteLink";

import { GENERAL_ACCESS_OPTIONS, GeneralAccess } from "./constants";
import type { GeneralAccessValue, ShareGeneralAccessProps } from "./types";
import "./styles.css";

/**
 * Share dialog part, as in Google Docs: restricted to the people with
 * access, or readable by anyone with the public link
 */
function ShareGeneralAccess({ noteId }: ShareGeneralAccessProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const { token, isLoading, create, remove } = useNoteLink(noteId);

  const value: GeneralAccessValue = token
    ? GeneralAccess.Public
    : GeneralAccess.Restricted;
  const current =
    GENERAL_ACCESS_OPTIONS.find((option) => option.value === value) ??
    GENERAL_ACCESS_OPTIONS[0];
  const busy = create.isPending || remove.isPending;

  const options = GENERAL_ACCESS_OPTIONS.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));

  const change = (next: GeneralAccessValue) => {
    if (next === GeneralAccess.Public) {
      create.mutate();
      return;
    }
    // Turning it on again gives a new token, so old links die
    remove.mutate(undefined, {
      onSuccess: () =>
        toast({ message: t("_pages:share.link.turnedOff"), color: "warning" }),
    });
  };

  return (
    <section className="share-access">
      <h3 className="share-access-title">{t("_pages:share.link.title")}</h3>
      {isLoading ? (
        <div className="share-access-skeleton skeleton-box" />
      ) : (
        <div className="share-access-row">
          <span
            aria-hidden="true"
            className={`share-access-icon ${value === GeneralAccess.Public ? "public" : ""}`}
          >
            <FontAwesomeIcon icon={current.icon} />
          </span>
          <div className="share-access-text">
            <Select
              value={value}
              options={options}
              onChange={change}
              label={t("_pages:share.link.label")}
              disabled={busy || noteId === null}
              className="share-access-select"
            />
            <p className="share-access-hint">{t(current.hintKey)}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ShareGeneralAccess;
