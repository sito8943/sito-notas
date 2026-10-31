import { useMemo } from "react";

import type { MarkdownPreviewProps } from "./types";
import { toPreviewHtml } from "./utils";
import "./styles.css";

/** Read-only, formatted start of a note (cards of the list and the trash) */
function MarkdownPreview(props: MarkdownPreviewProps) {
  const { content, className = "" } = props;

  const html = useMemo(() => toPreviewHtml(content), [content]);
  if (!html.trim()) return null;

  return (
    <div
      className={`markdown-preview ${className}`}
      // Sanitized by DOMPurify in toPreviewHtml
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default MarkdownPreview;
