import type { Note } from "@/features/notes/models";

export type PreviewNoteProps = Pick<
  Note,
  "id" | "title" | "content" | "last_update"
> & {
  onDelete: (id: string) => void;
};
