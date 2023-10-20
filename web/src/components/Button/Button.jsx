import React, { forwardRef, useState } from "react";
import Tippy from "@tippyjs/react";

// styles
import "./styles.css";

const Button = forwardRef(function (props, ref) {
  const [showTooltip, setShowTooltip] = useState(false);
  const hideTooltip = () => setShowTooltip(false);

  return (
    <Tippy
      content={props.tooltip}
      onClickOutside={hideTooltip}
      visible={showTooltip}
    >
      <button
        {...props}
        ref={ref}
        className={`button ${props.className}`}
        onMouseEnter={() =>
          props.tooltip && props.tooltip.length ? setShowTooltip(true) : null
        }
        onMouseLeave={() => setShowTooltip(false)}
      >
        {props.children}
      </button>
    </Tippy>
  );
});

export default Button;
