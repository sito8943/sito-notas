import { useEffect, useState } from "react";

// @sito/ui
import { Spinner } from "@sito/ui";

import { SPLASH_EXIT_MS } from "./constants";
import type { SplashScreenProps } from "./types";
import "./styles.css";

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
      className={`splash-screen ${visible ? "" : "exiting"}`}
    >
      <div className="appear primary">{logo}</div>
      <Spinner label={label} className="splash-screen-spinner primary" />
    </div>
  );
}

export default SplashScreen;
