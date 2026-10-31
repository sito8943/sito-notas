import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// hooks
import { useDebounce } from "@/shared/hooks";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// utils
import { queryClient } from "@/shared/lib/queryClient";
import { getRequestErrorKey } from "@/shared/lib/errors";
import {
  NoteQueryScope,
  ReactQueryKeys,
  getNoteDetailKey,
} from "@/features/notes/constants";

// models
import type { Note } from "@/features/notes/models";
import type { UpdateNoteInput } from "@/features/notes/services";

import { AUTOSAVE_DELAY_MS, NoteSaveStatus } from "./constants";
import type {
  NoteSaveStatus as SaveStatus,
  UseNoteEditorResult,
} from "./types";

/**
 * Loads a note and saves title/content edits after a short pause. Edits
 * still waiting for the pause are saved when the editor closes.
 * @param noteId - note to edit (undefined when the route id is invalid)
 * @returns note state, setters and save status
 */
function useNoteEditor(noteId: number | undefined): UseNoteEditorResult {
  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();

  const detailKey = getNoteDetailKey(noteId ?? 0);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: detailKey,
    queryFn: () => appApiClient.Note.getById(noteId ?? 0),
    enabled: noteId !== undefined,
  });

  // Latest edits; the note itself stays the source until the user types
  const [draft, setDraft] = useState<UpdateNoteInput | null>(null);
  const debouncedDraft = useDebounce(draft, AUTOSAVE_DELAY_MS);
  // Edits not sent yet, flushed if the editor closes before the pause ends
  const pendingRef = useRef<UpdateNoteInput | null>(null);

  const {
    mutate,
    isPending,
    isError: saveFailed,
    isSuccess,
  } = useMutation({
    mutationFn: (input: UpdateNoteInput) => appApiClient.Note.update(input),
    onSuccess: (_result, input) => {
      queryClient.setQueryData<Note>(getNoteDetailKey(input.id), (current) =>
        current
          ? {
              ...current,
              title: input.title,
              content: input.content,
              updatedAt: Date.now(),
            }
          : current,
      );
    },
    onError: (mutationError) => {
      console.error(mutationError);
      toast({ message: t(getRequestErrorKey(mutationError)), color: "error" });
    },
  });

  useEffect(() => {
    if (!debouncedDraft) return;
    if (pendingRef.current === debouncedDraft) pendingRef.current = null;
    mutate(debouncedDraft);
  }, [debouncedDraft, mutate]);

  // Leaving within the pause: save what is left, then refresh the list
  useEffect(
    () => () => {
      const pending = pendingRef.current;
      if (!pending) return;
      pendingRef.current = null;
      appApiClient.Note.update(pending)
        .then(() =>
          Promise.all(
            [NoteQueryScope.List, NoteQueryScope.Shared].map((scope) =>
              queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.Notes, scope],
              }),
            ),
          ),
        )
        .catch((flushError: unknown) => console.error(flushError));
    },
    [appApiClient],
  );

  const title = draft?.title ?? note?.title ?? "";
  const content = draft?.content ?? note?.content ?? "";

  const edit = useCallback(
    (changes: Partial<Pick<UpdateNoteInput, "title" | "content">>) => {
      if (!note) return;
      setDraft((current) => {
        const next: UpdateNoteInput = {
          id: note.id,
          title: current?.title ?? note.title,
          content: current?.content ?? note.content,
          ...changes,
        };
        pendingRef.current = next;
        return next;
      });
    },
    [note],
  );

  const setTitle = useCallback(
    (value: string) => edit({ title: value }),
    [edit],
  );
  const setContent = useCallback(
    (value: string) => edit({ content: value }),
    [edit],
  );

  const discard = useCallback(() => {
    pendingRef.current = null;
    setDraft(null);
  }, []);

  let status: SaveStatus = NoteSaveStatus.Idle;
  if (draft !== debouncedDraft || isPending) status = NoteSaveStatus.Saving;
  else if (saveFailed) status = NoteSaveStatus.Error;
  else if (isSuccess) status = NoteSaveStatus.Saved;

  return {
    note,
    isLoading,
    notFound: noteId === undefined || isError,
    title,
    content,
    setTitle,
    setContent,
    status,
    discard,
  };
}

export default useNoteEditor;
