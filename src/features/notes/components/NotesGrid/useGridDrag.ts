import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { useDrag } from "@use-gesture/react";

import { TOUCH_DRAG_DELAY_MS } from "./constants";
import type { GridDragState } from "./types";
import { getCardNoteId, getDragCard, getNoteIdAt } from "./utils";

const IDLE: GridDragState = { draggingId: null, overId: null };

/**
 * Drag & drop and right-click menu of the cards of a grid, bound once on it.
 * - Mouse: drag to reorder; right click opens the menu.
 * - Touch: hold TOUCH_DRAG_DELAY_MS, then move, to drag (no menu: the
 *   native long-press menu is blocked so it never fights the drag).
 * The dragged card follows the pointer via transform (no re-render per
 * frame). A click right after a drag is swallowed so the card link does not
 * open.
 * @param onMove - dragged id, id it was dropped on
 * @param onMenu - card id and where to open its menu
 * @returns gesture handlers and drag state
 */
function useGridDrag(
  onMove: (fromId: number, toId: number) => void,
  onMenu: (noteId: number, x: number, y: number) => void,
) {
  const [state, setState] = useState<GridDragState>(IDLE);
  const cardRef = useRef<HTMLElement | null>(null);
  const swallowClickRef = useRef(false);
  const pointerTypeRef = useRef<string>("mouse");

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
      swallowClickRef.current = !tap;
      const fromId = getCardNoteId(card);
      const toId = getNoteIdAt(x, y);
      setState(IDLE);
      if (!tap && toId !== null && toId !== fromId) onMove(fromId, toId);
    },
    { filterTaps: true, preventScroll: TOUCH_DRAG_DELAY_MS },
  );

  const gesture = bind();

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    pointerTypeRef.current = event.pointerType;
    gesture.onPointerDown?.(event);
  };

  // Right click (mouse/pen) opens the card menu. On touch, contextmenu is
  // the native long-press menu: block it and leave the gesture to the drag.
  const onContextMenu = (event: MouseEvent<HTMLElement>) => {
    const card = getDragCard(event.target);
    if (!card) return;
    event.preventDefault();
    if (pointerTypeRef.current === "touch") return;
    onMenu(getCardNoteId(card), event.clientX, event.clientY);
  };

  const onClickCapture = useCallback((event: MouseEvent) => {
    if (!swallowClickRef.current) return;
    swallowClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return {
    handlers: { ...gesture, onPointerDown, onContextMenu, onClickCapture },
    ...state,
  };
}

export default useGridDrag;
