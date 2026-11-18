import stringSimilarity from "string-similarity";

import type { Note } from "@/features/notes/models";

import {
  DIACRITICS_PATTERN,
  MARKDOWN_LINK_PATTERN,
  SEARCH_SIMILARITY_THRESHOLD,
} from "./constants";

/**
 * @param text - text to compare
 * @returns lowercase text without accents ("Canción" → "cancion")
 */
export const normalizeSearchText = (text: string): string =>
  text.normalize("NFD").replace(DIACRITICS_PATTERN, "").toLowerCase();

/**
 * @param content - note Markdown
 * @returns searchable text: links and images keep their text, not the URL
 */
export const toSearchableContent = (content: string): string =>
  normalizeSearchText(content.replace(MARKDOWN_LINK_PATTERN, "$1"));

/**
 * A note matches when every word of the search is in its title or content
 * (any order, ignoring case and accents), or when its title is close to
 * the whole search (typos).
 * @param note - note to check
 * @param search - text typed by the user
 * @returns true when the note matches
 */
export const matchesSearch = (note: Note, search: string): boolean => {
  const query = normalizeSearchText(search.trim());
  if (!query) return true;

  const title = normalizeSearchText(note.title ?? "");
  if (
    stringSimilarity.compareTwoStrings(title, query) >
    SEARCH_SIMILARITY_THRESHOLD
  )
    return true;

  const text = `${title}\n${toSearchableContent(note.content ?? "")}`;
  return query.split(/\s+/).every((word) => text.includes(word));
};
