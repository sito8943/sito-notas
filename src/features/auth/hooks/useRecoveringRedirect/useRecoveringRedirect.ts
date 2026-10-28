import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "some-javascript-utils/browser";

import config from "@/shared/config";
import { AppRoute } from "@/shared/routes";

/**
 * Sends the user to the update-password screen while a recovery is pending
 * @returns a function that redirects and reports whether it did
 */
function useRecoveringRedirect(): () => boolean {
  const navigate = useNavigate();

  return useCallback(() => {
    const recovering = getCookie(config.recovering);
    if (!recovering?.length) return false;
    navigate(AppRoute.UpdatePassword);
    return true;
  }, [navigate]);
}

export default useRecoveringRedirect;
