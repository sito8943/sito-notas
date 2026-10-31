import DOMPurify from "dompurify";
import { marked } from "marked";

import { PREVIEW_CONTENT_LENGTH, PREVIEW_FORBIDDEN_TAGS } from "./constants";

/**
 * Start of the note, cut at a line break so no markdown mark is left open.
 * @param markdown - note content
 * @returns markdown short enough for a card
 */
export const truncateMarkdown = (markdown: string): string => {
  if (markdown.length <= PREVIEW_CONTENT_LENGTH) return markdown;
  const cut = markdown.substring(0, PREVIEW_CONTENT_LENGTH);
  const lastBreak = cut.lastIndexOf("\n");
  return lastBreak > 0 ? cut.substring(0, lastBreak) : cut;
};

/**
 * Sanitized HTML of the start of a markdown note, for read-only cards.
 * @param markdown - note content
 * @returns HTML safe to inject
 */
export const toPreviewHtml = (markdown: string): string => {
  const html = marked.parse(truncateMarkdown(markdown), {
    async: false,
    gfm: true,
  });
  return DOMPurify.sanitize(html, { FORBID_TAGS: PREVIEW_FORBIDDEN_TAGS });
};
