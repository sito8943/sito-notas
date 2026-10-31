import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// utils
import { queryClient } from "@/shared/lib/queryClient";
import { getRequestErrorKey } from "@/shared/lib/errors";
import { getNoteSharesKey } from "@/features/notes/constants";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// models
import type { NoteShare } from "@/features/notes/models";

import type { RemoveShareContext, UseNoteSharesResult } from "./types";
import { getShareErrorKey } from "./utils";

/**
 * Users a note is shared with: load, add by email and remove. Removing
 * changes the list at once and rolls back on error.
 * @param noteId - note being shared; null loads nothing
 * @returns the shares and both mutations
 */
function useNoteShares(noteId: number | null): UseNoteSharesResult {
  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();
  const sharesKey = getNoteSharesKey(noteId ?? 0);

  const query = useQuery({
    queryKey: sharesKey,
    queryFn: () => appApiClient.Note.listShares(noteId ?? 0),
    enabled: noteId !== null,
  });

  const add = useMutation({
    mutationFn: (email: string) =>
      appApiClient.Note.share({ noteId: noteId ?? 0, email }),
    onSuccess: (share) =>
      queryClient.setQueryData<NoteShare[]>(sharesKey, (shares) => [
        ...(shares ?? []),
        share,
      ]),
    onError: (mutationError) => console.error(mutationError),
  });

  const remove = useMutation<number, Error, number, RemoveShareContext>({
    mutationFn: (userId) =>
      appApiClient.Note.unshare({ noteId: noteId ?? 0, userId }),
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: sharesKey });
      const previous = queryClient.getQueryData<NoteShare[]>(sharesKey);
      queryClient.setQueryData<NoteShare[]>(sharesKey, (shares) =>
        shares?.filter((share) => share.userId !== userId),
      );
      return { previous };
    },
    onError: (mutationError, _userId, context) => {
      console.error(mutationError);
      queryClient.setQueryData(sharesKey, context?.previous);
      toast({ message: t(getRequestErrorKey(mutationError)), color: "error" });
    },
  });

  return {
    shares: query.data ?? [],
    isLoading: query.isLoading,
    loadErrorKey: query.error ? getRequestErrorKey(query.error) : null,
    add,
    remove,
    addErrorKey: add.error ? getShareErrorKey(add.error) : null,
  };
}

export default useNoteShares;
