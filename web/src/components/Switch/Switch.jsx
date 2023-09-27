import { memo } from "react";
import PropTypes from "prop-types";

// styles
import "./style.css";

function Switch({ label, value, onChange, id, className }) {
  return (
    <div
      className={`flex gap-3 items-center justify-start ${className}`}
      onClick={onChange}
    >
      <input
        id={id}
        checked={value}
        onChange={onChange}
        className="check-input"
        type="checkbox"
      />
      <div
        className={`switcher ${value ? "bg-primary" : "bg-secondary"}`}
      >
        <div className={`ball ${value ? "activated" : "deactivated"}`} />
      </div>
      <label className="">{label}</label>
    </div>
  );
}

Switch.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

const SwitchMemo = memo((props) => <Switch {...props} />, arePropsEqual);
SwitchMemo.displayName = "Switch";

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.label === newProps.label &&
    oldProps.value === newProps.value &&
    oldProps.onChange === newProps.onChange &&
    oldProps.id === newProps.id &&
    oldProps.className === newProps.className
  );
}

export default SwitchMemo;
