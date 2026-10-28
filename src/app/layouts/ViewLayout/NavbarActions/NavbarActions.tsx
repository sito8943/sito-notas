import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton, Tooltip } from "@sito/ui";

// routes
import { AppRoute } from "@/shared/routes";

// components
import { ThemeToggle } from "@/shared/components/molecules/ThemeToggle";

/** Header actions: theme, settings and sign out */
function NavbarActions() {
  const { t } = useTranslation();

  const settingsLabel = `${t("_accessibility:ariaLabels.goTo")} ${t(
    "_pages:routes.settings",
  )}`;
  const signOutLabel = t("_pages:routes.signOut");

  return (
    <>
      <ThemeToggle />
      <Tooltip label={settingsLabel} side="bottom">
        <IconButton
          as={Link}
          to={AppRoute.Settings}
          color="primary"
          aria-label={settingsLabel}
          icon={<FontAwesomeIcon icon={faGear} />}
        />
      </Tooltip>
      <Tooltip label={signOutLabel} side="bottom" align="end">
        <IconButton
          as={Link}
          to={AppRoute.SignOut}
          color="primary"
          aria-label={signOutLabel}
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
        />
      </Tooltip>
    </>
  );
}

export default NavbarActions;
