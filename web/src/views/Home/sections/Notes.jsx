import { useState } from "react";
import { v4 } from "uuid";
import { t } from "i18next";
import loadable from "@loadable/component";
import { sortBy } from "some-javascript-utils/array";
import { useMutation, useQuery } from "@tanstack/react-query";

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

// components
import { FAB } from "../../../components/FAB/FAB";

// styles
import "./styles.css";

// utils
import { ReactQueryKeys } from "../../../utils/queryKeys";
import { useAccount } from "../../../providers/AccountProvider";

// lazy
const PreviewNote = loadable(() => import("../components/PreviewNote"));

function Notes() {
  const [error, setError] = useState(false);
  const { searchValue } = useSearch();

  const { account } = useAccount();
  const { setNotification } = useNotification();

  const appApiClient = useAppApiClient();

  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.Notes, account.user?.id],
    queryFn: () => appApiClient.Note.get(account.user?.id),
    enabled: !!account.user?.id,
  });

  const removeNote = useMutation({
    mutationFn: (noteId) => appApiClient.Note.remove(noteId),
    onSuccess: (data) => {
      console.log(data);
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

  const addNote = async () => {
    const now = new Date().getTime();
    const newNote = {
      id: v4(),
      title: "Nueva nota",
      content: "",
      created_at: now,
      last_update: now,
    };
  };

  return (
    <section className="notes">
      {!error ? (
        <FAB
          onClick={addNote}
          position="bottom-right"
          icon={<FontAwesomeIcon icon={faAdd} />}
          color="secondary"
          className="z-10 text-3xl p-7"
        />
      ) : null}
      {isLoading
        ? [1, 2, 3, 4, 5].map((skeleton) => (
            <div
              key={skeleton}
              className="w-full h-[300px] skeleton-box !rounded-xl"
            />
          ))
        : sortBy(data?.items ?? [], "last_update", false).map((note) => (
            <PreviewNote
              key={note.id}
              {...note}
              onDelete={(id) => removeNote.mutate(id)}
            />
          ))}
      <div
        className={`w-10 h-10 fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
          isLoading ? "scale-100" : "scale-0"
        } pointer-events-none`}
      >
        <Loading className="sync rounded-full" strokeWidth="8" />
      </div>
    </section>
  );
}

export default Notes;
