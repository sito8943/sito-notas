import { MAX_TAB_POSITION } from "@/features/tabs/providers/TabsProvider";

import { DIGIT_CODE_PREFIX } from "./constants";

/**
 * @param code - `KeyboardEvent.code`
 * @returns 1-9 for the number row keys, otherwise null
 */
export const getDigitPosition = (code: string): number | null => {
  if (!code.startsWith(DIGIT_CODE_PREFIX)) return null;
  const position = Number(code.slice(DIGIT_CODE_PREFIX.length));
  return position >= 1 && position <= MAX_TAB_POSITION ? position : null;
};

/**
 * @param position - 1-based tab position
 * @returns its `aria-keyshortcuts` (Alt+1…Alt+8), if it has one; Alt+9 is
 * always the last tab, so it is not announced on a position
 */
export const getTabPositionShortcut = (position: number): string | undefined =>
  position < MAX_TAB_POSITION ? `Alt+${position}` : undefined;
