import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useAccount } from "@/features/auth";

// utils
import { getRequestErrorKey } from "@/shared/lib/errors";
import { NoteQueryScope, getTrashKey } from "@/features/notes/constants";

import type { UseTrashResult } from "./types";
import { refreshNoteScopes } from "./utils";

/**
 * Trashed notes of the user, with restore and delete-for-good
 * @returns notes, loading flag and mutations
 */
function useTrash(): UseTrashResult {
  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const userId = account.user?.id;

  const { data, isLoading } = useQuery({
    queryKey: getTrashKey(userId),
    queryFn: () => appApiClient.Note.listTrash(),
    enabled: userId !== undefined,
  });

  const onError = (mutationError: Error) => {
    console.error(mutationError);
    toast({ message: t(getRequestErrorKey(mutationError)), color: "error" });
  };

  const restore = useMutation({
    mutationFn: (ids: number[]) => appApiClient.Note.restore(ids),
    onSuccess: async (_count, ids) => {
      // Restoring changes both lists; deleting only the trash
      await refreshNoteScopes([NoteQueryScope.Trash, NoteQueryScope.List]);
      toast({
        message: t("_pages:trash.restored", { count: ids.length }),
        color: "success",
      });
    },
    onError,
  });

  const removePermanently = useMutation({
    mutationFn: (ids: number[]) => appApiClient.Note.removePermanently(ids),
    onSuccess: async (_count, ids) => {
      await refreshNoteScopes([NoteQueryScope.Trash]);
      toast({
        message: t("_pages:trash.deleted", { count: ids.length }),
        color: "success",
      });
    },
    onError,
  });

  return {
    notes: data ?? [],
    isLoading,
    restore,
    removePermanently,
  };
}

export default useTrash;
