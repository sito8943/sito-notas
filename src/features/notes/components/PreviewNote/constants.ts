/** Characters of markdown turned into the card excerpt */
export const PREVIEW_CONTENT_LENGTH = 400;

/** Older notes show the date instead of "x days ago" */
export const RELATIVE_DATE_MAX_DAYS = 7;

export const PREVIEW_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Largest unit first: the first one the elapsed time reaches is used */
export const RELATIVE_DATE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["day", DAY],
  ["hour", HOUR],
  ["minute", MINUTE],
];

export const RELATIVE_DATE_MAX_MS = RELATIVE_DATE_MAX_DAYS * DAY;
