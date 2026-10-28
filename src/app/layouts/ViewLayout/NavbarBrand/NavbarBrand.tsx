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

/** Back button on inner pages; user identity on home */
function NavbarBrand() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { account } = useAccount();

  const goHomeLabel = `${t("_accessibility:ariaLabels.goTo")} ${t(
    "_pages:routes.home",
  )}`;

  if (pathname !== AppRoute.Home)
    return (
      <IconButton
        as={Link}
        to={AppRoute.Home}
        color="primary"
        aria-label={goHomeLabel}
        icon={<FontAwesomeIcon icon={faChevronLeft} />}
      />
    );

  return (
    <Link
      to={AppRoute.Home}
      aria-label={goHomeLabel}
      className="flex gap-2 items-center primary"
    >
      {/* Decorative: the user name next to it already identifies the account */}
      <img
        src={noPhoto}
        alt=""
        className="rounded-full w-10 h-10 object-contain"
      />
      <span className="capitalize text-xl font-bold">
        {account.user?.email?.split("@")[0]}
      </span>
    </Link>
  );
}

export default NavbarBrand;
