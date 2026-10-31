import { queryClient } from "@/shared/lib/queryClient";
import { isHttpError } from "@/shared/lib/http";
import { getRequestErrorKey } from "@/shared/lib/errors";
import { withViewTransition } from "@/shared/lib/viewTransition";

import { ReactQueryKeys } from "@/features/notes/constants";
import { sortTagsByName } from "@/features/notes/utils";
import type { NoteCategory } from "@/features/notes/models";

import { TAG_CONFLICT_STATUS, TAG_EXISTS_ERROR_KEY } from "./constants";
import type { TagsKey } from "./types";

/**
 * Tags are embedded in every note: refresh tags and all note queries. The
 * tags list already holds the change, so its refetch renders nothing new.
 * @returns once everything is refreshed
 */
export const refreshTagsAndNotes = () =>
  Promise.all([
    queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.Tags] }),
    queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.Notes] }),
  ]);

/**
 * Changes the cached tags inside a View Transition, so rows slide, fade in
 * and fade out instead of jumping
 * @param key - tags query key
 * @param change - new list from the current one
 */
export const changeTags = (
  key: TagsKey,
  change: (tags: NoteCategory[]) => NoteCategory[],
) =>
  withViewTransition(() =>
    queryClient.setQueryData<NoteCategory[]>(key, (tags) =>
      sortTagsByName(change(tags ?? [])),
    ),
  );

/**
 * Puts back a previous list (failed change), also animated
 * @param key - tags query key
 * @param previous - list before the change
 */
export const restoreTags = (
  key: TagsKey,
  previous: NoteCategory[] | undefined,
) => withViewTransition(() => queryClient.setQueryData(key, previous));

/**
 * @param error - failed tag request
 * @returns i18n key of the message to show
 */
export const getTagErrorKey = (error: unknown): string =>
  isHttpError(error, TAG_CONFLICT_STATUS)
    ? TAG_EXISTS_ERROR_KEY
    : getRequestErrorKey(error);
