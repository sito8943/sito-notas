import { useState } from "react";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";
import { useMutation } from "@tanstack/react-query";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { useToast, Spinner } from "@sito/ui";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useSearch } from "@/features/notes/providers/SearchProvider";
import { useCache } from "@/features/notes/providers/CacheProvider";

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

  const [error, setError] = useState<Error | null>(null);
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
      toast({ message: mutationError.message, color: "error" });
    },
  });

  const addNote = useMutation({
    mutationFn: () =>
      appApiClient.Note.create({
        title: t("_pages:home.notes.defaultTitle"),
        content: t("_pages:home.notes.defaultContent"),
      }),
    onSuccess: () => refresh(),
    onError: (mutationError) => {
      console.error(mutationError);
      setError(mutationError);
    },
  });

  return (
    <section className="notes">
      <div
        className={`notes-syncing ${
          isSyncing || addNote.isPending || removeNote.isPending
            ? "visible"
            : ""
        }`}
      >
        <Syncing />
      </div>
      {!error ? (
        <FAB
          onClick={() => addNote.mutate()}
          position="bottom-right"
          aria-label={t("_accessibility:buttons.add")}
          icon={<FontAwesomeIcon icon={faAdd} />}
          color="secondary"
          className="notes-fab"
        />
      ) : null}
      {isLoading
        ? [1, 2, 3, 4, 5].map((skeleton) => (
            <div key={skeleton} className="notes-skeleton skeleton-box" />
          ))
        : cache
            ?.filter(searchFunction)
            ?.map((note) => (
              <PreviewNote
                key={note.id}
                {...note}
                onDelete={(id) => removeNote.mutate(id)}
              />
            ))}
      <div
        className={`notes-spinner primary ${
          isLoading || addNote.isPending || removeNote.isPending
            ? "visible"
            : ""
        }`}
      >
        <Spinner />
      </div>
    </section>
  );
}

export default Notes;
