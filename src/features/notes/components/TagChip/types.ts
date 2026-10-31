import type { NoteCategory } from "@/features/notes/models";

export interface TagChipProps {
  tag: Pick<NoteCategory, "name" | "color">;
  /** Shows an × button that calls it */
  onRemove?: () => void;
  /** Accessible name of the × button */
  removeLabel?: string;
  className?: string;
}
