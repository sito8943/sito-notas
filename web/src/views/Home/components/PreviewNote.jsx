import { useRef, useEffect } from "react";

function PreviewNote({ id, title, content }) {
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef !== null && contentRef.current)
      contentRef.current.innerHTML = marked.parse(content);
  }, [contentRef, content]);

  return (
    <div className="flex flex-col gap-3">
      <div>{title}</div>
      <div ref={contentRef} />
    </div>
  );
}

export default PreviewNote;
