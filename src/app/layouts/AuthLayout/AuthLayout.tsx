import { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { AppRoute } from "../../../shared/routes";
import { getCookie } from "some-javascript-utils/browser";

// providers
import { useAccount } from "../../../features/auth";

// components
import { ModeButton } from "../../../shared/components/molecules/ModeButton";

// config
import config from "../../../shared/config";

/**
 * Auth layout
 * @returns Auth component
 */
function Auth() {
  const navigate = useNavigate();

  const { account } = useAccount();

  useEffect(() => {
    const recovering = getCookie(config.recovering);
    if (recovering?.length) navigate(AppRoute.UpdatePassword);
    else {
      if (account.user) navigate(AppRoute.Home);
    }
  }, [account, navigate]);

  return (
    <main className="w-full viewport flex items-center justify-center overflow-hidden">
      <Link to={AppRoute.Auth}>
        <h1 className="absolute top-3 left-3 primary uppercase text-4xl">
          Sito Notas
        </h1>
      </Link>
      <ModeButton color="primary" className="top-3 right-3" />
      <Outlet />
      <Tooltip id="tooltip" />
    </main>
  );
}

export default Auth;
