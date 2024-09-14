import { useEffect, memo, useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// providers
import { useNotification } from "../providers/NotificationProvider";

/**
 * Notification
 * @returns {object} React component
 */
// eslint-disable-next-line react/display-name
const Notification = memo(() => {
  const location = useLocation();
  const { t } = useTranslation();
  const { notification, setNotification, params, state } = useNotification();

  const [notificationOpen, setNotificationOpen] = useState(Boolean(notification.length));

  const localState = useMemo(() => {
    switch (notification) {
      case "notConnected":
      case "images":
      case "400":
      case "401":
      case "403":
      case "404":
      case "409":
      case "429":
        return "bad";
      case "500":
        return "ugly";
      case "deleted":
      case "restored":
      case "200":
      case "201":
      case "204":
        return "good";
      default:
        return "";
    }
  }, [notification]);

  const notificationClass = useMemo(() => {
    const lNotificationClasses = {
      good: "bg-green-500 text-black",
      bad: "bg-red-500",
      ugly: "bg-red-500",
    };
    if (state.length) return lNotificationClasses[state];
    return localState === "" ? lNotificationClasses.bad : lNotificationClasses[localState];
  }, [localState, state]);

  useEffect(() => {
    setNotificationOpen(Boolean(notification.length));
  }, [notification]);

  const clean = useCallback(() => {
    setNotificationOpen(false);
    setTimeout(() => {
      setNotification("");
    }, 1000);
  }, [setNotification]);

  useEffect(() => {
    clean();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (notification !== "") {
      window.addEventListener("click", clean);
    }

    return () => {
      window.removeEventListener("click", clean);
    };
  }, [notification, clean]);

  return (
    <>
      {
        <div
          className={`${notificationOpen ? "opacity-1 scale-100" : "pointer-events-none opacity-0"} transition-all fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-50`}
        >
          <div
            className={`${notificationClass} border border-transparent text-white text-sm p-3 md:rounded shadow-lg flex justify-between`}
          >
            <div className={`text-white inline-flex`}>
              {localState === "" ? notification : t(`_accessibility:messages.${notification}`, params)}
            </div>
            <button
              className="text-white hover:text-[red] pl-2 ml-3 border-l border-slate-200"
              onClick={() => setNotificationOpen(false)}
            >
              <span className="sr-only">{t("_accessibility:buttons.close")}</span>
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 16 16">
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      }
    </>
  );
});

export default Notification;
