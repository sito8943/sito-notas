import { UserApiClient } from "./UserApiClient";
import { NoteApiClient } from "./NoteApiClient";
import { NoteTypeApiClient } from "./NoteTypeApiClient";

export class AppApiClient {
  constructor() {
    this.user = new UserApiClient();
    this.note = new NoteApiClient();
    this.noteType = new NoteTypeApiClient();
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

  /**
   * @returns {NoteTypeApiClient}
   */
  get NoteType() {
    return this.noteType;
  }
}
