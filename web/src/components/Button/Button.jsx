import React, { forwardRef } from "react";

// styles
import "./styles.css";

const Button = forwardRef(function (props, ref) {
  return (
    <button {...props} ref={ref}>
      {props.children}
    </button>
  );
});

export default Button;
