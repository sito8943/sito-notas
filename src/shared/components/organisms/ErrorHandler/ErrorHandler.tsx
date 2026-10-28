import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./ErrorFallback";
import type { ErrorHandlerProps } from "./types";

function ErrorHandler({ children, onRetry }: ErrorHandlerProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onRetry}>
      {children}
    </ErrorBoundary>
  );
}

export default ErrorHandler;
