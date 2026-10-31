import type { NoteEditorMode as NoteEditorModeValues } from "./constants";

export type NoteEditorMode =
  (typeof NoteEditorModeValues)[keyof typeof NoteEditorModeValues];

export interface NoteEditorProps {
  /** Markdown read when the editor mounts */
  content: string;
  /** Called with the Markdown of every change */
  onChange: (content: string) => void;
  placeholder: string;
  /** Accessible name of the writing area */
  label: string;
  /** View only: no toolbar, no edits */
  readOnly?: boolean;
}
