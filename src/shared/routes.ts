import config from "@/shared/config";

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

/** Pages served by the Sito Notes API (not by this app) */
export const ApiRoute = {
  /** Share page of a public link: link-preview tags, then the PublicNote */
  SharePage: "/s/:token",
} as const;

export type ApiRoute = (typeof ApiRoute)[keyof typeof ApiRoute];

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
 * @param route - app route
 * @returns absolute URL of the route on the current origin
 */
export const getAbsoluteRoute = (route: string): string =>
  new URL(route, window.location.origin).toString();

/**
 * URL to share a note's public link: `<shareUrl>/<token>` (production
 * share.notes.sito8943.com), or the API's own share page without one. That
 * page has the note's link-preview tags (WhatsApp, Slack, X...) and sends
 * people on to the PublicNote page.
 * @param token - public link token of a note
 * @returns absolute share URL
 */
export const getPublicNoteShareUrl = (token: string): string => {
  const encoded = encodeURIComponent(token);
  if (config.shareUrl)
    return `${config.shareUrl.replace(/\/+$/, "")}/${encoded}`;
  const url = new URL(config.apiUrl || "/", window.location.origin);
  const path = ApiRoute.SharePage.replace(":token", encoded);
  url.pathname = `${url.pathname.replace(/\/+$/, "")}${path}`;
  return url.toString();
};
