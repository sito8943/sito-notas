export interface SocketClientOptions {
  /** ws:// or wss:// URL of the STOMP endpoint */
  url: string;
  /** Fresh access token for each (re)connect; null skips connecting */
  getToken: () => Promise<string | null>;
}

/** Handler of one message; receives the parsed JSON body */
export type SocketMessageHandler = (body: unknown) => void;
