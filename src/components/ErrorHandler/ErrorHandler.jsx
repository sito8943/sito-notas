/* eslint-disable react/prop-types */
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./ErrorFallback";

function ErrorHandler({ children, onRetry }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onRetry}>
      {children}
    </ErrorBoundary>
  );
}

export default ErrorHandler;
