import type { NoteSaveStatusValue } from "@/features/notes/hooks/useNoteEditor";

import type { NoteOwner } from "@/features/notes/models";

export interface NoteMetaProps {
  /** Epoch ms of the last change */
  updatedAt: number;
  status: NoteSaveStatusValue;
  /** Shared note: shows who owns it and what the user may do */
  owner?: NoteOwner;
  /** Shared note the user can't edit: no save status */
  readOnly?: boolean;
}
