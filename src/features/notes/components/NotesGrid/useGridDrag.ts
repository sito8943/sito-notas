import { useCallback, useRef, useState, type MouseEvent } from "react";
import { useDrag } from "@use-gesture/react";

import { TOUCH_DRAG_DELAY_MS } from "./constants";
import type { GridDragState } from "./types";
import { getCardNoteId, getDragCard, getNoteIdAt } from "./utils";

const IDLE: GridDragState = { draggingId: null, overId: null };

/**
 * Drag & drop of the cards of a grid, bound once on the grid. The dragged
 * card follows the pointer (transform, no re-render per frame); dropping it
 * on another card calls `onMove`. A click right after a drag is swallowed so
 * the card link does not open.
 * @param onMove - dragged id, id it was dropped on
 * @returns gesture binding, drag state and the click guard
 */
function useGridDrag(onMove: (fromId: number, toId: number) => void) {
  const [state, setState] = useState<GridDragState>(IDLE);
  const cardRef = useRef<HTMLElement | null>(null);
  const draggedRef = useRef(false);

  const bind = useDrag(
    ({ first, last, tap, event, movement: [mx, my], xy: [x, y], cancel }) => {
      if (first) {
        const card = getDragCard(event.target);
        if (!card) {
          cancel();
          return;
        }
        cardRef.current = card;
        setState({ draggingId: getCardNoteId(card), overId: null });
      }

      const card = cardRef.current;
      if (!card) return;

      if (!last) {
        card.style.transform = `translate(${mx}px, ${my}px)`;
        const overId = getNoteIdAt(x, y);
        setState((current) =>
          current.overId === overId ? current : { ...current, overId },
        );
        return;
      }

      card.style.transform = "";
      cardRef.current = null;
      draggedRef.current = !tap;
      const fromId = getCardNoteId(card);
      const toId = getNoteIdAt(x, y);
      setState(IDLE);
      if (!tap && toId !== null && toId !== fromId) onMove(fromId, toId);
    },
    { filterTaps: true, preventScroll: TOUCH_DRAG_DELAY_MS },
  );

  const onClickCapture = useCallback((event: MouseEvent) => {
    if (!draggedRef.current) return;
    draggedRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return { bind, ...state, onClickCapture };
}

export default useGridDrag;
