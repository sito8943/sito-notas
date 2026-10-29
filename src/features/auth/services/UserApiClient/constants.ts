export const AuthEndpoint = {
  SignIn: "/auth/sign-in",
  SignOut: "/auth/sign-out",
  Refresh: "/auth/refresh",
  Session: "/auth/session",
  ForgotPassword: "/auth/password/forgot",
  ResetPassword: "/auth/password/reset",
  ChangePassword: "/auth/password/change",
} as const;

export type AuthEndpoint = (typeof AuthEndpoint)[keyof typeof AuthEndpoint];

/** Only `recovery` links can reset a password */
export const RECOVERY_TOKEN_TYPE = "recovery";
