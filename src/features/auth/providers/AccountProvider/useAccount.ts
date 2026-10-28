import { useContext } from "react";

import { AccountContext } from "./AccountContext";
import type { AccountContextValue } from "./types";

/**
 * useAccount hook
 * @returns account state and session actions
 */
function useAccount(): AccountContextValue {
  const context = useContext(AccountContext);
  if (context === undefined)
    throw new Error("accountContext must be used within a Provider");
  return context;
}

export default useAccount;
