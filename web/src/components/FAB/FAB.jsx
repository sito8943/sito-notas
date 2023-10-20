import React, { useMemo } from "react";
import PropTypes from "prop-types";

// components
import IconButton from "../IconButton/IconButton";

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
    <IconButton
      {...props}
      className={`absolute ${position} ${props.className}`}
      icon={props.icon}
    />
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
