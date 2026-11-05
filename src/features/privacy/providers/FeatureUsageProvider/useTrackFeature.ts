// @sito/feature-usage
import { useTrack } from "@sito/feature-usage/react";

import type { NotesFeature } from "@/features/privacy/types";

/** `const track = useTrackFeature(); track("page.home")`: typed to the notes catalogue */
const useTrackFeature = () => useTrack<NotesFeature>();

export default useTrackFeature;
