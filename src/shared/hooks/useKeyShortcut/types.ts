/**
 * Runs the shortcut bound to `key` (lowercase `KeyboardEvent.key`)
 * @returns true when the key was a shortcut (its default is then prevented)
 */
export type KeyShortcutHandler = (key: string) => boolean;
