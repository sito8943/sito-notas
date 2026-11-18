import { useNavigate } from "react-router-dom";
import { useIsMutating } from "@tanstack/react-query";

// routes
import { getNoteRoute } from "@/shared/routes";

// hooks
import { useKeyShortcut } from "@/shared/hooks/useKeyShortcut";
import {
  ADD_NOTE_MUTATION_KEY,
  useAddNote,
} from "@/features/notes/hooks/useAddNote";

import { NEW_NOTE_SHORTCUT_KEY } from "./constants";

/**
 * N (outside text fields) creates a note and opens it, from any page.
 * Ignored while another note is being created.
 */
function useNewNoteShortcut() {
  const navigate = useNavigate();
  const addNote = useAddNote({ onCreated: (id) => navigate(getNoteRoute(id)) });
  const isAdding = useIsMutating({ mutationKey: ADD_NOTE_MUTATION_KEY }) > 0;

  useKeyShortcut((key) => {
    if (key !== NEW_NOTE_SHORTCUT_KEY) return false;
    if (!isAdding) addNote.mutate();
    return true;
  });
}

export default useNewNoteShortcut;
