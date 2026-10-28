import type { ReactNode } from "react";

export interface ErrorHandlerProps {
  children: ReactNode;
  onRetry?: () => void;
}
