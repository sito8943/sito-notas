import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// routes
import { AppRoute } from "@/shared/routes";

// components
import { Syncing } from "@/shared/components/atoms/Syncing";
import { NoteHeader } from "@/features/notes/components/NoteHeader";
import {
  NoteEditor,
  NoteEditorMode,
  type NoteEditorModeValue,
} from "@/features/notes/components/NoteEditor";

// hooks
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
        status={status}
        mode={mode}
        onModeChange={setMode}
        favorite={note?.favorite ?? false}
        onToggleFavorite={() =>
          note &&
          toggleFavorite.mutate({ id: note.id, favorite: !note.favorite })
        }
        onShare={() => share(displayTitle, content)}
        onRemove={remove}
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
              <input
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                placeholder={t("_pages:note.titlePlaceholder")}
                aria-label={t("_pages:note.titleLabel")}
                className="note-title"
              />
              {mode === NoteEditorMode.Markdown ? (
                <textarea
                  value={content}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
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
