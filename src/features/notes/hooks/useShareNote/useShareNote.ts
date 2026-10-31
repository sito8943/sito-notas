import { useCallback } from "react";
import { useTranslation } from "react-i18next";

// @sito/ui
import { useToast } from "@sito/ui";

/**
 * Shares a note with the system share sheet, or copies it when the browser
 * has none.
 * @returns share(title, content)
 */
function useShareNote() {
  const { t } = useTranslation();
  const toast = useToast();

  return useCallback(
    async (title: string, content: string) => {
      try {
        if (navigator.share) {
          await navigator.share({ title, text: content });
          return;
        }
        await navigator.clipboard.writeText(`${title}\n\n${content}`);
        toast({ message: t("_pages:home.notes.copied"), color: "success" });
      } catch (error) {
        // Closing the share sheet is not an error
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error(error);
      }
    },
    [t, toast],
  );
}

export default useShareNote;
