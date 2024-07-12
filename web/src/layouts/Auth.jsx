import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "some-javascript-utils/browser";

// @sito/ui
import { Notification } from "@sito/ui";

// providers
import { useAccount } from "../providers/AccountProvider";

import config from "../config";

/**
 * Auth layout
 * @returns Auth component
 */
function Auth() {
  const navigate = useNavigate();

  const { account } = useAccount();

  useEffect(() => {
    const recovering = getCookie(config.recovering);
    if (recovering?.length) navigate("/auth/update-password");
    else {
      if (account.user) navigate("/");
    }
  }, [account, navigate]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Notification />
      <Outlet />
    </div>
  );
}

export default Auth;
