import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// routes
import { AppRoute } from "@/shared/routes";

// features
import { useAccount, useRecoveringRedirect } from "@/features/auth";

// components
import { ThemeToggle } from "@/shared/components/molecules/ThemeToggle";
import { AuthTemplate } from "@/shared/components/templates/AuthTemplate";

// hooks
import { useScrollReset } from "@/shared/hooks";

/**
 * Auth layout: keeps signed-in users out of the auth screens
 */
function AuthLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { account } = useAccount();
  const redirectIfRecovering = useRecoveringRedirect();

  useScrollReset();

  useEffect(() => {
    if (!redirectIfRecovering() && account.user) navigate(AppRoute.Home);
  }, [account, navigate, redirectIfRecovering]);

  return (
    <AuthTemplate
      brand={
        <Link to={AppRoute.Auth}>
          <h1 className="primary uppercase text-4xl">
            {t("_accessibility:appName")}
          </h1>
        </Link>
      }
      actions={<ThemeToggle />}
    >
      <Outlet />
    </AuthTemplate>
  );
}

export default AuthLayout;
