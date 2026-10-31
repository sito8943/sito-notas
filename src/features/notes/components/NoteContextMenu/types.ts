import type { ContextMenuPosition } from "@sito/ui";

import type { Note } from "@/features/notes/models";

export interface NoteContextMenuProps {
  open: boolean;
  position: ContextMenuPosition;
  /** Note the menu acts on */
  note: Note | null;
  onClose: () => void;
  /** "Add to tag…": opens the tag dialog for the note */
  onAddTags: (note: Note) => void;
  /** "Move to trash": asks for confirmation */
  onDelete: (id: number) => void;
}
