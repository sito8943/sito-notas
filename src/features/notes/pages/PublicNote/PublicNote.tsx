import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// @sito/ui
import { Button } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkSlash } from "@fortawesome/free-solid-svg-icons";

// routes
import { AppRoute, getNoteRoute } from "@/shared/routes";

// providers
import { useAccount } from "@/features/auth";

// components
import { LogoMark } from "@/shared/components/atoms/LogoMark";
import { ThemeToggle } from "@/shared/components/molecules/ThemeToggle";
import { NoteEditor } from "@/features/notes/components/NoteEditor";

// hooks
import { usePublicNote } from "@/features/notes/hooks/usePublicNote";

// utils
import { formatNoteDate } from "@/features/notes/utils";

import "./styles.css";

/** A note opened through its public link: read only, no account needed */
function PublicNote() {
  const { token } = useParams();
  const { t, i18n } = useTranslation();
  const { note, isLoading, notFound, isError } = usePublicNote(token);
  const { account } = useAccount();

  // Owner or shared user: open it in the app; signed in: their notes;
  // otherwise sign in
  const action =
    note?.noteId !== undefined
      ? {
          to: getNoteRoute(note.noteId),
          label: t("_pages:publicNote.openNote"),
        }
      : account.user
        ? { to: AppRoute.Home, label: t("_pages:publicNote.myNotes") }
        : { to: AppRoute.Auth, label: t("_pages:publicNote.signIn") };

  const title = note?.title || t("_pages:home.notes.untitled");

  return (
    <div className="public-note">
      <header className="public-note-header">
        <Link to={AppRoute.Home} className="public-note-brand">
          <LogoMark className="public-note-logo" />
          <span className="public-note-app">{t("_accessibility:appName")}</span>
        </Link>
        <div className="public-note-actions">
          <ThemeToggle />
          <Button
            as={Link}
            to={action.to}
            variant="outlined"
            color="primary"
            className="public-note-action"
          >
            {action.label}
          </Button>
        </div>
      </header>
      <main className="public-note-body appear">
        {isLoading ? (
          <>
            <div className="public-note-title-skeleton skeleton-box" />
            <div className="public-note-content-skeleton skeleton-box" />
          </>
        ) : notFound || isError || !note ? (
          <div className="public-note-missing">
            <FontAwesomeIcon
              icon={faLinkSlash}
              className="public-note-missing-icon"
            />
            <p>
              {notFound
                ? t("_pages:publicNote.notFound")
                : t("_accessibility:errors.unknown")}
            </p>
          </div>
        ) : (
          <>
            <div className="public-note-heading">
              <h1 className="public-note-title">{title}</h1>
              <p className="public-note-meta">
                {t("_pages:publicNote.by", { name: note.ownerName })} ·{" "}
                {t("_pages:publicNote.updated", {
                  date: formatNoteDate(note.updatedAt, i18n.language),
                })}
              </p>
            </div>
            <NoteEditor
              content={note.content}
              onChange={() => undefined}
              placeholder=""
              label={t("_pages:publicNote.contentLabel")}
              readOnly
            />
          </>
        )}
      </main>
    </div>
  );
}

export default PublicNote;
