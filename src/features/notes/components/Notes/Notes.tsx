import { useState } from "react";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";
import { useIsMutating } from "@tanstack/react-query";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { Spinner } from "@sito/ui";

// providers
import { useSearch } from "@/features/notes/providers/SearchProvider";
import { useCache } from "@/features/notes/providers/CacheProvider";

// hooks
import {
  ADD_NOTE_MUTATION_KEY,
  useAddNote,
} from "@/features/notes/hooks/useAddNote";
import { useRemoveNote } from "@/features/notes/hooks/useRemoveNote";

// components
import { FAB } from "@/shared/components/atoms/FAB";
import { Syncing } from "@/shared/components/atoms/Syncing";
import { RemoveNoteDialog } from "@/features/notes/components/RemoveNoteDialog";

// styles
import "./styles.css";

// lazy
const PreviewNote = loadable(
  () => import("@/features/notes/components/PreviewNote/PreviewNote"),
);

function Notes() {
  const { t } = useTranslation();

  const { searchFunction } = useSearch();

  const { cache, isLoading, isSyncing } = useCache();

  // Note waiting for the user to confirm the move to the trash
  const [toRemove, setToRemove] = useState<number | null>(null);
  const removeNote = useRemoveNote({ onRemoved: () => setToRemove(null) });

  const addNote = useAddNote();
  // Any add button (this FAB or the mobile bottom navigation)
  const isAdding = useIsMutating({ mutationKey: ADD_NOTE_MUTATION_KEY }) > 0;

  return (
    <section className="notes">
      <div
        className={`notes-syncing ${
          isSyncing || isAdding || removeNote.isPending ? "visible" : ""
        }`}
      >
        <Syncing />
      </div>
      <FAB
        onClick={() => addNote.mutate()}
        disabled={isAdding}
        position="bottom-right"
        aria-label={t("_accessibility:buttons.add")}
        icon={<FontAwesomeIcon icon={faAdd} />}
        color="secondary"
        className="notes-fab"
      />
      {isLoading
        ? [1, 2, 3, 4, 5].map((skeleton) => (
            <div key={skeleton} className="notes-skeleton skeleton-box" />
          ))
        : cache
            ?.filter(searchFunction)
            ?.map((note) => (
              <PreviewNote key={note.id} note={note} onDelete={setToRemove} />
            ))}
      <div
        className={`notes-spinner primary ${
          isLoading || isAdding || removeNote.isPending ? "visible" : ""
        }`}
      >
        <Spinner />
      </div>
      <RemoveNoteDialog
        open={toRemove !== null}
        onConfirm={() => toRemove !== null && removeNote.mutate(toRemove)}
        onClose={() => setToRemove(null)}
        isLoading={removeNote.isPending}
      />
    </section>
  );
}

export default Notes;
