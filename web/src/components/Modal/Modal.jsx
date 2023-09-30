import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

// font awesome
import { faClose } from "@fortawesome/free-solid-svg-icons";

// components
import FloatingButton from "../FAB/FAB";

function Modal({ visible, onClose, children }) {
  const onEscapePress = useCallback((e) => {
    const { key } = e;
    if (key === "Escape") {
      onClose();
      e.target?.blur();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onEscapePress);
    return () => {
      window.removeEventListener("keydown", onEscapePress);
    };
  }, [onEscapePress]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-screen transition bg-dark-drawer-background backdrop-blur-sm ${
        !visible ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <FloatingButton
        onClick={onClose}
        name="close-dialog"
        ariaLabel="click para cerrar el diálogo"
        className="top-1 text-error"
        icon={faClose}
      />
      {visible ? children : null}
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Modal;
