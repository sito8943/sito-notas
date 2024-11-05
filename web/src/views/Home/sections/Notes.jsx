import { useState } from "react";
import { v4 } from "uuid";
import { t } from "i18next";
import loadable from "@loadable/component";
import { useMutation } from "@tanstack/react-query";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { useNotification, Loading } from "@sito/ui";

// providers
import {
  queryClient,
  useAppApiClient,
} from "../../../providers/AppApiProvider";
import { useSearch } from "../../../providers/SearchProvider";
import { useAccount } from "../../../providers/AccountProvider";
import { useCache } from "../../../providers/CacheProvider";

// components
import { FAB } from "../../../components/FAB/FAB";
import Syncing from "../../../components/Syncing/Syncing";

// styles
import "./styles.css";

// utils
import { ReactQueryKeys } from "../../../utils/queryKeys";

// lazy
const PreviewNote = loadable(() => import("../components/PreviewNote"));

function Notes() {
  const [error, setError] = useState(false);
  const { searchFunction } = useSearch();

  const { account } = useAccount();
  const { setNotification } = useNotification();

  const appApiClient = useAppApiClient();

  const { cache, refresh, isLoading } = useCache();

  const removeNote = useMutation({
    mutationFn: (noteId) => appApiClient.Note.remove(noteId),
    onSuccess: (data) => {
      if (data === null)
        queryClient.invalidateQueries([ReactQueryKeys.Notes, account.user?.id]);
      setNotification({
        message: data ? data.message : t("_pages:home.notes.deleted"),
        type: data ? "error" : "success",
      });
    },
    onError: (error) => {
      // do something
      // eslint-disable-next-line no-console
      console.error(error);
      setError(error);
    },
  });

  const addNote = useMutation({
    mutationFn: () => {
      const now = new Date().getTime();
      const newNote = {
        id: v4(),
        title: t("_pages:home.notes.defaultTitle"),
        content: t("_pages:home.notes.defaultContent"),
        created_at: now,
        last_update: now,
      };
      appApiClient.Note.create(newNote);
      refresh();
    },
    onSuccess: (data) => {
      if (!data)
        queryClient.invalidateQueries([ReactQueryKeys.Notes, account.user?.id]);
      else
        setNotification({
          message: data?.message,
          type: "error",
        });
    },
    onError: (error) => {
      // do something
      // eslint-disable-next-line no-console
      console.error(error);
      setError(error);
    },
  });

  return (
    <section className="notes">
      <div
        className={`w-10 h-10 z-50 primary filled rounded-full fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
          addNote.isPending || removeNote.isPending ? "scale-100" : "scale-0"
        } pointer-events-none`}
      >
        <Syncing />
      </div>
      {!error ? (
        <FAB
          onClick={() => addNote.mutate()}
          position="bottom-right"
          icon={<FontAwesomeIcon icon={faAdd} />}
          color="secondary"
          className="z-10 text-2xl p-6"
        />
      ) : null}
      {isLoading
        ? [1, 2, 3, 4, 5].map((skeleton) => (
            <div
              key={skeleton}
              className="w-full h-[300px] skeleton-box !rounded-xl"
            />
          ))
        : cache
            .filter(searchFunction)
            .map((note) => (
              <PreviewNote
                key={note.id}
                {...note}
                onDelete={(id) => removeNote.mutate(id)}
              />
            ))}
      <div
        className={`w-10 h-10 fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
          isLoading || addNote.isPending || removeNote.isPending
            ? "scale-100"
            : "scale-0"
        } pointer-events-none`}
      >
        <Loading className="sync rounded-full" strokeWidth="8" />
      </div>
    </section>
  );
}

export default Notes;
