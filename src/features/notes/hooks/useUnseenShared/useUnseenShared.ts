import { useQuery } from "@tanstack/react-query";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useAccount } from "@/features/auth";

// utils
import { getUnseenSharedKey } from "@/features/notes/constants";

/**
 * How many notes shared with the user are new for them ("Shared with me"
 * badge); kept live by the note socket events
 * @returns the count (0 while loading or on error)
 */
function useUnseenShared(): number {
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const userId = account.user?.id;

  const { data } = useQuery({
    queryKey: getUnseenSharedKey(userId),
    queryFn: () => appApiClient.Note.countUnseenShared(),
    enabled: userId !== undefined,
  });

  return data ?? 0;
}

export default useUnseenShared;
