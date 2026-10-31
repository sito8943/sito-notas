/** Scheme added when the user types "example.com" */
export const DEFAULT_LINK_PROTOCOL = "https://";

/** Has a scheme (https:, mailto:, tel:) */
export const URL_SCHEME_PATTERN = /^[a-z][a-z\d+.-]*:/i;

/** Only these open from a note; anything else (javascript:) is refused */
export const ALLOWED_LINK_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];
