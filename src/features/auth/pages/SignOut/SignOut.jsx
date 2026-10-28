import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../../shared/routes";
import { useTranslation } from "react-i18next";

// providers
import { useAccount } from "../../providers/AccountProvider";
import { useAppApiClient } from "../../../../shared/providers/ApiClientProvider";

// components
import { SplashScreen } from "../../../../shared/components/organisms/SplashScreen";

/**
 * SignOut page
 * @returns SignOut page component
 */
function SignOut() {
  const { t } = useTranslation();
  const { logoutUser } = useAccount();

  const appApiClient = useAppApiClient();

  const navigate = useNavigate();

  const logic = useCallback(async () => {
    await appApiClient.User.logout();
    logoutUser();
    setTimeout(() => {
      navigate(AppRoute.Auth);
    }, 1000);
  }, [appApiClient.User, logoutUser, navigate]);

  useEffect(() => {
    logic();
  }, [logic]);

  return (
    <SplashScreen
      visible
      label={t("_accessibility:appName")}
      logo={
        <div>
          <h1 className="uppercase">{t("_accessibility:appName")}</h1>
        </div>
      }
    />
  );
}

export default SignOut;
