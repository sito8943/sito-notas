import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton } from "@sito/ui";

// routes
import { AppRoute } from "@/shared/routes";

// features
import { useAccount } from "@/features/auth";

import "./styles.css";

/**
 * Back button on inner pages; on home, the greeting (no avatar anywhere)
 */
function NavbarBrand() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { account } = useAccount();

  if (pathname === AppRoute.Home)
    return (
      <div className="navbar-user">
        <h1 className="navbar-user-welcome">
          {t("_pages:home.welcome", { user: account.user?.username })}
        </h1>
      </div>
    );

  const goHomeLabel = `${t("_accessibility:ariaLabels.goTo")} ${t(
    "_pages:routes.home",
  )}`;

  return (
    <IconButton
      as={Link}
      to={AppRoute.Home}
      color="primary"
      aria-label={goHomeLabel}
      icon={<FontAwesomeIcon icon={faChevronLeft} />}
    />
  );
}

export default NavbarBrand;
