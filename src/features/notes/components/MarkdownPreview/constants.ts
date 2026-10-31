/** Characters of markdown rendered in a note card */
export const PREVIEW_CONTENT_LENGTH = 600;

/**
 * Tags removed from the card (their text is kept). Links would nest inside the
 * card link, media would load remote content.
 */
export const PREVIEW_FORBIDDEN_TAGS = [
  "a",
  "img",
  "video",
  "audio",
  "iframe",
  "form",
  "button",
  "style",
];
