import type { NoteSaveStatusValue } from "@/features/notes/hooks/useNoteEditor";

export interface NoteMetaProps {
  /** Epoch ms of the last change */
  updatedAt: number;
  status: NoteSaveStatusValue;
}
