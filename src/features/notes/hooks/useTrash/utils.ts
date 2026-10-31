import { queryClient } from "@/shared/lib/queryClient";
import { ReactQueryKeys } from "@/features/notes/constants";

/**
 * Refetches note queries of the given scopes (list, trash…)
 * @param scopes - NoteQueryScope values
 * @returns once every query is refreshed
 */
export const refreshNoteScopes = (scopes: string[]) =>
  Promise.all(
    scopes.map((scope) =>
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.Notes, scope],
      }),
    ),
  );
