/** Response of sito-auth sign-in, refresh and session endpoints */
export interface AuthDto {
  id: number;
  username: string;
  email: string;
  admin: boolean;
  emailConfirmed: boolean;
  token: string;
  /** Only on sign-in with rememberMe, and on refresh */
  refreshToken?: string | null;
  /** ISO LocalDateTime in the server zone */
  accessTokenExpiresAt?: string | null;
}

/** Signed-in user, without tokens */
export type AuthUser = Pick<
  AuthDto,
  "id" | "username" | "email" | "admin" | "emailConfirmed"
>;

export interface Account {
  user?: AuthUser;
}
