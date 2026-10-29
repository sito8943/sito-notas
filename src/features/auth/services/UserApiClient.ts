import { MD5 } from "crypto-js";
import type { Session, User } from "@supabase/supabase-js";

import { AppRoute } from "@/shared/routes";

// db
import supabase from "@/shared/lib/supabase";

// models
import type { UserSettings } from "@/features/auth/models";

/** Mimics a fetch Response so callers can keep the `await res.json()` flow */
export interface JsonResponse<T> {
  json: () => Promise<T>;
}

export interface StatusResult {
  status?: number;
  message?: string;
}

export interface LoginResult extends StatusResult {
  user: User | null;
  session: Session | null;
}

export type UserSettingsResult = Partial<UserSettings> & StatusResult;

/** Passwords are stored as their MD5 hash (legacy contract, keep in sync) */
const hashPassword = (password: string): string => MD5(password).toString();

export class UserApiClient {
  /**
   * Takes a user object and sends it to the backend to be authenticated
   * @param user - the user name
   * @param password - the user password
   * @returns The response from the server.
   */
  async login(
    user: string,
    password: string,
  ): Promise<JsonResponse<LoginResult>> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user,
      password: hashPassword(password),
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
   */
  async logout(): Promise<void> {
    await supabase.auth.signOut();
  }

  /**
   * Sends a password recovery email
   * @param email - account email
   */
  async recovery(email: string): Promise<JsonResponse<StatusResult>> {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${AppRoute.UpdatePassword}`,
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
   * @param password - new password
   */
  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: hashPassword(password),
    });
    return {
      error,
      json: async () => ({ ...data, status: error?.status }),
    };
  }

  /**
   * @param userId - user id
   * @returns insert result
   */
  async createUserSettings(userId: string) {
    return await supabase.from("settingUser").insert({
      id: userId,
      photo: {},
      created_at: new Date().getTime(),
    });
  }

  /**
   * @param userId - user id
   * @returns Settings of the user
   */
  async fetchUserSettings(
    userId: string,
  ): Promise<JsonResponse<UserSettingsResult>> {
    const { data, error } = await supabase
      .from("settingUser")
      .select()
      .eq("id", userId);
    return {
      json: async () => ({
        ...data?.[0],
        status: error !== null ? error.status : 200,
      }),
    };
  }
}
