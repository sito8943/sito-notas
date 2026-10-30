import { useState, useEffect, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks";
import { useQuery, useMutation } from "@tanstack/react-query";

// @sito/ui
import { useToast } from "@sito/ui";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// components
import { InputControl } from "@/shared/components/molecules/InputControl";
import { TextareaControl } from "@/shared/components/molecules/TextareaControl";
import { Syncing } from "@/shared/components/atoms/Syncing";

// utils
import { getNoteDetailKey } from "@/features/notes/constants";

// services
import type { UpdateNoteInput } from "@/features/notes/services";

// styles
import "./styles.css";

function Note() {
  const { id } = useParams();
  const noteId = Number(id);
  const validId = Number.isInteger(noteId) && noteId > 0;

  const appApiClient = useAppApiClient();
  const toast = useToast();

  const [toUpdate, setToUpdate] = useState<UpdateNoteInput | undefined>(
    undefined,
  );
  const debounced = useDebounce(toUpdate, 500);

  const { data, isLoading } = useQuery({
    queryKey: getNoteDetailKey(noteId),
    queryFn: () => appApiClient.Note.getById(noteId),
    enabled: validId,
  });

  const [title, setTitle] = useState(data?.title ?? "");
  const [content, setContent] = useState(data?.content ?? "");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const updateNote = useMutation({
    mutationFn: (note: UpdateNoteInput) => appApiClient.Note.update(note),
    onError: (error) => {
      console.error(error);
      toast({
        message: error.message,
        color: "error",
      });
    },
  });

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (!data) return;
    setToUpdate({ id: data.id, title, content: e.target.value });
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!data) return;
    setToUpdate({ id: data.id, title: e.target.value, content });
  };

  useEffect(() => {
    if (toUpdate) updateNote.mutate(toUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <main>
      <div
        className={`note-syncing ${
          isLoading || updateNote.isPending ? "visible" : ""
        }`}
      >
        <Syncing />
      </div>
      <div className="note-workspace workspace appear">
        {isLoading ? (
          <div className="note-title-skeleton skeleton-box" />
        ) : (
          <InputControl
            value={title}
            onChange={handleTitle}
            className="note-title-input"
          />
        )}
        {isLoading ? (
          <div className="note-content-skeleton skeleton-box" />
        ) : (
          <TextareaControl
            value={content}
            onChange={handleContent}
            containerClassName="h-full"
            className="note-content-input"
          />
        )}
      </div>
    </main>
  );
}

export default Note;
