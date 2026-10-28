export const AppRoute = {
  Home: "/",
  Note: "/note/:id",
  Settings: "/settings",
  SignOut: "/sign-out",
  Auth: "/auth",
  Recovery: "/auth/recovery",
  UpdatePassword: "/auth/update-password",
  NotFound: "/*",
} as const;

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute];

/**
 * @param id - note id
 * @returns note detail route
 */
export const getNoteRoute = (id: string): string =>
  AppRoute.Note.replace(":id", id);
