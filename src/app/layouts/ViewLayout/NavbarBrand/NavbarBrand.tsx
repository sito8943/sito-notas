import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton } from "@sito/ui";

// routes
import { AppRoute } from "@/shared/routes";

/** Back button on inner pages; the user identity lives in the sidebar */
function NavbarBrand() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  if (pathname === AppRoute.Home) return null;

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
