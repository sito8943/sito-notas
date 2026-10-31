import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// components
import { BottomNavigation } from "@/shared/components/molecules/BottomNavigation";

// routes
import { getNoteRoute } from "@/shared/routes";

// features
import { useAddNote, useUnseenShared } from "@/features/notes";

import { BOTTOM_NAVIGATION_ITEMS } from "./constants";
import { toBottomNavigationItems } from "./utils";

/** Wires the BottomNavigation molecule to routes, i18n and note creation */
function AppBottomNavigation() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // The new note opens right away, wherever it was created from
  const addNote = useAddNote({ onCreated: (id) => navigate(getNoteRoute(id)) });

  const unseenShared = useUnseenShared();

  const items = useMemo(
    () => toBottomNavigationItems(BOTTOM_NAVIGATION_ITEMS, t, unseenShared),
    [t, unseenShared],
  );

  return (
    <BottomNavigation
      label={t("_accessibility:ariaLabels.mainNavigation")}
      items={items}
      action={{
        label: t("_accessibility:buttons.add"),
        icon: <FontAwesomeIcon icon={faPlus} />,
        onClick: () => addNote.mutate(),
        disabled: addNote.isPending,
      }}
    />
  );
}

export default AppBottomNavigation;
