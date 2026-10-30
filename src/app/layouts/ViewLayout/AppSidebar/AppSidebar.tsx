import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// components
import { Sidebar } from "@/shared/components/molecules/Sidebar";

// providers
import { SIDEBAR_OVERLAY_QUERY, useSidebar } from "@/shared/providers";

// features
import { useAccount } from "@/features/auth";

// images
import noPhoto from "@/assets/images/no-photo.webp";

import { SIDEBAR_FOOTER_ITEMS, SIDEBAR_ITEMS } from "./constants";
import { toNavItems } from "./utils";

/** Wires the Sidebar molecule to the account, routes and i18n */
function AppSidebar() {
  const { t } = useTranslation();
  const { account } = useAccount();
  const { open, setOpen, toggleOpen } = useSidebar();

  const items = useMemo(() => toNavItems(SIDEBAR_ITEMS, t), [t]);
  const footerItems = useMemo(() => toNavItems(SIDEBAR_FOOTER_ITEMS, t), [t]);

  // On small screens the expanded sidebar overlays the page: close it on navigate
  const handleNavigate = useCallback(() => {
    if (window.matchMedia(SIDEBAR_OVERLAY_QUERY).matches) setOpen(false);
  }, [setOpen]);

  return (
    <Sidebar
      user={{
        name: account.user?.username ?? "",
        avatarSrc: noPhoto,
      }}
      // Visual only until categories exist
      action={{
        label: t("_pages:sidebar.addCategory"),
        icon: <FontAwesomeIcon icon={faPlus} />,
      }}
      items={items}
      footerItems={footerItems}
      open={open}
      onToggle={toggleOpen}
      onNavigate={handleNavigate}
      labels={{
        navigation: t("_accessibility:ariaLabels.mainNavigation"),
        expand: t("_accessibility:ariaLabels.expandSidebar"),
        collapse: t("_accessibility:ariaLabels.collapseSidebar"),
      }}
    />
  );
}

export default AppSidebar;
