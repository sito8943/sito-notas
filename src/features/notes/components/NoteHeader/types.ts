import type { NoteEditorModeValue } from "@/features/notes/components/NoteEditor";
import type { NoteSaveStatusValue } from "@/features/notes/hooks/useNoteEditor";

export interface NoteHeaderProps {
  status: NoteSaveStatusValue;
  mode: NoteEditorModeValue;
  onModeChange: (mode: NoteEditorModeValue) => void;
  favorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
  onRemove: () => void;
  /** Hides the note actions (loading or missing note) */
  disabled?: boolean;
}
