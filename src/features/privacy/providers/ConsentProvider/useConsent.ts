import { useContext } from "react";

import { ConsentContext } from "./ConsentContext";
import type { ConsentContextValue } from "./types";

function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (context === undefined)
    throw new Error("useConsent must be used within a ConsentProvider");
  return context;
}

export default useConsent;
