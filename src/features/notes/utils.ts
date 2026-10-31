import {
  DAY_MS,
  NOTE_DATE_FORMAT,
  TRASH_RETENTION_DAYS,
  RELATIVE_DATE_MAX_MS,
  RELATIVE_DATE_UNITS,
  TAG_COLORS,
  TAG_NAME_MAX_LENGTH,
} from "./constants";
import type { Note, NoteCategory } from "./models";

/**
 * "2 days ago" for recent notes, the date for older ones
 * @param timestamp - epoch ms
 * @param locale - UI language
 * @param now - current epoch ms
 * @returns localized label
 */
export const formatNoteDate = (
  timestamp: number,
  locale: string,
  now: number = Date.now(),
): string => {
  const elapsed = Math.max(0, now - timestamp);
  if (elapsed >= RELATIVE_DATE_MAX_MS)
    return new Date(timestamp).toLocaleDateString(locale, NOTE_DATE_FORMAT);
  const relative = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  for (const [unit, size] of RELATIVE_DATE_UNITS)
    if (elapsed >= size)
      return relative.format(-Math.floor(elapsed / size), unit);
  return relative.format(0, "second");
};

/**
 * @param deletedAt - epoch ms the note went to the trash
 * @param now - current epoch ms
 * @returns whole days left before the server purges it (0 = today)
 */
export const getDaysUntilPurge = (
  deletedAt: number,
  now: number = Date.now(),
): number =>
  Math.max(
    0,
    TRASH_RETENTION_DAYS - Math.floor(Math.max(0, now - deletedAt) / DAY_MS),
  );

/**
 * @param tags - tags in any order
 * @returns a copy sorted by name (the order the API and the UI use)
 */
export const sortTagsByName = (tags: NoteCategory[]): NoteCategory[] =>
  [...tags].sort((a, b) => a.name.localeCompare(b.name));

/**
 * @param tags - tags in any order
 * @param uses - notes per tag id (countTagUses)
 * @returns a copy, most used first, then by name
 */
export const sortTagsByUses = (
  tags: NoteCategory[],
  uses: Map<number, number>,
): NoteCategory[] =>
  [...tags].sort(
    (a, b) =>
      (uses.get(b.id) ?? 0) - (uses.get(a.id) ?? 0) ||
      a.name.localeCompare(b.name),
  );

/**
 * @param name - what the user typed
 * @returns the name trimmed, inner spaces collapsed, within the max length
 */
export const normalizeTagName = (name: string): string =>
  name.trim().replace(/\s+/g, " ").slice(0, TAG_NAME_MAX_LENGTH);

/**
 * Same-name check the server also enforces (case and accents ignored)
 * @param tags - existing tags
 * @param name - candidate name
 * @param exceptId - tag being renamed (its own name is fine)
 * @returns the tag that already uses the name, if any
 */
export const findTagByName = (
  tags: NoteCategory[],
  name: string,
  exceptId?: number,
): NoteCategory | undefined => {
  const key = toTagKey(name);
  return tags.find((tag) => tag.id !== exceptId && toTagKey(tag.name) === key);
};

/**
 * @param name - tag name
 * @returns comparison key: lower case, no accents, single spaces
 */
export const toTagKey = (name: string): string =>
  normalizeTagName(name).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Color for a new tag: the palette color fewer tags use (first on ties)
 * @param tags - existing tags
 * @returns a palette color
 */
export const pickTagColor = (tags: NoteCategory[]): string => {
  const uses = new Map<string, number>(TAG_COLORS.map((color) => [color, 0]));
  for (const tag of tags) {
    const color = tag.color?.toUpperCase();
    if (color && uses.has(color)) uses.set(color, (uses.get(color) ?? 0) + 1);
  }
  return [...uses.entries()].reduce((best, entry) =>
    entry[1] < best[1] ? entry : best,
  )[0];
};

/**
 * @param notes - loaded notes
 * @returns how many notes use each tag id
 */
export const countTagUses = (notes: Note[]): Map<number, number> => {
  const counts = new Map<number, number>();
  for (const note of notes)
    for (const tag of note.categories)
      counts.set(tag.id, (counts.get(tag.id) ?? 0) + 1);
  return counts;
};
