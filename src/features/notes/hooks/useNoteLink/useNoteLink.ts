import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// utils
import { queryClient } from "@/shared/lib/queryClient";
import { getRequestErrorKey } from "@/shared/lib/errors";
import { getNoteLinkKey } from "@/features/notes/constants";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

import type { UseNoteLinkResult } from "./types";

/**
 * Public read-only link of a note: load, create and turn off
 * @param noteId - note; null loads nothing
 * @returns token and mutations
 */
function useNoteLink(noteId: number | null): UseNoteLinkResult {
  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();
  const linkKey = getNoteLinkKey(noteId ?? 0);

  const query = useQuery({
    queryKey: linkKey,
    queryFn: () => appApiClient.Note.getLink(noteId ?? 0),
    enabled: noteId !== null,
  });

  const onError = (mutationError: Error) => {
    console.error(mutationError);
    toast({ message: t(getRequestErrorKey(mutationError)), color: "error" });
  };

  const create = useMutation({
    mutationFn: () => appApiClient.Note.createLink(noteId ?? 0),
    onSuccess: (token) => queryClient.setQueryData(linkKey, token),
    onError,
  });

  const remove = useMutation({
    mutationFn: () => appApiClient.Note.removeLink(noteId ?? 0),
    onSuccess: () => queryClient.setQueryData(linkKey, null),
    onError,
  });

  return {
    token: query.data ?? null,
    isLoading: query.isLoading,
    create,
    remove,
  };
}

export default useNoteLink;
