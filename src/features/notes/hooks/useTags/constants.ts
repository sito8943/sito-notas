import type { NoteCategory } from "@/features/notes/models";

/** Stable empty list while tags load (keeps memoized consumers quiet) */
export const NO_TAGS: NoteCategory[] = [];
