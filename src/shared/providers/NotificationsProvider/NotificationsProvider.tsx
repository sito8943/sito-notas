import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { ToastProvider } from "@sito/ui";

import { TOAST_PLACEMENT, TOAST_VARIANT } from "./constants";
import type { NotificationsProviderProps } from "./types";

/**
 * `@sito/ui` toasts for the whole app (`useToast()`), as in Sito Presentation
 * Deck: filled status toasts, translated region and close labels
 */
function NotificationsProvider({ children }: NotificationsProviderProps) {
  const { t } = useTranslation();

  return (
    <ToastProvider
      placement={TOAST_PLACEMENT}
      variant={TOAST_VARIANT}
      label={t("_accessibility:toast.label")}
      closeLabel={t("_accessibility:toast.close")}
      closeIcon={<FontAwesomeIcon icon={faXmark} />}
    >
      {children}
    </ToastProvider>
  );
}

export default NotificationsProvider;
