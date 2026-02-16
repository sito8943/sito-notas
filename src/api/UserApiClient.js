import { MD5 } from "crypto-js";
import config from "../config";

// db
import supabase from "../db/connection";

export class UserApiClient {
  /**
   * Takes a user object and sends it to the backend to be authenticated
   * @param {string} user - the user name
   * @param {string} password - the user password
   * @returns The response from the server.
   */
  async login(user, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user,
      password: MD5(password).toString(),
    });
    return {
      json: async () => ({
        ...data,
        status: error !== null ? error.status : 200,
      }),
    };
  }

  /**
   * Get session
   * @returns the current session
   */
  async getSession() {
    return await supabase.auth.getUser();
  }

  /**
   * Validates a session
   * @return
   */
  async validates() {
    const { data, error } = await supabase.auth.getUser();
    return {
      ...data,
      status: error?.status,
    };
  }

  /**
   * Logouts an user
   * @returns Transaction result
   */
  async logout() {
    await supabase.auth.signOut();
  }

  /**
   * Logouts an user
   * @param {string} email
   * @returns Transaction result7
   */
  async recovery(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${config.thisUrl}auth/update-password`,
    });
    return {
      json: async () => ({
        ...data,
        status: error !== null ? error?.status : 200,
      }),
    };
  }

  /**
   * Update password from recovery
   * @param {string} password
   */
  async updatePassword(password) {
    const { data, error } = await supabase.auth.updateUser({
      password: MD5(password),
    });
    return {
      json: async () => ({ ...data, status: error?.status }),
    };
  }

  /**
   *
   * @param {string} userId
   * @returns Settings of the user
   */
  async createUserSettings(userId) {
    return await supabase.from("settingUser").insert({
      id: userId,
      photo: {},
      created_at: new Date().getTime(),
    });
  }

  /**
   *
   * @param {string} userId
   * @returns Settings of the user
   */
  async fetchUserSettings(userId) {
    const { data, error } = await supabase
      .from("settingUser")
      .select()
      .eq("id", userId);
    return {
      json: async () => ({
        ...data[0],
        status: error !== null ? error.status : 200,
      }),
    };
  }
}
