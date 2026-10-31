import type { PublicNote } from "@/features/notes/models";

export interface UsePublicNoteResult {
  note: PublicNote | undefined;
  isLoading: boolean;
  /** The link does not exist, was turned off or the note is trashed */
  notFound: boolean;
  isError: boolean;
}
