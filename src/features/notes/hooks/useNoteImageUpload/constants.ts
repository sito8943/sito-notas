/** Image types the Notes API stores */
export const NOTE_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

/** Largest image the Notes API accepts (5 MB) */
export const NOTE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

/** Translation keys of the image upload errors */
export const NoteImageError = {
  InvalidType: "_pages:note.image.invalidType",
  TooLarge: "_pages:note.image.tooLarge",
} as const;
