import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useCache } from "@/features/notes/providers/CacheProvider";

// utils
import { getRequestErrorKey } from "@/shared/lib/errors";

import type { UseRemoveNoteOptions } from "./types";

/**
 * Deletes a note, refreshes the list and tells the user
 * @param options - what to do once it is deleted
 * @returns the mutation (takes the note id)
 */
function useRemoveNote(options: UseRemoveNoteOptions = {}) {
  const { onRemoved } = options;

  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();
  const { refresh } = useCache();

  return useMutation({
    mutationFn: (noteId: number) => appApiClient.Note.remove([noteId]),
    onSuccess: () => {
      refresh();
      toast({ message: t("_pages:home.notes.deleted"), color: "success" });
      onRemoved?.();
    },
    onError: (mutationError) => {
      console.error(mutationError);
      toast({ message: t(getRequestErrorKey(mutationError)), color: "error" });
    },
  });
}

export default useRemoveNote;
