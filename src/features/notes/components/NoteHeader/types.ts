import type { NoteEditorModeValue } from "@/features/notes/components/NoteEditor";

export interface NoteHeaderProps {
  /** Title shown in the breadcrumb */
  title: string;
  mode: NoteEditorModeValue;
  onModeChange: (mode: NoteEditorModeValue) => void;
  favorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
  onRemove: () => void;
  /** Loading or missing note: no note actions */
  disabled?: boolean;
  /** Note shared with the user: breadcrumb under "Shared with me", no actions */
  shared?: boolean;
}
