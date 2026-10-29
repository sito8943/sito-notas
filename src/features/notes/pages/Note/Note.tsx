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
        className={`w-10 h-10 fixed bottom-1 bg-(--sito-ui-color-primary-default) text-(--sito-ui-color-primary-text) rounded-full left-1 transition-all duration-300 ease-in-out ${
          isLoading || updateNote.isPending ? "scale-100" : "scale-0"
        } pointer-events-none`}
      >
        <Syncing />
      </div>
      <div className="p-10 sm:p-3 grid workspace gap-5 flex-1 h-full appear">
        {isLoading ? (
          <div className="w-full h-[45px] skeleton-box" />
        ) : (
          <InputControl
            value={title}
            onChange={handleTitle}
            className="text-2xl"
          />
        )}
        {isLoading ? (
          <div className="w-full min-h-[300px] h-full skeleton-box rounded-xl!" />
        ) : (
          <TextareaControl
            value={content}
            onChange={handleContent}
            containerClassName="h-full"
            className="min-h-[300px] h-full"
          />
        )}
      </div>
    </main>
  );
}

export default Note;
