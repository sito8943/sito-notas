import { useCallback, useEffect, useRef, type ClipboardEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { getRequestErrorKey } from "@/shared/lib/errors";

// components
import { getImageFiles } from "@/features/notes/components/NoteEditor";

import type {
  UseNoteImageUploadOptions,
  UseNoteImageUploadResult,
} from "./types";
import { getNoteImageError, insertText, toMarkdownImage } from "./utils";

/**
 * Uploads images pasted into a note, for the rich editor and the Markdown
 * source. Invalid files and failures are reported with a toast.
 * @param options - note id and its Markdown source
 * @returns the uploader, the source paste handler and the pending state
 */
function useNoteImageUpload(
  options: UseNoteImageUploadOptions,
): UseNoteImageUploadResult {
  const { noteId, content, setContent } = options;

  const { t } = useTranslation();
  const toast = useToast();
  const appApiClient = useAppApiClient();

  // Uploads take a while: insert into the latest text
  const contentRef = useRef(content);
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (file: File) => {
      if (noteId === null) throw new Error("No note to attach the image to");
      return appApiClient.Note.uploadImage({ noteId, file });
    },
  });

  const upload = useCallback(
    async (file: File): Promise<string | null> => {
      const error = getNoteImageError(file);
      if (error) {
        toast({ message: t(error), color: "error" });
        return null;
      }
      try {
        return await mutateAsync(file);
      } catch (uploadError) {
        console.error(uploadError);
        toast({ message: t(getRequestErrorKey(uploadError)), color: "error" });
        return null;
      }
    },
    [mutateAsync, toast, t],
  );

  const onSourcePaste = useCallback(
    (event: ClipboardEvent<HTMLTextAreaElement>) => {
      const files = getImageFiles(event.clipboardData);
      if (!files.length) return;
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.currentTarget;
      void (async () => {
        const urls: string[] = [];
        for (const file of files) {
          const url = await upload(file);
          if (url) urls.push(url);
        }
        if (!urls.length) return;
        const markdown = urls.map(toMarkdownImage).join("\n");
        setContent(
          insertText(
            contentRef.current,
            markdown,
            selectionStart,
            selectionEnd,
          ),
        );
      })();
    },
    [upload, setContent],
  );

  return { upload, onSourcePaste, isUploading: isPending };
}

export default useNoteImageUpload;
