import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRegisterSW } from "virtual:pwa-register/react";

// @sito/ui
import { Dialog, DialogActions, useToast } from "@sito/ui";

import { scheduleUpdateChecks } from "./utils";

/**
 * Asks the user to reload when a new version of the app is installed in the
 * background, and confirms once the app can work offline.
 */
function PwaUpdateDialog() {
  const { t } = useTranslation();
  const toast = useToast();
  const [updating, setUpdating] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW: scheduleUpdateChecks,
    onRegisterError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });

  useEffect(() => {
    if (!offlineReady) return;
    toast({ message: t("_accessibility:pwa.offlineReady"), color: "success" });
    setOfflineReady(false);
  }, [offlineReady, setOfflineReady, t, toast]);

  const update = async () => {
    setUpdating(true);
    // Activates the waiting worker; the page reloads when it takes control
    await updateServiceWorker(true);
  };

  return (
    <Dialog
      open={needRefresh}
      title={t("_accessibility:pwa.update.title")}
      onClose={() => setNeedRefresh(false)}
      closeLabel={t("_accessibility:buttons.close")}
      closeOnBackdropClick={!updating}
      closeOnEscape={!updating}
      showCloseButton={!updating}
    >
      <p className="mb-4">{t("_accessibility:pwa.update.description")}</p>
      <DialogActions
        alignEnd
        primaryText={t("_accessibility:pwa.update.confirm")}
        cancelText={t("_accessibility:pwa.update.later")}
        onPrimaryClick={() => void update()}
        onCancel={() => setNeedRefresh(false)}
        isLoading={updating}
        disabled={updating}
        primaryProps={{ color: "primary", variant: "submit" }}
      />
    </Dialog>
  );
}

export default PwaUpdateDialog;
