import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// routes
import { AppRoute } from "@/shared/routes";

// @sito/ui
import { useDialog } from "@sito/ui";

// components
import { Syncing } from "@/shared/components/atoms/Syncing";
import { RemoveNoteDialog } from "@/features/notes/components/RemoveNoteDialog";
import { NoteHeader } from "@/features/notes/components/NoteHeader";
import { NoteMeta } from "@/features/notes/components/NoteMeta";
import {
  NoteEditor,
  NoteEditorMode,
  type NoteEditorModeValue,
} from "@/features/notes/components/NoteEditor";

// hooks
import { useEscapeKey } from "@/shared/hooks";
import {
  NoteSaveStatus,
  toNoteId,
  useNoteEditor,
} from "@/features/notes/hooks/useNoteEditor";
import { useRemoveNote } from "@/features/notes/hooks/useRemoveNote";
import { useShareNote } from "@/features/notes/hooks/useShareNote";
import { useToggleFavorite } from "@/features/notes/hooks/useToggleFavorite";

// styles
import "./styles.css";

function Note() {
  const { id } = useParams();
  const noteId = toNoteId(id);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    note,
    isLoading,
    notFound,
    title,
    content,
    setTitle,
    setContent,
    status,
    discard,
  } = useNoteEditor(noteId);

  const [mode, setMode] = useState<NoteEditorModeValue>(NoteEditorMode.Rich);

  // Escape: Markdown source back to the editor, then out of the note
  useEscapeKey(() => {
    if (mode === NoteEditorMode.Markdown) setMode(NoteEditorMode.Rich);
    else navigate(AppRoute.Home);
  });

  const removeDialog = useDialog();
  const share = useShareNote();
  const toggleFavorite = useToggleFavorite();
  const removeNote = useRemoveNote({
    onRemoved: () => navigate(AppRoute.Home),
  });

  const displayTitle = title || t("_pages:home.notes.untitled");
  const placeholder = t("_pages:note.contentPlaceholder");
  const contentLabel = t("_pages:note.contentLabel");

  const remove = () => {
    if (!note) return;
    discard();
    removeNote.mutate(note.id);
  };

  return (
    <main className="note">
      <NoteHeader
        title={note ? displayTitle : ""}
        mode={mode}
        onModeChange={setMode}
        favorite={note?.favorite ?? false}
        onToggleFavorite={() =>
          note &&
          toggleFavorite.mutate({ id: note.id, favorite: !note.favorite })
        }
        onShare={() => share(displayTitle, content)}
        onRemove={removeDialog.handleOpen}
        disabled={!note}
      />
      <div
        className={`note-syncing ${
          isLoading || status === NoteSaveStatus.Saving || removeNote.isPending
            ? "visible"
            : ""
        }`}
      >
        <Syncing />
      </div>
      <RemoveNoteDialog
        open={removeDialog.open}
        onConfirm={remove}
        onClose={removeDialog.handleClose}
        isLoading={removeNote.isPending}
      />
      <div className="note-scroll">
        <div className="note-body appear">
          {notFound ? (
            <p className="note-not-found">{t("_pages:note.notFound")}</p>
          ) : isLoading || !note ? (
            <>
              <div className="note-title-skeleton skeleton-box" />
              <div className="note-content-skeleton skeleton-box" />
            </>
          ) : (
            <>
              <div className="note-heading">
                <input
                  value={title}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setTitle(event.target.value)
                  }
                  placeholder={t("_pages:note.titlePlaceholder")}
                  aria-label={t("_pages:note.titleLabel")}
                  className="note-title"
                />
                <NoteMeta updatedAt={note.updatedAt} status={status} />
              </div>
              {mode === NoteEditorMode.Markdown ? (
                <textarea
                  value={content}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(event.target.value)
                  }
                  placeholder={placeholder}
                  aria-label={contentLabel}
                  spellCheck
                  className="note-source"
                />
              ) : (
                <NoteEditor
                  key={note.id}
                  content={content}
                  onChange={setContent}
                  placeholder={placeholder}
                  label={contentLabel}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Note;
