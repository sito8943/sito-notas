import React from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IconButton({
  icon,
  type,
  name,
  onClick,
  className,
  ariaLabel,
  tooltip,
}) {
  return (
    <Tippy content={tooltip}>
      <button
        type={type}
        name={name}
        onClick={onClick}
        className={`hover:bg-pdark-hover icon-button ${className}`}
        aria-label={ariaLabel}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    </Tippy>
  );
}

IconButton.defaultProps = {
  type: "button",
};

IconButton.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  tooltip: PropTypes.string,
};

export default IconButton;
