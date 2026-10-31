import type { ReactNode } from "react";

import type { Note } from "@/features/notes/models";

export interface NotesGridProps {
  notes: Note[];
  renderNote: (note: Note) => ReactNode;
  /** A card was dropped on another one */
  onMove: (fromId: number, toId: number) => void;
  /** Right click on a card (mouse/pen only; touch long press = drag) */
  onMenu: (noteId: number, x: number, y: number) => void;
}

export interface GridDragState {
  /** Card being dragged */
  draggingId: number | null;
  /** Card under the pointer, where it would drop */
  overId: number | null;
}
