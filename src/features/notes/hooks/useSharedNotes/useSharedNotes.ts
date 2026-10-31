import { useQuery } from "@tanstack/react-query";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useAccount } from "@/features/auth";

// utils
import { getSharedNotesKey } from "@/features/notes/constants";

import type { UseSharedNotesResult } from "./types";

/**
 * Notes other users shared with the signed-in user
 * @returns notes (last edited first) and loading flag
 */
function useSharedNotes(): UseSharedNotesResult {
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const userId = account.user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: getSharedNotesKey(userId),
    queryFn: () => appApiClient.Note.listShared(),
    enabled: userId !== undefined,
  });

  return { notes: data ?? [], isLoading, isError };
}

export default useSharedNotes;
