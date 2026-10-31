import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { Button, Dialog, ICON_BUTTON_SIZES, IconButton } from "@sito/ui";

// components
import { SharePermissionSelect } from "@/features/notes/components/SharePermissionSelect";

// models
import {
  SharePermission,
  type SharePermissionValue,
} from "@/features/notes/models";

// hooks
import { useNoteShares } from "@/features/notes/hooks/useNoteShares";
import { useShareNote } from "@/features/notes/hooks/useShareNote";

import type { ShareNoteDialogProps } from "./types";
import { getShareInitial, getShareName, isSameNoteSummary } from "./utils";
import "./styles.css";

/**
 * Share a note with other Sito Notas users by email (view or edit), change
 * or remove who has access, or send a copy with the system share sheet.
 */
function ShareNoteDialog(props: ShareNoteDialogProps) {
  const { onClose } = props;
  const { t } = useTranslation();

  // Keeps the last note while the dialog animates out, so its people list
  // and title don't vanish (and resize it) on close
  const [note, setNote] = useState(props.note);
  if (props.note && !isSameNoteSummary(props.note, note)) setNote(props.note);
  const open = props.note !== null;
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<SharePermissionValue>(
    SharePermission.Read,
  );
  const {
    shares,
    isLoading,
    loadErrorKey,
    add,
    changePermission,
    remove,
    addErrorKey,
  } = useNoteShares(note?.id ?? null);
  const sendCopy = useShareNote();

  const title = note?.title || t("_pages:home.notes.untitled");
  const trimmed = email.trim();

  const close = () => {
    setEmail("");
    add.reset();
    onClose();
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!trimmed || add.isPending) return;
    add.mutate(
      { email: trimmed, permission },
      { onSuccess: () => setEmail("") },
    );
  };

  return (
    <Dialog
      closeIcon={<FontAwesomeIcon icon={faXmark} />}
      open={open}
      title={t("_pages:share.title", { title })}
      onClose={close}
      closeLabel={t("_accessibility:buttons.close")}
      closeOnBackdropClick
    >
      <div className="share-note">
        <form onSubmit={submit} className="share-note-form">
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (add.error) add.reset();
            }}
            placeholder={t("_pages:share.emailPlaceholder")}
            aria-label={t("_pages:share.emailLabel")}
            aria-invalid={addErrorKey !== null}
            className={`share-note-input ${addErrorKey ? "invalid" : ""}`}
          />
          <SharePermissionSelect
            value={permission}
            onChange={setPermission}
            label={t("_pages:share.permissionLabel")}
          />
          <Button
            type="submit"
            variant="submit"
            color="primary"
            disabled={!trimmed || add.isPending}
            aria-label={t("_pages:share.submit")}
            className="share-note-submit"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span className="share-note-submit-label">
              {t("_pages:share.submit")}
            </span>
          </Button>
        </form>
        {addErrorKey ? (
          <p className="share-note-error">{t(addErrorKey)}</p>
        ) : (
          <p className="share-note-hint">{t("_pages:share.hint")}</p>
        )}

        <section className="share-note-people">
          <h3 className="share-note-subtitle">{t("_pages:share.people")}</h3>
          {isLoading ? (
            <div className="share-note-skeleton skeleton-box" />
          ) : loadErrorKey ? (
            <p className="share-note-error">{t(loadErrorKey)}</p>
          ) : shares.length === 0 ? (
            <p className="share-note-empty">{t("_pages:share.onlyYou")}</p>
          ) : (
            <ul className="share-note-list">
              {shares.map((share) => {
                const name = getShareName(share);
                return (
                  <li key={share.userId} className="share-note-person">
                    <span aria-hidden="true" className="share-note-avatar">
                      {getShareInitial(share)}
                    </span>
                    <span className="share-note-person-text">
                      <span className="share-note-person-name">{name}</span>
                      {share.username ? (
                        <span className="share-note-person-email">
                          {share.email}
                        </span>
                      ) : null}
                    </span>
                    <SharePermissionSelect
                      value={share.permission}
                      onChange={(next) =>
                        changePermission.mutate({
                          userId: share.userId,
                          permission: next,
                        })
                      }
                      label={t("_pages:share.permissionFor", { name })}
                    />
                    <IconButton
                      size={ICON_BUTTON_SIZES.SM}
                      aria-label={t("_pages:share.remove", { name })}
                      onClick={() => remove.mutate(share.userId)}
                      icon={<FontAwesomeIcon icon={faXmark} />}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <footer className="share-note-footer">
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => note && sendCopy(title, note.content)}
            className="share-note-copy"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            {t("_pages:share.sendCopy")}
          </Button>
        </footer>
      </div>
    </Dialog>
  );
}

export default ShareNoteDialog;
