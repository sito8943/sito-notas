export const AppRoute = {
  Home: "/",
  Note: "/note/:id",
  Tags: "/tags",
  Calendar: "/calendar",
  Shared: "/shared",
  Trash: "/trash",
  Settings: "/settings",
  SignOut: "/sign-out",
  Auth: "/auth",
  Recovery: "/auth/recovery",
  UpdatePassword: "/auth/update-password",
  PublicNote: "/s/:token",
  NotFound: "/*",
} as const;

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute];

/** Query/hash params that sito-auth recovery links carry */
export const AuthRouteQueryParam = {
  Error: "error",
  ErrorDescription: "error_description",
  AccessToken: "access_token",
  AccessTokenLegacy: "accessToken",
  RefreshToken: "refresh_token",
  Token: "token",
  TokenHash: "token_hash",
  Type: "type",
} as const;

export type AuthRouteQueryParam =
  (typeof AuthRouteQueryParam)[keyof typeof AuthRouteQueryParam];

/**
 * @param id - note id
 * @returns note detail route
 */
export const getNoteRoute = (id: number): string =>
  AppRoute.Note.replace(":id", String(id));

/**
 * @param token - public link token of a note
 * @returns public (no login) route of the note
 */
export const getPublicNoteRoute = (token: string): string =>
  AppRoute.PublicNote.replace(":token", encodeURIComponent(token));

/**
 * @param route - app route
 * @returns absolute URL of the route on the current origin
 */
export const getAbsoluteRoute = (route: string): string =>
  new URL(route, window.location.origin).toString();
