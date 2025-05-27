import { useEffect, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "some-javascript-utils/browser";

// @sito/ui
import { Handler } from "@sito/ui";

// providers
import { useAccount } from "../../providers/AccountProvider";
import { useAppApiClient } from "../../providers/AppApiProvider";
import { useCache } from "../../providers/CacheProvider";

// components
import Refresher from "./components/Refresher";
import Navbar from "./components/Navbar/Navbar";

// config
import config from "../../config";

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
      if (recovering?.length) navigate("/auth/update-password");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      logoutUser();
      navigate("/sign-out");
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
      <Handler>
        <Outlet />
      </Handler>
    </>
  );
}

export default View;
