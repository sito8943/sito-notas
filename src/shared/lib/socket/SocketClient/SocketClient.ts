import { Client, type StompSubscription } from "@stomp/stompjs";

import { SOCKET_RECONNECT_DELAY_MS } from "./constants";
import type { SocketClientOptions, SocketMessageHandler } from "./types";
import { parseSocketBody } from "./utils";

/**
 * STOMP connection to the API server. Sends a fresh Bearer token on every
 * (re)connect and keeps subscriptions alive across reconnects.
 */
export class SocketClient {
  private readonly client: Client;
  private readonly handlers = new Map<string, Set<SocketMessageHandler>>();
  private readonly subscriptions = new Map<string, StompSubscription>();
  private starts = 0;

  /** @param options - endpoint URL and token source */
  constructor(options: SocketClientOptions) {
    this.client = new Client({
      brokerURL: options.url,
      reconnectDelay: SOCKET_RECONNECT_DELAY_MS,
      beforeConnect: async (client) => {
        const token = await options.getToken();
        if (!token) {
          // Signed out meanwhile: stop retrying until start() is called again
          await client.deactivate();
          return;
        }
        client.connectHeaders = { Authorization: `Bearer ${token}` };
      },
      onConnect: () => {
        this.subscriptions.clear();
        for (const destination of this.handlers.keys())
          this.subscribeFrame(destination);
      },
      onStompError: (frame) =>
        console.error("Socket error:", frame.headers.message),
    });
  }

  /** Connects (reference counted: every start() needs a stop()) */
  start(): void {
    this.starts += 1;
    if (this.starts === 1) this.client.activate();
  }

  /** Disconnects when the last user of the socket stops it */
  stop(): void {
    this.starts = Math.max(0, this.starts - 1);
    if (this.starts === 0) void this.client.deactivate();
  }

  /**
   * Listens to a destination (e.g. "/user/queue/notes")
   * @param destination - STOMP destination
   * @param handler - receives each parsed message body
   * @returns function that stops listening
   */
  subscribe(destination: string, handler: SocketMessageHandler): () => void {
    const handlers = this.handlers.get(destination) ?? new Set();
    handlers.add(handler);
    this.handlers.set(destination, handlers);
    if (this.client.connected && !this.subscriptions.has(destination))
      this.subscribeFrame(destination);

    return () => {
      handlers.delete(handler);
      if (handlers.size > 0) return;
      this.handlers.delete(destination);
      this.subscriptions.get(destination)?.unsubscribe();
      this.subscriptions.delete(destination);
    };
  }

  private subscribeFrame(destination: string): void {
    const subscription = this.client.subscribe(destination, (frame) => {
      const body = parseSocketBody(frame.body);
      this.handlers.get(destination)?.forEach((handler) => handler(body));
    });
    this.subscriptions.set(destination, subscription);
  }
}
