import { marked } from "marked";

import { PREVIEW_CONTENT_LENGTH } from "./constants";

/**
 * Plain text of the start of a markdown note. Parsed in an inert document,
 * so nothing in the note runs or loads.
 * @param markdown - note content
 * @returns text for the card excerpt
 */
export const toExcerpt = (markdown: string): string => {
  const html = marked.parse(markdown.substring(0, PREVIEW_CONTENT_LENGTH), {
    async: false,
  });
  const text =
    new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";
  return text.replace(/\s+/g, " ").trim();
};
