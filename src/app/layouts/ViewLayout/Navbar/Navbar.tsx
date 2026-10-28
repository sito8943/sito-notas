import { Link, useLocation } from "react-router-dom";
import { AppRoute } from "@/shared/routes";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faArrowRightFromBracket,
  faMoon,
  faSun,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton } from "@sito/ui";

// providers
import { ThemeMode, useTheme } from "@/shared/providers/ThemeProvider";
import { useAccount } from "@/features/auth";

// images
import noPhoto from "@/assets/images/no-photo.webp";

function Navbar() {
  const { t } = useTranslation();

  const { account } = useAccount();
  const { toggleMode, mode } = useTheme();

  const location = useLocation();

  return (
    <header className="m-auto w-full px-10">
      <div className={"flex w-full justify-between py-3"}>
        <div className="flex gap-3">
          {location.pathname !== AppRoute.Home ? (
            <IconButton
              as={Link}
              to={AppRoute.Home}
              color="primary"
              aria-label={`${t("_accessibility:ariaLabels.goTo")} ${t(
                "_pages:routes.home",
              )}`}
              icon={<FontAwesomeIcon icon={faChevronLeft} />}
            />
          ) : (
            <Link
              aria-label={`${t("_accessibility:ariaLabels.goTo")} ${t(
                "_pages:routes.home",
              )}`}
              to={AppRoute.Home}
              className="z-10 flex gap-2 items-center primary"
            >
              <img
                src={noPhoto}
                alt="user-photo"
                className="rounded-full w-10 h-10 object-contain"
              />
              <h1 className="capitalize text-xl">
                {account.user?.email?.split("@")[0]}
              </h1>
            </Link>
          )}
        </div>
        <nav className="z-10 flex">
          <IconButton
            color="primary"
            name="toggle-theme"
            data-tooltip-id="tooltip"
            data-tooltip-content={
              mode === ThemeMode.Dark
                ? t("_accessibility:ariaLabels.lightMode")
                : t("_accessibility:ariaLabels.darkMode")
            }
            onClick={() => toggleMode()}
            aria-label={
              mode === ThemeMode.Dark
                ? t("_accessibility:ariaLabels.lightMode")
                : t("_accessibility:ariaLabels.darkMode")
            }
            icon={
              <FontAwesomeIcon
                icon={mode === ThemeMode.Dark ? faSun : faMoon}
              />
            }
          />
          <IconButton
            as={Link}
            to={AppRoute.Settings}
            color="primary"
            aria-label={`${t("_accessibility:ariaLabels.goTo")} ${t(
              "_pages:routes.settings",
            )}`}
            icon={<FontAwesomeIcon icon={faGear} />}
          />
          <IconButton
            as={Link}
            to={AppRoute.SignOut}
            color="primary"
            aria-label={t("_pages:routes.signOut")}
            icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
          />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
