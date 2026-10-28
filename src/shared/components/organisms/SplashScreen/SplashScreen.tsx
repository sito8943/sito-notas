import { useEffect, useState } from "react";

// @sito/ui
import { Spinner } from "@sito/ui";

import { SPLASH_EXIT_MS } from "./constants";
import type { SplashScreenProps } from "./types";

function SplashScreen({ visible = true, logo, label }: SplashScreenProps) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return undefined;
    }
    const timeout = setTimeout(() => setMounted(false), SPLASH_EXIT_MS);
    return () => clearTimeout(timeout);
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-light-dark dark:bg-dark-dark transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="appear primary">{logo}</div>
      <Spinner label={label} className="primary text-3xl" />
    </div>
  );
}

export default SplashScreen;
