import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// @sito/ui
import { Button } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// routes
import { AppRoute } from "@/shared/routes";

// features
import { useAccount } from "@/features/auth";
import { SettingsSection } from "@/features/settings/components/SettingsSection";

import "./styles.css";

/**
 * Account section: who is signed in, and sign out. Read only: sito-auth
 * does not change the username or email.
 */
function AccountSettings() {
  const { t } = useTranslation();
  const { account } = useAccount();
  const user = account.user;

  return (
    <SettingsSection title={t("_pages:settings.sections.account.title")}>
      {user ? (
        <dl className="account-settings-list">
          <div className="account-settings-row">
            <dt className="account-settings-term">
              {t("_pages:settings.sections.account.username")}
            </dt>
            <dd className="account-settings-value">{user.username}</dd>
          </div>
          <div className="account-settings-row">
            <dt className="account-settings-term">
              {t("_pages:settings.sections.account.email")}
            </dt>
            <dd className="account-settings-value">
              {user.email}
              {user.emailConfirmed ? null : (
                <span className="account-settings-badge">
                  {t("_pages:settings.sections.account.unconfirmed")}
                </span>
              )}
            </dd>
          </div>
        </dl>
      ) : null}
      <Button
        as={Link}
        to={AppRoute.SignOut}
        variant="outlined"
        color="primary"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        {t("_pages:routes.signOut")}
      </Button>
    </SettingsSection>
  );
}

export default AccountSettings;
