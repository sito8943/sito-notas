/**
 * @param id - route param
 * @returns the note id, or undefined when it is not a positive integer
 */
export const toNoteId = (id: string | undefined): number | undefined => {
  const noteId = Number(id);
  return Number.isInteger(noteId) && noteId > 0 ? noteId : undefined;
};
