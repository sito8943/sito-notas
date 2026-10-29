import type { Note } from "@/features/notes/models";

export type PreviewNoteProps = Pick<
  Note,
  "id" | "title" | "content" | "updatedAt"
> & {
  onDelete: (id: number) => void;
};
