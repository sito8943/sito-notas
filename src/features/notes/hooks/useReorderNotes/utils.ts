import type { Note } from "@/features/notes/models";

/**
 * Moves one id to the place of another (array-move semantics: dropping on a
 * later item puts it after it, on an earlier item before it).
 * @param ids - current order
 * @param fromId - dragged id
 * @param toId - id it was dropped on
 * @returns the new order, or the same array when nothing changes
 */
export const moveId = (ids: number[], fromId: number, toId: number) => {
  const from = ids.indexOf(fromId);
  const to = ids.indexOf(toId);
  if (from < 0 || to < 0 || from === to) return ids;
  const next = [...ids];
  next.splice(from, 1);
  next.splice(to, 0, fromId);
  return next;
};

/**
 * Applies a new order of the visible notes (a filtered subset) to the full
 * list: hidden notes keep their slots, visible ones fill theirs in order.
 * @param allIds - every note id, current order
 * @param visibleIds - visible ids in their new order
 * @returns the full new order
 */
export const mergeVisibleOrder = (
  allIds: number[],
  visibleIds: number[],
): number[] => {
  const visible = new Set(visibleIds);
  let next = 0;
  return allIds.map((id) => (visible.has(id) ? visibleIds[next++] : id));
};

/**
 * @param notes - cached list
 * @param ids - new full order
 * @returns the notes in that order, each with its new position
 */
export const applyOrder = (
  notes: Note[] | undefined,
  ids: number[],
): Note[] | undefined => {
  if (!notes) return notes;
  const byId = new Map(notes.map((note) => [note.id, note]));
  return ids.flatMap((id, position) => {
    const note = byId.get(id);
    return note ? [{ ...note, position }] : [];
  });
};
