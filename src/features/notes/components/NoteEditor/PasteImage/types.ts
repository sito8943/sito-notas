/**
 * Uploads one image
 * @returns its URL, or null when the upload failed (already reported)
 */
export type ImageUploader = (file: File) => Promise<string | null>;

export interface PasteImageOptions {
  /** Current uploader; undefined while uploads are not allowed */
  getUploader: () => ImageUploader | undefined;
}
