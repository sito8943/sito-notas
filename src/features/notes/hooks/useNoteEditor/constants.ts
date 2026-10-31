/** Quiet time after the last keystroke before the note is saved */
export const AUTOSAVE_DELAY_MS = 600;

export const NoteSaveStatus = {
  Idle: "idle",
  Saving: "saving",
  Saved: "saved",
  Error: "error",
} as const;
