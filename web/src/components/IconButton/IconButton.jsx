import React from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Button from "../Button/Button";

// styles
import "./styles.css";

function IconButton(props) {
  return (
    <Tippy content={props.tooltip}>
      <Button className={`hover:bg-pdark-hover icon-button ${props.className}`}>
        <FontAwesomeIcon icon={props.icon} />
      </Button>
    </Tippy>
  );
}

IconButton.defaultProps = {
  type: "button",
};

IconButton.propTypes = {
  type: PropTypes.string,
  tooltip: PropTypes.string,
};

export default IconButton;
