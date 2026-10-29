/**
 * Error thrown for any failed HTTP request
 */
export class HttpError extends Error {
  readonly status: number;
  readonly body: unknown;

  /**
   * @param status - HTTP status code (0 when the request never reached the server)
   * @param message - readable message, usually taken from the response body
   * @param body - parsed response body, if any
   */
  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}
