import type { ReactNode } from "react";

/**
 * Shape of the injected API client. Empty on purpose: the app composition
 * root extends it through declaration merging, so `shared` never depends on
 * feature services.
 */
// oxlint-disable-next-line typescript/no-empty-interface, typescript/no-empty-object-type
export interface ApiClient {}

export interface ApiClientProviderProps {
  client: ApiClient;
  children: ReactNode;
}
