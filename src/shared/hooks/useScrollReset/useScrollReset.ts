import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Jumps to the top of the window on every route change (no smooth scroll) */
function useScrollReset(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    root.style.scrollBehavior = previous;
  }, [pathname]);
}

export default useScrollReset;
