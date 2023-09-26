// @ts-check

// eslint-disable-next-line no-unused-vars
import React, { Fragment, memo, useState } from "react";

import PropTypes from "prop-types";

function SelectInput({
  id,
  options,
  className,
  label,
  leftIcon,
  rightIcon,
  inputProps,
  helperText,
}) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <div className="relative w-full">
        {leftIcon ? leftIcon : null}
        <select
          id={id}
          {...inputProps}
          className={`${inputProps.className} ${
            inputProps.disabled
              ? "dark:!text-placeholder-dark !text-white-hover"
              : ""
          }`}
        >
          {options && options.length ? (
            <Fragment>
              {options.map((option, i) => (
                <option value={i} key={option.id}>
                  {option.name}
                </option>
              ))}
            </Fragment>
          ) : null}
        </select>
        {rightIcon ? rightIcon : null}
      </div>
      <span className="text-error">{helperText}</span>
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
  label: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  inputProps: PropTypes.objectOf(PropTypes.any),
  helperText: PropTypes.string,
  generation: PropTypes.string,
};

const SelectInputMemo = memo(
  (props) => <SelectInput {...props} />,
  arePropsEqual
);

SelectInputMemo.displayName = "SelectInput";

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.id === newProps.id &&
    oldProps.options === newProps.options &&
    oldProps.className === newProps.className &&
    oldProps.label === newProps.label &&
    oldProps.leftIcon === newProps.leftIcon &&
    oldProps.rightIcon === newProps.rightIcon &&
    oldProps.inputProps === newProps.inputProps &&
    oldProps.helperText === newProps.helperText &&
    oldProps.generation === newProps.generation
  );
}

export default SelectInputMemo;
