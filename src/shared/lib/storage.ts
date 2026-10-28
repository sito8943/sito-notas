/**
 * Fetch data from local storage
 * @param key - key to fetch
 * @returns parsed JSON value, or undefined when missing
 */
export const fromLocalObject = <T>(key: string): T | undefined => {
  const result = localStorage.getItem(key);
  return result ? (JSON.parse(result) as T) : undefined;
};

/**
 * Fetch raw string data from local storage
 * @param key - key to fetch
 * @returns stored string, or undefined when missing
 */
export const fromLocal = (key: string): string | undefined =>
  localStorage.getItem(key) ?? undefined;

/**
 * Save data to local storage
 * @param key - key to save
 * @param value - value to save
 */
export const toLocal = (key: string, value: unknown): void =>
  localStorage.setItem(
    key,
    typeof value === "string" ? value : JSON.stringify(value),
  );

/**
 * Remove data from local storage
 * @param key - key to remove
 */
export const removeFromLocal = (key: string): void =>
  localStorage.removeItem(key);
