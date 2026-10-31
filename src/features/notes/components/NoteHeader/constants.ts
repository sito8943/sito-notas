import { NoteSaveStatus } from "@/features/notes/hooks/useNoteEditor";
import type { NoteSaveStatusValue } from "@/features/notes/hooks/useNoteEditor";

/** i18n key of each save status (idle shows nothing) */
export const SAVE_STATUS_LABEL_KEYS: Record<
  NoteSaveStatusValue,
  string | null
> = {
  [NoteSaveStatus.Idle]: null,
  [NoteSaveStatus.Saving]: "_pages:note.status.saving",
  [NoteSaveStatus.Saved]: "_pages:note.status.saved",
  [NoteSaveStatus.Error]: "_pages:note.status.error",
};
