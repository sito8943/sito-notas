import {
  ALLOWED_LINK_PROTOCOLS,
  DEFAULT_LINK_PROTOCOL,
  URL_SCHEME_PATTERN,
} from "./constants";

/**
 * @param url - what the user typed
 * @returns the URL with https:// when it has no scheme ("" stays "")
 */
export const normalizeLinkUrl = (url: string): string => {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return URL_SCHEME_PATTERN.test(trimmed)
    ? trimmed
    : `${DEFAULT_LINK_PROTOCOL}${trimmed}`;
};

/**
 * @param href - normalized URL
 * @returns whether it parses and uses an allowed protocol
 */
export const isSafeLinkUrl = (href: string): boolean => {
  try {
    return ALLOWED_LINK_PROTOCOLS.includes(new URL(href).protocol);
  } catch {
    return false;
  }
};
