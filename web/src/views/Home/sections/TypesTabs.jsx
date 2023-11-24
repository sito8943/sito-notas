import { useEffect, useState, useCallback } from "react";
import { sortBy } from "some-javascript-utils/array";

// @sito/ui
import { useNotification } from "@sito/ui";

// providers
import { useUser } from "../../../providers/UserProvider";

// services
import { fetchTypes } from "../../../services/types";

// components
import TabButton from "../components/TabButton";

export default function TypesTabs() {
  const { userState, setUserState } = useUser();
  const { setNotification } = useNotification();

  const [loading, setLoading] = useState(true);

  const toggleButton = useCallback(
    (id) => {
      const newTypes = [...userState.types];
      const findIndex = newTypes.findIndex((type) => type.id === id);
      if (findIndex >= 0)
        newTypes[findIndex] = {
          ...newTypes[findIndex],
          active: newTypes[findIndex].active ? false : true,
        };

      setUserState({ type: "set-types", types: newTypes });
    },
    [userState.types]
  );

  useEffect(() => {
    if (!userState.types) {
      setLoading(true);
      fetchTypes().then(({ data, error }) => {
        if (error && error !== null) {
          setNotification({ type: "error", message: error.message });
          console.error(error.message);
        }
        setUserState({ type: "set-types", types: data });
        setLoading(false);
      });
    }
  }, [userState]);

  return (
    <div className="flex gap-3">
      {loading
        ? [1, 2, 3, 4, 5].map((skeleton) => (
            <div key={skeleton} className="w-full h-[44px] skeleton-box" />
          ))
        : sortBy(userState.types ?? [], "created_at").map((type, i) => (
            <TabButton
              i={i}
              id={type.id}
              key={type.id}
              text={type.plural}
              active={type.active}
              onClick={toggleButton}
            />
          ))}
    </div>
  );
}
