import { UserApiClient } from "@/features/auth";
import { NoteApiClient } from "@/features/notes";

export class AppApiClient {
  private readonly user = new UserApiClient();
  private readonly note = new NoteApiClient();

  get User(): UserApiClient {
    return this.user;
  }

  get Note(): NoteApiClient {
    return this.note;
  }
}

// Types the client that shared/ApiClientProvider exposes to features
declare module "@/shared/providers/ApiClientProvider/types" {
  interface ApiClient {
    readonly User: UserApiClient;
    readonly Note: NoteApiClient;
  }
}
