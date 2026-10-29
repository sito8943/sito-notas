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
        className={`w-10 h-10 z-20 bg-(--sito-ui-color-primary-default) text-(--sito-ui-color-primary-text) rounded-full fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
          isSyncing || addNote.isPending || removeNote.isPending
            ? "scale-100"
            : "scale-0"
        } pointer-events-none`}
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
          className="z-10 text-2xl p-6"
        />
      ) : null}
      {isLoading
        ? [1, 2, 3, 4, 5].map((skeleton) => (
            <div
              key={skeleton}
              className="w-full h-[300px] skeleton-box rounded-xl!"
            />
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
        className={`w-10 h-10 fixed bottom-1 left-1 flex items-center justify-center text-2xl primary transition-all duration-300 ease-in-out ${
          isLoading || addNote.isPending || removeNote.isPending
            ? "scale-100"
            : "scale-0"
        } pointer-events-none`}
      >
        <Spinner />
      </div>
    </section>
  );
}

export default Notes;
