/** Minimum title similarity (0-1) for a note to match a fuzzy search */
export const SEARCH_SIMILARITY_THRESHOLD = 0.3;

/** Markdown links and images: only their text is searched, not the URL */
export const MARKDOWN_LINK_PATTERN = /!?\[([^\]]*)\]\([^)]*\)/g;

/** Combining marks left by NFD normalization (accents: "nótá" → "nota") */
export const DIACRITICS_PATTERN = /[̀-ͯ]/g;
