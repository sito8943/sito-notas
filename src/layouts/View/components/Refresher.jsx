import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// providers
import { queryClient } from "../../../providers/AppApiProvider";

// utils
import { ReactQueryKeys } from "../../../utils/queryKeys";

const getOnLineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;

function Refresher() {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (status) {
      const split = location.pathname.split("/");
      switch (split.length) {
        case 3: {
          // details
          const [, , id] = split;
          queryClient.invalidateQueries([ReactQueryKeys.Notes, id]);
          break;
        }
        case 2: {
          if (!split[0].length && !split[1].length) {
            queryClient.invalidateQueries([ReactQueryKeys.Notes]);
          }
        }
      }
    }
  }, [location, status]);

  return <></>;
}

export default Refresher;
