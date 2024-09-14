import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "use-lodash-debounce";
import { useQuery, useMutation } from "@tanstack/react-query";

// @sito/ui
import { InputControl, TextareaControl, useNotification } from "@sito/ui";

// providers
import { useAppApiClient } from "../../providers/AppApiProvider";

// components
import Syncing from "../../components/Syncing/Syncing";

// utils
import { ReactQueryKeys } from "../../utils/queryKeys";

// styles
import "./styles.css";

function Note() {
  const { id } = useParams();

  const appApiClient = useAppApiClient();
  const { setNotification } = useNotification();

  const [toUpdate, setToUpdate] = useState(undefined);
  const debounced = useDebounce(toUpdate, 500);

  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.Notes, id],
    queryFn: () => appApiClient.Note.getById(id),
    enabled: !!id,
  });

  const [title, setTitle] = useState(data?.item?.title ?? "");
  const [content, setContent] = useState(data?.item?.content ?? "");

  const updateNote = useMutation({
    mutationFn: (note) => appApiClient.Note.update(note),
    onSuccess: ({ error }) => {
      if (error) {
        setNotification({
          message: error.message,
          type: "error",
        });
        return;
      }
    },
    onError: (error) => {
      // do something
      // eslint-disable-next-line no-console
      console.error(error);
      setNotification({
        message: error.message,
        type: error,
      });
    },
  });

  const handleContent = (e) => {
    setContent(e.target.value);
    setToUpdate({
      ...data.item,
      content: e.target.value,
      last_update: new Date().getMilliseconds(),
    });
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
    setToUpdate({
      ...data.item,
      title: e.target.value,
      last_update: new Date().getMilliseconds(),
    });
  };

  useEffect(() => {
    if (toUpdate) updateNote.mutate(toUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <main className="flex flex-col viewport">
      <div
        className={`w-10 h-10 fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
          isLoading || updateNote.isPending ? "scale-100" : "scale-0"
        } pointer-events-none`}
      >
        <Syncing />
      </div>
      <div className="p-10 sm:p-3 mt-20 !pb-10 grid workspace gap-5 flex-1 appear">
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
          <div className="w-full min-h-[300px] h-full skeleton-box !rounded-xl" />
        ) : (
          <TextareaControl
            label={""}
            value={content}
            onChange={handleContent}
            className="min-h-[300px] h-full"
          />
        )}
      </div>
    </main>
  );
}

export default Note;
