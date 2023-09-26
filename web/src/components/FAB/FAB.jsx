import React, { useMemo } from "react";
import PropTypes from "prop-types";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FAB(props) {
  const position = useMemo(() => {
    switch (props.position) {
      case "top-left":
        return "top-1 left-1";
      case "top-right":
        return "top-1 right-1";
      case "bottom-left":
        return "bottom-1 left-1";
      default: // bottom - right
        return "bottom-1 right-1";
    }
  }, [props.position]);

  return (
    <button
      {...props}
      className={`absolute icon-button ${position} ${props.className}`}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
}

FAB.propTypes = {
  icon: PropTypes.object.isRequired,
  position: PropTypes.oneOf([
    "top-left",
    "top-right",
    "bottom-right",
    "bottom-left",
  ]),
};

export default FAB;
