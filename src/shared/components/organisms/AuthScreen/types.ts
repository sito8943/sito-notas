import type { FormEventHandler, ReactNode } from "react";

export interface AuthScreenProps {
  title: string;
  logo?: ReactNode;
  /** Route for the back arrow next to the title; omit to hide it */
  backTo?: string;
  backLabel?: string;
  /** Form fields */
  children: ReactNode;
  /** "Question? Link" lines under the fields */
  helperLinks?: ReactNode;
  /** Submit and secondary buttons */
  actions: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}
