import type { ChangePasswordForm } from "./types";

export const CHANGE_PASSWORD_DEFAULTS: ChangePasswordForm = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

/** Time to read the success toast before signing out */
export const SIGN_OUT_DELAY_MS = 2000;
