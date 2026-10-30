export interface UseAddNoteOptions {
  /** Called with the id of the new note */
  onCreated?: (id: number) => void;
}
