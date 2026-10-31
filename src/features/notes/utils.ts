import {
  NOTE_DATE_FORMAT,
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
