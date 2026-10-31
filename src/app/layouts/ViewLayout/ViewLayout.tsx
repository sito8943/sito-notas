import { useEffect } from "react";
import { Outlet, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// routes
import { AppRoute } from "@/shared/routes";

// components
import { ErrorHandler } from "@/shared/components/organisms/ErrorHandler";
import { AppShellTemplate } from "@/shared/components/templates/AppShellTemplate";

// hooks
import { useScrollReset } from "@/shared/hooks";

// features
import { useAccount } from "@/features/auth";
import { useCache } from "@/features/notes";

import { AppBottomNavigation } from "./AppBottomNavigation";
import { AppSidebar } from "./AppSidebar";
import { NavbarActions } from "./NavbarActions";
import { NavbarBrand } from "./NavbarBrand";

/**
 * Signed-in layout: requires an account and keeps notes fresh per route
 */
function ViewLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { account } = useAccount();
  const { refresh } = useCache();

  // The note editor has its own top bar (title and note actions)
  const isNotePage = matchPath(AppRoute.Note, pathname) !== null;

  useScrollReset();

  // Signed out (sign-out, failed refresh, other tab): back to sign-in
  useEffect(() => {
    if (!account.user) navigate(AppRoute.Auth);
  }, [account.user, navigate]);

  useEffect(() => {
    refresh();
  }, [pathname, refresh]);

  return (
    <AppShellTemplate
      sidebar={<AppSidebar />}
      bottomNavigation={<AppBottomNavigation />}
      brand={<NavbarBrand />}
      actions={<NavbarActions />}
      hideHeader={isNotePage}
      navLabel={t("_accessibility:ariaLabels.headerActions")}
    >
      <ErrorHandler>
        <Outlet />
      </ErrorHandler>
    </AppShellTemplate>
  );
}

export default ViewLayout;
