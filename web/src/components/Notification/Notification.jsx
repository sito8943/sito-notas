import { useRef, useState, useEffect, useCallback } from "react";

// @fortawesome
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// contexts
import { useNotification } from "../../contexts/NotificationProvider";

// styles
import "./styles.css";

export default function Notification() {
  const { notificationState, setNotificationState } = useNotification();

  const { languageState } = useLanguage();

  const [open, setOpen] = useState(false);
  const [openR, setOpenR] = useState(false);

  useEffect(() => {
    if (notificationState.visible) {
      setOpen(true);
      setOpenR(true);
      setTimeout(() => {
        setNotificationState({ type: "hide" });
      }, 6000);
    }
  }, [notificationState]);

  const handleClose = useCallback(() => {
    if (open) setOpen(false);
    if (openR) setTimeout(() => setOpenR(false), 400);
    setNotificationState({ type: "hide" });
  }, [open, openR, setNotificationState]);

  const getColor = useCallback(() => {
    switch (notificationState.type) {
      case "info":
        return "bg-info";
      case "warning":
        return "bg-warning";
      case "success":
        return "bg-success";
      default:
        return "bg-error";
    }
  }, [notificationState]);

  const ref = useRef(null);

  useEffect(() => {
    if (openR) window.addEventListener("click", handleClose);
    else window.removeEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [openR, ref, handleClose]);

  return (
    <div
      ref={ref}
      className={`fixed left-1 bottom-1 z-40 ${open ? "appear" : "disappear"}`}
    >
      {openR ? (
        <div
          className={`relative notification rounded-scard p-5 ${getColor()} ${css(
            {
              maxWidth: "300px",
              border: "1px solid #8080804a",
            }
          )}`}
        >
          <button
            onClick={handleClose}
            name="close-notification"
            className="absolute top-1 right-2"
            aria-label={languageState.texts.ariaLabels.closeNotification}
          >
            <FontAwesomeIcon className="text-white" icon={faClose} />
          </button>
          <p className="text-body1 text-white">{notificationState.message}</p>
        </div>
      ) : null}
    </div>
  );
}
