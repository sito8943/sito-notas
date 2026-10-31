import config from "@/shared/config";
import { HttpClient, SessionManager } from "@/shared/lib/http";

import { UserApiClient } from "@/features/auth";
import { CategoryApiClient, NoteApiClient } from "@/features/notes";

/**
 * Composition root of the API layer: one SessionManager shared by the
 * sito-auth client and the Notes API client, so both use the same tokens
 * and the same single-flight refresh.
 */
export class AppApiClient {
  private readonly user: UserApiClient;
  private readonly note: NoteApiClient;
  private readonly category: CategoryApiClient;

  constructor() {
    const session = new SessionManager();
    const authHttp = new HttpClient({ baseUrl: config.authUrl, session });
    const apiHttp = new HttpClient({ baseUrl: config.apiUrl, session });

    this.user = new UserApiClient(authHttp, session);
    this.note = new NoteApiClient(apiHttp);
    this.category = new CategoryApiClient(apiHttp);
    session.setRefresher((refreshToken) => this.user.refresh(refreshToken));
  }

  get User(): UserApiClient {
    return this.user;
  }

  get Note(): NoteApiClient {
    return this.note;
  }

  get Category(): CategoryApiClient {
    return this.category;
  }
}

// Types the client that shared/ApiClientProvider exposes to features
declare module "@/shared/providers/ApiClientProvider/types" {
  interface ApiClient {
    readonly User: UserApiClient;
    readonly Note: NoteApiClient;
    readonly Category: CategoryApiClient;
  }
}
