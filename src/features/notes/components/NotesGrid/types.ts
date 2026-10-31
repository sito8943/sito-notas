import type { ReactNode } from "react";

import type { Note } from "@/features/notes/models";

export interface NotesGridProps {
  notes: Note[];
  renderNote: (note: Note) => ReactNode;
  /** A card was dropped on another one */
  onMove: (fromId: number, toId: number) => void;
}

export interface GridDragState {
  /** Card being dragged */
  draggingId: number | null;
  /** Card under the pointer, where it would drop */
  overId: number | null;
}
