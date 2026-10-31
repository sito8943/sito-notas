import type { NoteCategory } from "@/features/notes/models";

export interface TagSelectorProps {
  /** Every tag of the user */
  tags: NoteCategory[];
  /** Tags the note has */
  selectedIds: number[];
  /** Adds or removes a tag from the note */
  onToggle: (tag: NoteCategory) => void;
  /** Creates a tag with this (normalized) name and adds it to the note */
  onCreate: (name: string) => void;
  /** A tag is being created: the create row is disabled */
  creating?: boolean;
  /** Escape pressed (handled here, so pages do not also act on it) */
  onEscape?: () => void;
  className?: string;
}

/** One option of the list: an existing tag or "create <name>" */
export type TagSelectorOption =
  { type: "tag"; tag: NoteCategory } | { type: "create"; name: string };
