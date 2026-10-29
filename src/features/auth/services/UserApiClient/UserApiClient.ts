import type {
  HttpClient,
  RefreshedTokens,
  SessionListener,
  SessionManager,
} from "@/shared/lib/http";

import type { AuthUser } from "@/features/auth/models";

import { AuthEndpoint } from "./constants";
import type { ResetPasswordRequest } from "./types";
import { parseAuthDto, toAuthUser, toRefreshedTokens } from "./utils";

/**
 * sito-auth client: sign-in, session, sign-out and password flows
 */
export class UserApiClient {
  private readonly http: HttpClient;
  private readonly session: SessionManager;

  /**
   * @param http - client bound to the sito-auth base URL
   * @param session - token owner shared with the other API clients
   */
  constructor(http: HttpClient, session: SessionManager) {
    this.http = http;
    this.session = session;
  }

  /**
   * Signs in and stores the tokens
   * @param email - account email
   * @param password - plain password (sent over HTTPS)
   * @param rememberMe - keep the session (issues a refresh token)
   * @returns the signed-in user
   */
  async signIn(
    email: string,
    password: string,
    rememberMe: boolean,
  ): Promise<AuthUser> {
    const dto = parseAuthDto(
      await this.http.post<unknown>(
        AuthEndpoint.SignIn,
        { email, password, rememberMe },
        { auth: false },
      ),
    );
    this.session.start({ ...toRefreshedTokens(dto), remember: rememberMe });
    return toAuthUser(dto);
  }

  /**
   * Exchanges a refresh token. Used by the SessionManager only.
   * @param refreshToken - current refresh token (revoked by the server)
   * @returns the new tokens
   */
  async refresh(refreshToken: string): Promise<RefreshedTokens> {
    const dto = parseAuthDto(
      await this.http.post<unknown>(
        AuthEndpoint.Refresh,
        { refreshToken },
        { auth: false },
      ),
    );
    return toRefreshedTokens(dto);
  }

  /**
   * @param listener - called with the tokens, or null when the session ends
   * @returns unsubscribe function
   */
  onSessionChange(listener: SessionListener): () => void {
    return this.session.subscribe(listener);
  }

  /** @returns whether tokens are stored */
  hasSession(): boolean {
    return this.session.hasSession();
  }

  /**
   * Validates the stored session against sito-auth
   * @returns the signed-in user
   */
  async getSession(): Promise<AuthUser> {
    return toAuthUser(
      parseAuthDto(await this.http.get<unknown>(AuthEndpoint.Session)),
    );
  }

  /**
   * Revokes the refresh token and clears the local session. Never throws.
   */
  async signOut(): Promise<void> {
    const tokens = this.session.getTokens();
    this.session.clear();
    if (!tokens) return;
    try {
      await this.http.post(
        AuthEndpoint.SignOut,
        { refreshToken: tokens.refreshToken },
        {
          auth: false,
          headers: { Authorization: `Bearer ${tokens.accessToken}` },
        },
      );
    } catch (error) {
      console.warn(error);
    }
  }

  /**
   * Sends the reset-password email
   * @param email - account email
   * @param redirectTo - URL the email link opens
   */
  async forgotPassword(email: string, redirectTo: string): Promise<void> {
    await this.http.post(
      AuthEndpoint.ForgotPassword,
      { email, redirectTo },
      { auth: false },
    );
  }

  /**
   * Sets a new password from a recovery link
   * @param request - token from the link plus the new password
   */
  async resetPassword(request: ResetPasswordRequest): Promise<void> {
    await this.http.post(AuthEndpoint.ResetPassword, request, { auth: false });
  }

  /**
   * Changes the password of the signed-in user. sito-auth revokes every
   * token afterwards, so the caller should sign out.
   * @param currentPassword - current password
   * @param newPassword - new password
   */
  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    await this.http.post(AuthEndpoint.ChangePassword, {
      currentPassword,
      newPassword,
    });
  }
}
