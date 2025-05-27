/* eslint-disable react/prop-types */
import { useEffect } from "react";

// icons
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @sito/ui
import { IconButton } from "@sito/ui";

// styles
import "./styles.css";

function Dialog(props) {
  const { visible, onClose, children, canBeClosed } = props;

  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [visible]);

  return (
    <div
      className={`dialog ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      {canBeClosed ? (
        <IconButton
          onClick={onClose}
          icon={<FontAwesomeIcon icon={faClose} />}
          color="primary"
          shape="filled"
          className="top-1 right-1"
        />
      ) : null}
      {visible ? children : null}
    </div>
  );
}

export default Dialog;
