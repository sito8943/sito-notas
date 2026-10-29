import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// routes
import { AppRoute } from "@/shared/routes";

// features
import { useAccount } from "@/features/auth";

// components
import { ThemeToggle } from "@/shared/components/molecules/ThemeToggle";
import { AuthTemplate } from "@/shared/components/templates/AuthTemplate";

// hooks
import { useScrollReset } from "@/shared/hooks";

/**
 * Auth layout: keeps signed-in users out of the auth screens, except the
 * update-password screen opened from a recovery email
 */
function AuthLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { account } = useAccount();

  useScrollReset();

  useEffect(() => {
    if (account.user && pathname !== AppRoute.UpdatePassword)
      navigate(AppRoute.Home);
  }, [account.user, navigate, pathname]);

  return (
    <AuthTemplate actions={<ThemeToggle />}>
      <Outlet />
    </AuthTemplate>
  );
}

export default AuthLayout;
