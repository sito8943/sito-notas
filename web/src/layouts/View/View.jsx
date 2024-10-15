import { useEffect, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { getCookie } from "some-javascript-utils/browser";

// @sito/ui
import { Handler } from "@sito/ui";

// providers
import { useAccount } from "../../providers/AccountProvider";
import { queryClient, useAppApiClient } from "../../providers/AppApiProvider";

// utils
import { ReactQueryKeys } from "../../utils/queryKeys";

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// config
import config from "../../config";

function View() {
  const location = useLocation();

  const { logoutUser } = useAccount();

  const navigate = useNavigate();
  const appApiClient = useAppApiClient();

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
    const split = location.pathname.split("/");
    switch (split.length) {
      case 3: {
        // details
        const [, , id] = split;
        queryClient.invalidateQueries([ReactQueryKeys.Notes, id]);
        break;
      }
      case 2: {
        if (!split[0].length && !split[1].length) {
          queryClient.invalidateQueries([ReactQueryKeys.Notes]);
        }
      }
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <div className="viewport">
        <Handler>
          <Outlet />
        </Handler>
      </div>
      <Footer />
    </div>
  );
}

export default View;
