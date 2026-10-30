import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";
import { useIsMutating, useMutation } from "@tanstack/react-query";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { useToast, Spinner } from "@sito/ui";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { getRequestErrorKey } from "@/shared/lib/errors";
import { useSearch } from "@/features/notes/providers/SearchProvider";
import { useCache } from "@/features/notes/providers/CacheProvider";

// hooks
import {
  ADD_NOTE_MUTATION_KEY,
  useAddNote,
} from "@/features/notes/hooks/useAddNote";

// components
import { FAB } from "@/shared/components/atoms/FAB";
import { Syncing } from "@/shared/components/atoms/Syncing";

// styles
import "./styles.css";

// lazy
const PreviewNote = loadable(
  () => import("@/features/notes/components/PreviewNote/PreviewNote"),
);

function Notes() {
  const { t } = useTranslation();

  const { searchFunction } = useSearch();

  const toast = useToast();

  const appApiClient = useAppApiClient();

  const { cache, refresh, isLoading, isSyncing } = useCache();

  const removeNote = useMutation({
    mutationFn: (noteId: number) => appApiClient.Note.remove([noteId]),
    onSuccess: () => {
      refresh();
      toast({ message: t("_pages:home.notes.deleted"), color: "success" });
    },
    onError: (mutationError) => {
      console.error(mutationError);
      toast({ message: t(getRequestErrorKey(mutationError)), color: "error" });
    },
  });

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
              <PreviewNote
                key={note.id}
                note={note}
                onDelete={(id) => removeNote.mutate(id)}
              />
            ))}
      <div
        className={`notes-spinner primary ${
          isLoading || isAdding || removeNote.isPending ? "visible" : ""
        }`}
      >
        <Spinner />
      </div>
    </section>
  );
}

export default Notes;
