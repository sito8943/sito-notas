import React, { forwardRef } from "react";

// styles
import "./styles.css";

function Button(props) {
  return <button {...props}>{props.children}</button>;
}

export default Button;
