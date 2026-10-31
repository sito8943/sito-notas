import type { NoteSaveStatusValue } from "@/features/notes/hooks/useNoteEditor";

import type { NoteOwner } from "@/features/notes/models";

export interface NoteMetaProps {
  /** Epoch ms of the last change */
  updatedAt: number;
  status: NoteSaveStatusValue;
  /** Shared note: shows who owns it and that it is read only */
  owner?: NoteOwner;
}
