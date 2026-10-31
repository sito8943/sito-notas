import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// utils
import { queryClient } from "@/shared/lib/queryClient";
import { getRequestErrorKey } from "@/shared/lib/errors";
import { getNoteDetailKey, getNotesListKey } from "@/features/notes/constants";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useAccount } from "@/features/auth";

// models
import type { Note } from "@/features/notes/models";
import type { SetFavoriteInput } from "@/features/notes/services";

import { withFavorite } from "./utils";

/**
 * Marks or unmarks a note as favorite. The list and the open note change at
 * once and roll back if the server rejects it.
 * @returns the mutation
 */
function useToggleFavorite() {
  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const listKey = getNotesListKey(account.user?.id);

  return useMutation({
    mutationFn: (input: SetFavoriteInput) =>
      appApiClient.Note.setFavorite(input),
    onMutate: async ({ id, favorite }) => {
      const detailKey = getNoteDetailKey(id);
      await queryClient.cancelQueries({ queryKey: listKey });
      await queryClient.cancelQueries({ queryKey: detailKey });
      const previous = queryClient.getQueryData<Note[]>(listKey);
      const previousDetail = queryClient.getQueryData<Note>(detailKey);
      queryClient.setQueryData<Note[]>(listKey, (notes) =>
        withFavorite(notes, id, favorite),
      );
      queryClient.setQueryData<Note>(detailKey, (note) =>
        note ? { ...note, favorite } : note,
      );
      return { previous, previousDetail };
    },
    onError: (mutationError, { id }, context) => {
      console.error(mutationError);
      queryClient.setQueryData(listKey, context?.previous);
      queryClient.setQueryData(getNoteDetailKey(id), context?.previousDetail);
      toast({ message: t(getRequestErrorKey(mutationError)), color: "error" });
    },
  });
}

export default useToggleFavorite;
