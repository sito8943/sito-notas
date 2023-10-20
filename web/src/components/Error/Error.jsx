import { useMemo } from "react";
import PropTypes from "prop-types";

// @fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

// components
import Button from "../Button/Button";

const Error = (props) => {
  const { onRetry, text } = props;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 min-h-screen">
      <h3 className="font-bold text-error text-2xl">
        <FontAwesomeIcon icon={faCircleExclamation} className="mr-1" />
        Algo a salido mal
      </h3>
      <p className="text-error">{text}</p>
      {onRetry ? (
        <Button
          name="reload"
          onClick={onRetry}
          className="primary submit"
          aria-label="click para recargar"
        >
          Recargar
        </Button>
      ) : null}
    </div>
  );
};

Error.propTypes = {
  onRetry: PropTypes.func,
  text: PropTypes.string,
};

export default Error;
