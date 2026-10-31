import type { NoteCategory } from "@/features/notes/models";

export interface TagRowProps {
  tag: NoteCategory;
  /** Notes using the tag */
  count: number;
  /** Saves a new (normalized, free) name */
  onRename: (name: string) => void;
  onRecolor: (color: string) => void;
  onDelete: () => void;
  /** Whether another tag already has this name */
  isNameTaken: (name: string) => boolean;
  disabled?: boolean;
}
