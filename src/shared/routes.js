export const AppRoute = {
  Home: "/",
  Note: "/note/:id",
  Settings: "/settings",
  SignOut: "/sign-out",
  Auth: "/auth",
  Recovery: "/auth/recovery",
  UpdatePassword: "/auth/update-password",
  NotFound: "/*",
};

/**
 * @param {string} id - note id
 * @returns {string} note detail route
 */
export const getNoteRoute = (id) => AppRoute.Note.replace(":id", id);
