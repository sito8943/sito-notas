import { faEarthAmericas, faLock } from "@fortawesome/free-solid-svg-icons";

/** Who can open a note besides the people it is shared with */
export const GeneralAccess = {
  Restricted: "restricted",
  Public: "public",
} as const;

/** Options in display order, with their i18n keys and icon */
export const GENERAL_ACCESS_OPTIONS = [
  {
    value: GeneralAccess.Restricted,
    labelKey: "_pages:share.link.restricted",
    hintKey: "_pages:share.link.restrictedHint",
    icon: faLock,
  },
  {
    value: GeneralAccess.Public,
    labelKey: "_pages:share.link.public",
    hintKey: "_pages:share.link.publicHint",
    icon: faEarthAmericas,
  },
] as const;
