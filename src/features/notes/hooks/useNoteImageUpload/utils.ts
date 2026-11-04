import {
  NOTE_IMAGE_MAX_BYTES,
  NOTE_IMAGE_TYPES,
  NoteImageError,
} from "./constants";
import type { NoteImageErrorKey } from "./types";

/**
 * @param file - image picked by the user
 * @returns why the API would reject it, or null when it is fine
 */
export const getNoteImageError = (file: File): NoteImageErrorKey | null => {
  if (!(NOTE_IMAGE_TYPES as readonly string[]).includes(file.type))
    return NoteImageError.InvalidType;
  if (file.size > NOTE_IMAGE_MAX_BYTES) return NoteImageError.TooLarge;
  return null;
};

/**
 * @param url - image URL
 * @returns Markdown image, one per line
 */
export const toMarkdownImage = (url: string): string => `![](${url})`;

/**
 * @param text - current text
 * @param insert - text to put in
 * @param start - selection start (clamped to the text)
 * @param end - selection end, replaced
 * @returns the text with `insert` in place of the selection
 */
export const insertText = (
  text: string,
  insert: string,
  start: number,
  end: number,
): string => {
  const from = Math.min(start, text.length);
  const to = Math.min(Math.max(end, from), text.length);
  return text.slice(0, from) + insert + text.slice(to);
};
