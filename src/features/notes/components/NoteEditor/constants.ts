/** How the note is edited: formatted text or its Markdown source */
export const NoteEditorMode = {
  Rich: "rich",
  Markdown: "markdown",
} as const;

/** marked options: GitHub Markdown, and single line breaks stay breaks
    (older notes are plain text written line by line) */
export const MARKDOWN_PARSE_OPTIONS = { gfm: true, breaks: true } as const;
