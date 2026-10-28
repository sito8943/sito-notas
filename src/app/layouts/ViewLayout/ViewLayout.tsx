import { useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// routes
import { AppRoute } from "@/shared/routes";

// components
import { ErrorHandler } from "@/shared/components/organisms/ErrorHandler";
import { AppShellTemplate } from "@/shared/components/templates/AppShellTemplate";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// hooks
import { useScrollReset } from "@/shared/hooks";

// features
import { useRecoveringRedirect } from "@/features/auth";
import { useCache } from "@/features/notes";

import { NavbarActions } from "./NavbarActions";
import { NavbarBrand } from "./NavbarBrand";
import { INVALID_SESSION_STATUSES } from "./constants";

/**
 * Signed-in layout: validates the session and keeps notes fresh per route
 */
function ViewLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const appApiClient = useAppApiClient();
  const redirectIfRecovering = useRecoveringRedirect();
  const { refresh } = useCache();

  useScrollReset();

  const validateSession = useCallback(async () => {
    try {
      const { status } = await appApiClient.User.validates();
      if (status !== undefined && INVALID_SESSION_STATUSES.includes(status))
        throw new Error(String(status));
      redirectIfRecovering();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      // SignOut clears the local session and the Supabase one
      navigate(AppRoute.SignOut);
    }
  }, [appApiClient.User, navigate, redirectIfRecovering]);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  useEffect(() => {
    refresh();
  }, [pathname, refresh]);

  return (
    <AppShellTemplate
      brand={<NavbarBrand />}
      actions={<NavbarActions />}
      navLabel={t("_accessibility:ariaLabels.mainNavigation")}
    >
      <ErrorHandler>
        <Outlet />
      </ErrorHandler>
    </AppShellTemplate>
  );
}

export default ViewLayout;
