import type { GeneralAccess } from "./constants";

export type GeneralAccessValue =
  (typeof GeneralAccess)[keyof typeof GeneralAccess];

export interface ShareGeneralAccessProps {
  /** Note whose public link is managed; null loads nothing */
  noteId: number | null;
}
