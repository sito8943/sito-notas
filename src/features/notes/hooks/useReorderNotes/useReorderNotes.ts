import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// utils
import { queryClient } from "@/shared/lib/queryClient";
import { getRequestErrorKey } from "@/shared/lib/errors";
import { getNotesListKey } from "@/features/notes/constants";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useAccount } from "@/features/auth";

// models
import type { Note } from "@/features/notes/models";

import { applyOrder } from "./utils";

/**
 * Saves a new manual order of the notes. The list changes at once and rolls
 * back if the server rejects it.
 * @returns mutation taking every active note id, top first
 */
function useReorderNotes() {
  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const listKey = getNotesListKey(account.user?.id);

  return useMutation({
    mutationFn: (ids: number[]) => appApiClient.Note.reorder(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previous = queryClient.getQueryData<Note[]>(listKey);
      queryClient.setQueryData<Note[]>(listKey, (notes) =>
        applyOrder(notes, ids),
      );
      return { previous };
    },
    onError: (mutationError, _ids, context) => {
      console.error(mutationError);
      queryClient.setQueryData(listKey, context?.previous);
      toast({ message: t(getRequestErrorKey(mutationError)), color: "error" });
    },
  });
}

export default useReorderNotes;
