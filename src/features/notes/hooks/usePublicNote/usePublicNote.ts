import { useQuery } from "@tanstack/react-query";

// utils
import { isHttpError } from "@/shared/lib/http";
import { getPublicNoteKey } from "@/features/notes/constants";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

import { NOT_FOUND_STATUS } from "./constants";
import type { UsePublicNoteResult } from "./types";

/**
 * Note read through its public link (no login needed)
 * @param token - link token from the route
 * @returns the note, loading flag and whether the link is gone
 */
function usePublicNote(token: string | undefined): UsePublicNoteResult {
  const appApiClient = useAppApiClient();

  const { data, isLoading, error } = useQuery({
    queryKey: getPublicNoteKey(token ?? ""),
    queryFn: () => appApiClient.Note.getPublic(token ?? ""),
    enabled: Boolean(token),
    // A missing link stays missing
    retry: (failures, queryError) =>
      !isHttpError(queryError, NOT_FOUND_STATUS) && failures < 2,
  });

  return {
    note: data,
    isLoading,
    notFound: !token || isHttpError(error, NOT_FOUND_STATUS),
    isError: error !== null,
  };
}

export default usePublicNote;
