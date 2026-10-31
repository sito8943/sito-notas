import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { useDrag } from "@use-gesture/react";

import {
  LONG_PRESS_MS,
  LONG_PRESS_TOLERANCE_PX,
  LONG_PRESS_VIBRATION_MS,
  TOUCH_DRAG_DELAY_MS,
} from "./constants";
import type { GridDragState } from "./types";
import { getCardNoteId, getDragCard, getNoteIdAt } from "./utils";

const IDLE: GridDragState = { draggingId: null, overId: null };

interface PendingPress {
  timer: number;
  x: number;
  y: number;
}

/**
 * Drag & drop and context menu of the cards of a grid, bound once on it.
 * - Mouse: drag to reorder; right click opens the menu.
 * - Touch: hold still LONG_PRESS_MS to open the menu; hold and move to drag
 *   (moving first cancels the menu, the menu opening cancels the drag).
 * The dragged card follows the pointer via transform (no re-render per
 * frame). A click right after a drag or a long press is swallowed so the
 * card link does not open.
 * @param onMove - dragged id, id it was dropped on
 * @param onMenu - card id and where to open its menu
 * @returns gesture handlers, drag state and the click guard
 */
function useGridDrag(
  onMove: (fromId: number, toId: number) => void,
  onMenu: (noteId: number, x: number, y: number) => void,
) {
  const [state, setState] = useState<GridDragState>(IDLE);
  const cardRef = useRef<HTMLElement | null>(null);
  const swallowClickRef = useRef(false);
  const pressRef = useRef<PendingPress | null>(null);
  const menuOpenedRef = useRef(false);
  const pointerTypeRef = useRef<string>("mouse");

  const cancelPress = useCallback(() => {
    if (pressRef.current) window.clearTimeout(pressRef.current.timer);
    pressRef.current = null;
  }, []);

  useEffect(() => cancelPress, [cancelPress]);

  const resetCard = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
    cardRef.current = null;
    setState(IDLE);
  };

  const bind = useDrag(
    ({ first, last, tap, event, movement: [mx, my], xy: [x, y], cancel }) => {
      // The long-press menu won: this gesture is no drag
      if (menuOpenedRef.current) return;

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

      const fromId = getCardNoteId(card);
      const toId = getNoteIdAt(x, y);
      resetCard();
      swallowClickRef.current = !tap;
      if (!tap && toId !== null && toId !== fromId) onMove(fromId, toId);
    },
    { filterTaps: true, preventScroll: TOUCH_DRAG_DELAY_MS },
  );

  const gesture = bind();

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    pointerTypeRef.current = event.pointerType;
    menuOpenedRef.current = false;
    cancelPress();
    gesture.onPointerDown?.(event);
    if (event.pointerType !== "touch") return;
    const card = getDragCard(event.target);
    if (!card) return;
    const { clientX: x, clientY: y } = event;
    pressRef.current = {
      x,
      y,
      timer: window.setTimeout(() => {
        pressRef.current = null;
        menuOpenedRef.current = true;
        swallowClickRef.current = true;
        resetCard();
        navigator.vibrate?.(LONG_PRESS_VIBRATION_MS);
        onMenu(getCardNoteId(card), x, y);
      }, LONG_PRESS_MS),
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    gesture.onPointerMove?.(event);
    const press = pressRef.current;
    if (
      press &&
      Math.hypot(event.clientX - press.x, event.clientY - press.y) >
        LONG_PRESS_TOLERANCE_PX
    )
      cancelPress();
  };

  // Right click (mouse/pen). Touch long press is handled by the timer
  // (Android also fires contextmenu then: only block the native menu).
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
    handlers: {
      ...gesture,
      onPointerDown,
      onPointerMove,
      onPointerUp: (event: PointerEvent<HTMLElement>) => {
        gesture.onPointerUp?.(event);
        cancelPress();
      },
      onPointerCancel: (event: PointerEvent<HTMLElement>) => {
        gesture.onPointerCancel?.(event);
        cancelPress();
      },
      onContextMenu,
      onClickCapture,
    },
    ...state,
  };
}

export default useGridDrag;
