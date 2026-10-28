/* eslint-disable react/prop-types */

function Field(props) {
  const {
    id,
    label,
    leftComponent,
    rightComponent,
    helperText,
    helperTextClassName = "",
    className = "",
    children,
  } = props;

  const helperId = id && helperText ? `${id}-helper` : undefined;

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label ? (
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      ) : null}
      <div className="flex items-center gap-2 w-full rounded-3xl bg-light-default dark:bg-dark-default">
        {leftComponent ? (
          <span className="flex items-center pl-3">{leftComponent}</span>
        ) : null}
        {children(helperId)}
        {rightComponent ? (
          <span className="flex items-center pr-3">{rightComponent}</span>
        ) : null}
      </div>
      {helperText ? (
        <p id={helperId} className={`text-sm ${helperTextClassName}`}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default Field;
