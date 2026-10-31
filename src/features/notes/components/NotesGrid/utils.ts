import { NO_DRAG_SELECTOR, NOTE_ID_ATTRIBUTE } from "./constants";

/**
 * @param target - element where the press started
 * @returns the card it belongs to, unless it is a card action
 */
export const getDragCard = (target: EventTarget | null): HTMLElement | null => {
  if (!(target instanceof Element) || target.closest(NO_DRAG_SELECTOR))
    return null;
  return target.closest<HTMLElement>(`[${NOTE_ID_ATTRIBUTE}]`);
};

/**
 * @param card - card element
 * @returns its note id
 */
export const getCardNoteId = (card: Element): number =>
  Number(card.getAttribute(NOTE_ID_ATTRIBUTE));

/**
 * Card under a point (the dragged card ignores the pointer while dragging)
 * @param x - client x
 * @param y - client y
 * @returns its note id, or null
 */
export const getNoteIdAt = (x: number, y: number): number | null => {
  const card = document
    .elementFromPoint(x, y)
    ?.closest(`[${NOTE_ID_ATTRIBUTE}]`);
  return card ? getCardNoteId(card) : null;
};

/**
 * Row-major masonry: item i goes to column i % columns, so the order reads
 * left to right, then down
 * @param items - items in order
 * @param columns - column count
 * @returns one array per column
 */
export const toColumns = <T>(items: T[], columns: number): T[][] => {
  const result: T[][] = Array.from({ length: Math.max(columns, 1) }, () => []);
  items.forEach((item, index) => result[index % result.length].push(item));
  return result;
};
