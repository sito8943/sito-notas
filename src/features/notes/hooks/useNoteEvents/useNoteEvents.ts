import { useEffect } from "react";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useAccount } from "@/features/auth";

// utils
import { queryClient } from "@/shared/lib/queryClient";
import {
  getNoteDetailKey,
  getNotesListKey,
  getSharedNotesKey,
  getUnseenSharedKey,
} from "@/features/notes/constants";

// models
import type { Note } from "@/features/notes/models";

import { NOTE_EVENTS_DESTINATION, NoteEventType } from "./constants";
import { toNoteEvent, withNoteUpdate, withNoteUpdateInList } from "./utils";

/**
 * Keeps notes live while signed in: saves by other users (or the owner)
 * land in the open note and the lists; access changes reload the shared
 * list, its "new" count and the note. Own saves are skipped (already applied locally).
 */
function useNoteEvents() {
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const userId = account.user?.id;

  useEffect(() => {
    if (userId === undefined) return;
    const socket = appApiClient.Socket;

    const unsubscribe = socket.subscribe(NOTE_EVENTS_DESTINATION, (body) => {
      const event = toNoteEvent(body);
      if (!event) return;

      if (event.type === NoteEventType.AccessChanged) {
        void queryClient.invalidateQueries({
          queryKey: getSharedNotesKey(userId),
        });
        void queryClient.invalidateQueries({
          queryKey: getNoteDetailKey(event.noteId),
        });
        void queryClient.invalidateQueries({
          queryKey: getUnseenSharedKey(userId),
        });
        return;
      }

      if (event.editorId === userId) return;
      queryClient.setQueryData<Note>(getNoteDetailKey(event.noteId), (note) =>
        withNoteUpdate(note, event),
      );
      for (const key of [getNotesListKey(userId), getSharedNotesKey(userId)])
        queryClient.setQueryData<Note[]>(key, (notes) =>
          withNoteUpdateInList(notes, event),
        );
    });

    socket.start();
    return () => {
      unsubscribe();
      socket.stop();
    };
  }, [appApiClient, userId]);
}

export default useNoteEvents;
