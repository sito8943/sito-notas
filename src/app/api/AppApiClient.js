import { UserApiClient } from "../../features/auth";
import { NoteApiClient } from "../../features/notes";

export class AppApiClient {
  constructor() {
    this.user = new UserApiClient();
    this.note = new NoteApiClient();
  }

  /**
   * @returns {UserApiClient}
   */
  get User() {
    return this.user;
  }

  /**
   * @returns {NoteApiClient}
   */
  get Note() {
    return this.note;
  }
}
