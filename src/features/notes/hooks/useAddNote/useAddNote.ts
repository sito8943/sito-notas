import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { getRequestErrorKey } from "@/shared/lib/errors";
import { useCache } from "@/features/notes/providers/CacheProvider";

import { ADD_NOTE_MUTATION_KEY } from "./constants";
import type { UseAddNoteOptions } from "./types";

/**
 * Creates a note with the default title and content, then refreshes the list
 * @param options - optional callback with the new note id
 * @returns the mutation
 */
function useAddNote(options: UseAddNoteOptions = {}) {
  const { onCreated } = options;

  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();
  const { refresh } = useCache();

  return useMutation({
    mutationKey: ADD_NOTE_MUTATION_KEY,
    mutationFn: () =>
      appApiClient.Note.create({
        title: t("_pages:home.notes.defaultTitle"),
        content: t("_pages:home.notes.defaultContent"),
      }),
    onSuccess: (id) => {
      refresh();
      onCreated?.(id);
    },
    onError: (mutationError) => {
      console.error(mutationError);
      toast({ message: t(getRequestErrorKey(mutationError)), color: "error" });
    },
  });
}

export default useAddNote;
