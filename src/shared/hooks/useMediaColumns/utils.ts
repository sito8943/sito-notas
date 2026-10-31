import type { MediaColumnsRule } from "./types";

/**
 * @param rules - breakpoints, any order
 * @param fallback - columns above every breakpoint
 * @returns columns for the current viewport (narrowest matching rule wins)
 */
export const getMediaColumns = (
  rules: MediaColumnsRule[],
  fallback: number,
): number => {
  const match = [...rules]
    .sort((a, b) => a.maxWidth - b.maxWidth)
    .find(
      (rule) => window.matchMedia(`(max-width: ${rule.maxWidth}px)`).matches,
    );
  return match?.columns ?? fallback;
};
