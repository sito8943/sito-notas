import config from "@/shared/config";
import { HttpClient, SessionManager } from "@/shared/lib/http";
import { SocketClient, toSocketUrl } from "@/shared/lib/socket";

import { UserApiClient } from "@/features/auth";
import { CategoryApiClient, NoteApiClient } from "@/features/notes";

/**
 * Composition root of the API layer: one SessionManager shared by the
 * sito-auth client, the Notes API client and the Notes socket, so all use
 * the same tokens and the same single-flight refresh.
 */
export class AppApiClient {
  private readonly user: UserApiClient;
  private readonly note: NoteApiClient;
  private readonly category: CategoryApiClient;
  private readonly socket: SocketClient;

  constructor() {
    const session = new SessionManager();
    const authHttp = new HttpClient({ baseUrl: config.authUrl, session });
    const apiHttp = new HttpClient({ baseUrl: config.apiUrl, session });

    this.user = new UserApiClient(authHttp, session);
    this.note = new NoteApiClient(apiHttp);
    this.category = new CategoryApiClient(apiHttp);
    this.socket = new SocketClient({
      url: toSocketUrl(config.apiUrl, window.location.origin),
      getToken: () => session.getAccessToken(),
    });
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

  get Socket(): SocketClient {
    return this.socket;
  }
}

// Types the client that shared/ApiClientProvider exposes to features
declare module "@/shared/providers/ApiClientProvider/types" {
  interface ApiClient {
    readonly User: UserApiClient;
    readonly Note: NoteApiClient;
    readonly Category: CategoryApiClient;
    readonly Socket: SocketClient;
  }
}
