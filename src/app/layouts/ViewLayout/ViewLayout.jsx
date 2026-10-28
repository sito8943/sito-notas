import { Tooltip } from "react-tooltip";
import { useEffect, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../shared/routes";
import { getCookie } from "some-javascript-utils/browser";

// components
import { ErrorHandler } from "../../../shared/components/organisms/ErrorHandler";

// providers
import { useAccount } from "../../../features/auth";
import { useAppApiClient } from "../../../shared/providers/ApiClientProvider";
import { useCache } from "../../../features/notes";

// components
import { Refresher } from "./Refresher";
import { Navbar } from "./Navbar";

// config
import config from "../../../shared/config";

function View() {
  const { logoutUser } = useAccount();

  const navigate = useNavigate();
  const appApiClient = useAppApiClient();

  const { refresh } = useCache();

  const refreshToken = useCallback(async () => {
    try {
      const value = await appApiClient.User.validates();
      if (value.status === 400) throw Error("400");
      if (value.status === 401) throw Error("401");
      if (value.status === 403) throw Error("403");
      const recovering = getCookie(config.recovering);
      if (recovering?.length) navigate(AppRoute.UpdatePassword);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      logoutUser();
      navigate(AppRoute.SignOut);
    }
  }, [logoutUser, appApiClient.User, navigate]);

  useEffect(() => {
    refreshToken();
  }, [navigate, refreshToken]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <Navbar />
      <Refresher />
      <ErrorHandler>
        <Outlet />
      </ErrorHandler>
      <Tooltip id="tooltip" />
    </>
  );
}

export default View;
