import { useMediaColumns } from "@/shared/hooks";

import { NOTES_GRID_COLUMNS, NOTES_GRID_MAX_COLUMNS } from "./constants";
import type { NotesGridProps } from "./types";
import useGridDrag from "./useGridDrag";
import { toColumns } from "./utils";
import "./styles.css";

/**
 * Masonry of note cards: drag & drop to reorder (touch: hold, then move);
 * right click opens the card menu
 */
function NotesGrid(props: NotesGridProps) {
  const { notes, renderNote, onMove, onMenu } = props;

  const columns = useMediaColumns(NOTES_GRID_COLUMNS, NOTES_GRID_MAX_COLUMNS);
  const { handlers, draggingId, overId } = useGridDrag(onMove, onMenu);

  return (
    <div
      {...handlers}
      onDragStart={(event) => event.preventDefault()}
      className={`notes-grid ${draggingId !== null ? "dragging" : ""}`}
    >
      {toColumns(notes, columns).map((column, index) => (
        <div key={index} className="notes-grid-column">
          {column.map((note) => (
            <div
              key={note.id}
              data-note-id={note.id}
              className={`notes-grid-item ${
                note.id === draggingId ? "lifted" : ""
              } ${note.id === overId && note.id !== draggingId ? "target" : ""}`}
            >
              {renderNote(note)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default NotesGrid;
