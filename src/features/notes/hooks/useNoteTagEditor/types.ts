import type { NoteCategory } from "@/features/notes/models";

export interface UseNoteTagEditorResult {
  tags: NoteCategory[];
  selectedIds: number[];
  onToggle: (tag: NoteCategory) => void;
  onCreate: (name: string) => void;
  creating: boolean;
}
