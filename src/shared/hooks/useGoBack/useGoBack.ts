import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Goes to the previous page, or to `fallback` when the app was opened
 * directly on this page (no history to go back to)
 * @param fallback - route used without history
 * @returns goBack()
 */
function useGoBack(fallback: string) {
  const navigate = useNavigate();
  const { key } = useLocation();

  return useCallback(() => {
    // React Router gives the first entry of the session the "default" key
    if (key === "default") navigate(fallback, { replace: true });
    else navigate(-1);
  }, [fallback, key, navigate]);
}

export default useGoBack;
