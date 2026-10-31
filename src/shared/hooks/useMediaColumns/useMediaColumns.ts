import { useEffect, useState } from "react";

import type { MediaColumnsRule } from "./types";
import { getMediaColumns } from "./utils";

/**
 * Number of layout columns for the viewport, updated on resize
 * @param rules - max-width breakpoints and their column count (keep stable)
 * @param fallback - columns above every breakpoint
 * @returns current column count
 */
function useMediaColumns(rules: MediaColumnsRule[], fallback: number) {
  const [columns, setColumns] = useState(() =>
    getMediaColumns(rules, fallback),
  );

  useEffect(() => {
    const queries = rules.map((rule) =>
      window.matchMedia(`(max-width: ${rule.maxWidth}px)`),
    );
    const update = () => setColumns(getMediaColumns(rules, fallback));
    queries.forEach((query) => query.addEventListener("change", update));
    update();
    return () =>
      queries.forEach((query) => query.removeEventListener("change", update));
  }, [rules, fallback]);

  return columns;
}

export default useMediaColumns;
