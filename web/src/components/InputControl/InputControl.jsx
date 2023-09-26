import { Fragment, useMemo } from "react";
import PropTypes from "prop-types";

// styles.module.css
import styles from "./styles.module.css";

function InputControl(props) {
  const options = useMemo(() => {
    if (props.options)
      return props.options.map((option) => (
        <option
          key={typeof option === "object" ? option.id : option}
          value={typeof option === "object" ? option.id : option}
        >
          {typeof option === "object" ? option.text : option}
        </option>
      ));
    return <Fragment />;
  }, [props.options]);

  return (
    <div className={styles.inputControl}>
      <label htmlFor={props.id}>{props.label}</label>
      {props.type !== "select" ? <input {...props} /> : null}
      {props.type === "select" ? <select {...props}>{options}</select> : null}
    </div>
  );
}

InputControl.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.node),
  type: PropTypes.oneOf(["text", "number", "select", "email"]),
};

export default InputControl;
