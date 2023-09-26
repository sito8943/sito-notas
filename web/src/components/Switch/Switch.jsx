import { memo } from "react";
import PropTypes from "prop-types";

// styles
import "./style.css";

function Switch({ label, value, onChange, id }) {
  return (
    <div className="flex gap-3 cursor-pointer items-center justify-start" onClick={onChange}>
      <input
        id={id}
        checked={value}
        onChange={onChange}
        className="check-input"
        type="checkbox"
      />
      <div
        className={`switcher ${value ? "bg-success" : "bg-placeholder-dark"}`}
      >
        <div className={`ball ${value ? "activated" : "deactivated"}`} />
      </div>
      <label className="cursor-pointer">{label}</label>
    </div>
  );
}

Switch.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

const SwitchMemo = memo((props) => <Switch {...props} />, arePropsEqual);
SwitchMemo.displayName = "Switch";

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.label === newProps.label &&
    oldProps.value === newProps.value &&
    oldProps.onChange === newProps.onChange &&
    oldProps.id === newProps.id
  );
}

export default SwitchMemo;
