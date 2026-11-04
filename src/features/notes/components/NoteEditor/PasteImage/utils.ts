import { IMAGE_MIME_PREFIX } from "./constants";

/**
 * Image files of a paste or a drop. Clipboards that also carry text (cells
 * copied from a spreadsheet come with a picture of them) paste the text.
 * @param data - clipboard or drag data
 * @returns the image files, or [] when there are none or text wins
 */
export const getImageFiles = (data: DataTransfer | null): File[] => {
  if (!data || data.getData("text/plain")) return [];
  return Array.from(data.files).filter((file) =>
    file.type.startsWith(IMAGE_MIME_PREFIX),
  );
};
