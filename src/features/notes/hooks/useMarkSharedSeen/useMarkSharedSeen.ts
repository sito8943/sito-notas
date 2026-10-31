import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useAccount } from "@/features/auth";

// utils
import { queryClient } from "@/shared/lib/queryClient";
import { getUnseenSharedKey } from "@/features/notes/constants";

// hooks
import { useUnseenShared } from "@/features/notes/hooks/useUnseenShared";

/**
 * While "Shared with me" is open, new shared notes count as seen: the badge
 * clears at once (and again if one arrives meanwhile)
 */
function useMarkSharedSeen() {
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const unseen = useUnseenShared();
  const unseenKey = getUnseenSharedKey(account.user?.id);

  const { mutate, isPending } = useMutation({
    mutationFn: () => appApiClient.Note.markSharedSeen(),
    onMutate: () => queryClient.setQueryData(unseenKey, 0),
    onError: (mutationError) => {
      console.error(mutationError);
      void queryClient.invalidateQueries({ queryKey: unseenKey });
    },
  });

  useEffect(() => {
    if (unseen > 0 && !isPending) mutate();
  }, [unseen, isPending, mutate]);
}

export default useMarkSharedSeen;
