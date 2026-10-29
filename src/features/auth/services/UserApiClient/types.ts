import type { RECOVERY_TOKEN_TYPE } from "./constants";

/** Reset from a `token_hash` recovery link */
export interface TokenHashResetRequest {
  tokenHash: string;
  type: typeof RECOVERY_TOKEN_TYPE;
  newPassword: string;
}

/** Reset from a link that carries Supabase session tokens */
export interface AccessTokenResetRequest {
  accessToken: string;
  refreshToken?: string;
  newPassword: string;
}

export type ResetPasswordRequest =
  TokenHashResetRequest | AccessTokenResetRequest;
