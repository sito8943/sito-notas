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

// images
import noPhoto from "@/assets/images/no-photo.webp";

import "./styles.css";

/**
 * Back button on inner pages; on home, the greeting (plus the avatar on small
 * screens, where the sidebar is hidden)
 */
function NavbarBrand() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { account } = useAccount();

  if (pathname === AppRoute.Home)
    return (
      <div className="navbar-user">
        <img
          src={noPhoto}
          alt={account.user?.username ?? ""}
          className="navbar-user-avatar"
        />
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
