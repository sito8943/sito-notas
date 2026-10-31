import { useQuery } from "@tanstack/react-query";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";
import { useAccount } from "@/features/auth";

// constants
import { getTagsKey } from "@/features/notes/constants";

// models
import type { NoteCategory } from "@/features/notes/models";

import { NO_TAGS } from "./constants";

/**
 * Every tag of the user, sorted by name
 * @returns tags and loading flag
 */
function useTags(): { tags: NoteCategory[]; isLoading: boolean } {
  const appApiClient = useAppApiClient();
  const { account } = useAccount();
  const userId = account.user?.id;

  const { data, isLoading } = useQuery({
    queryKey: getTagsKey(userId),
    queryFn: () => appApiClient.Category.list(),
    enabled: userId !== undefined,
  });

  return { tags: data ?? NO_TAGS, isLoading };
}

export default useTags;
