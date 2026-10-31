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

import type { SetNoteTagsVariables } from "./types";
import { withNoteTags } from "./utils";

/**
 * Replaces the tags of a note. The note and the list change at once and
 * roll back if the server rejects it.
 * @returns the mutation
 */
function useSetNoteTags() {
  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const listKey = getNotesListKey(account.user?.id);

  return useMutation({
    mutationFn: ({ id, tags }: SetNoteTagsVariables) =>
      appApiClient.Note.setTags({ id, tagIds: tags.map((tag) => tag.id) }),
    onMutate: async ({ id, tags }) => {
      const detailKey = getNoteDetailKey(id);
      await queryClient.cancelQueries({ queryKey: listKey });
      await queryClient.cancelQueries({ queryKey: detailKey });
      const previous = queryClient.getQueryData<Note[]>(listKey);
      const previousDetail = queryClient.getQueryData<Note>(detailKey);
      queryClient.setQueryData<Note[]>(listKey, (notes) =>
        withNoteTags(notes, id, tags),
      );
      queryClient.setQueryData<Note>(detailKey, (note) =>
        note ? { ...note, categories: tags } : note,
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

export default useSetNoteTags;
