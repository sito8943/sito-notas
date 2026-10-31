import {
  DAY_MS,
  NOTE_DATE_FORMAT,
  TRASH_RETENTION_DAYS,
  RELATIVE_DATE_MAX_MS,
  RELATIVE_DATE_UNITS,
} from "./constants";

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
