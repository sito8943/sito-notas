/** Storage subset the SessionManager uses, plus the raw map */
export interface MemoryStorage {
  data: Map<string, string>;
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

/** In-memory Storage for SessionManager tests */
export const createMemoryStorage = (): MemoryStorage => {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value);
    },
    removeItem: (key) => {
      data.delete(key);
    },
  };
};

/**
 * @param exp - expiry in epoch seconds
 * @returns unsigned JWT with the given exp claim
 */
export const makeJwt = (exp: number, sub = "1"): string => {
  const encode = (value: object) =>
    btoa(JSON.stringify(value))
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  return `${encode({ alg: "none" })}.${encode({ sub, exp })}.sig`;
};

/**
 * @param status - HTTP status
 * @param body - JSON body (or raw string)
 * @returns a fetch Response
 */
export const jsonResponse = (status: number, body?: unknown): Response =>
  new Response(
    body === undefined
      ? null
      : typeof body === "string"
        ? body
        : JSON.stringify(body),
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  );
