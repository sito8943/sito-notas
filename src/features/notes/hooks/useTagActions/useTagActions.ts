import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// utils
import { queryClient } from "@/shared/lib/queryClient";
import { getTagsKey } from "@/features/notes/constants";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useAccount } from "@/features/auth";

// models
import type { NoteCategory } from "@/features/notes/models";
import type { CreateTagInput, UpdateTagInput } from "@/features/notes/services";

import type { UseTagActionsResult } from "./types";
import {
  changeTags,
  getTagErrorKey,
  refreshTagsAndNotes,
  restoreTags,
} from "./utils";

/**
 * Create, rename/recolor and delete tags. The tags list changes at once and
 * animated (rename, recolor and delete before the server answers; create
 * when the new id arrives) and rolls back on error. Notes are refreshed
 * afterwards because they embed tag names and colors.
 * @returns the three mutations
 */
function useTagActions(): UseTagActionsResult {
  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const tagsKey = getTagsKey(account.user?.id);

  const snapshot = async () => {
    await queryClient.cancelQueries({ queryKey: tagsKey });
    return { previous: queryClient.getQueryData<NoteCategory[]>(tagsKey) };
  };

  const onError = (
    mutationError: Error,
    _input: unknown,
    context?: { previous?: NoteCategory[] },
  ) => {
    console.error(mutationError);
    if (context) restoreTags(tagsKey, context.previous);
    toast({ message: t(getTagErrorKey(mutationError)), color: "error" });
  };

  const create = useMutation({
    mutationFn: (input: CreateTagInput) => appApiClient.Category.create(input),
    onSuccess: (id, input) => {
      changeTags(tagsKey, (tags) => [...tags, { id, ...input }]);
      return refreshTagsAndNotes();
    },
    onError: (mutationError) => onError(mutationError, undefined),
  });

  const update = useMutation({
    mutationFn: (input: UpdateTagInput) => appApiClient.Category.update(input),
    onMutate: async (input) => {
      const context = await snapshot();
      changeTags(tagsKey, (tags) =>
        tags.map((tag) => (tag.id === input.id ? { ...tag, ...input } : tag)),
      );
      return context;
    },
    onSuccess: () => refreshTagsAndNotes(),
    onError,
  });

  const remove = useMutation({
    mutationFn: (ids: number[]) => appApiClient.Category.removePermanently(ids),
    onMutate: async (ids) => {
      const context = await snapshot();
      changeTags(tagsKey, (tags) =>
        tags.filter((tag) => !ids.includes(tag.id)),
      );
      return context;
    },
    onSuccess: async (_count, ids) => {
      await refreshTagsAndNotes();
      toast({
        message: t("_pages:tags.deleted", { count: ids.length }),
        color: "success",
      });
    },
    onError,
  });

  return { create, update, remove };
}

export default useTagActions;
