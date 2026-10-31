export interface UseRemoveNoteOptions {
  /** Runs after the note is deleted (e.g. leave its page) */
  onRemoved?: () => void;
}
