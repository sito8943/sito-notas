import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

// routes
import { AppRoute } from "@/shared/routes";

// components
import { Tabs } from "@/shared/components/molecules/Tabs";

// providers
import { useSearch } from "@/features/notes/providers/SearchProvider";

// providers
import { useCache } from "@/features/notes/providers/CacheProvider";

// hooks
import { useTags } from "@/features/notes/hooks/useTags";

// utils
import { countTagUses, sortTagsByUses } from "@/features/notes/utils";

import { ALL_CATEGORIES_TAB, FAVORITES_TAB } from "./constants";
import "./styles.css";

/** Filters the notes: "All", "Favorites" and every tag; links to manage tags */
function CategoryTabs() {
  const { t } = useTranslation();
  const { tags, isLoading } = useTags();
  const { cache, isLoading: notesLoading } = useCache();

  const notes = useMemo(() => cache ?? [], [cache]);
  const uses = useMemo(() => countTagUses(notes), [notes]);
  const favorites = useMemo(
    () => notes.filter((note) => note.favorite).length,
    [notes],
  );
  const { categoryId, setCategoryId, favoritesOnly, setFavoritesOnly } =
    useSearch();

  const tabs = useMemo(
    () => [
      {
        value: ALL_CATEGORIES_TAB,
        label: t("_pages:home.tabs.all"),
        count: notes.length,
      },
      {
        value: FAVORITES_TAB,
        label: t("_pages:home.tabs.favorites"),
        count: favorites,
        disabled: favorites === 0,
      },
      // Most used tags first; empty (disabled) ones end up last
      ...sortTagsByUses(tags, uses).map(({ id, name }) => {
        const count = uses.get(id) ?? 0;
        return { value: id, label: name, count, disabled: count === 0 };
      }),
    ],
    [tags, uses, notes.length, favorites, t],
  );

  const selected = favoritesOnly
    ? FAVORITES_TAB
    : (categoryId ?? ALL_CATEGORIES_TAB);

  // The selected tab can empty out (last favorite unmarked, tag removed
  // from its last note) or vanish (tag deleted): back to "All"
  useEffect(() => {
    if (isLoading || notesLoading || !cache) return;
    if (selected === ALL_CATEGORIES_TAB) return;
    const tab = tabs.find((current) => current.value === selected);
    if (tab && !tab.disabled) return;
    setFavoritesOnly(false);
    setCategoryId(null);
  }, [
    selected,
    tabs,
    isLoading,
    notesLoading,
    cache,
    setFavoritesOnly,
    setCategoryId,
  ]);

  return (
    <div className="category-tabs">
      <Tabs
        label={t("_pages:routes.tags")}
        tabs={tabs}
        value={selected}
        onChange={(value) => {
          setFavoritesOnly(value === FAVORITES_TAB);
          setCategoryId(value > ALL_CATEGORIES_TAB ? value : null);
        }}
        className="category-tabs-list"
      />
      <Link
        to={AppRoute.Tags}
        aria-label={t("_pages:tags.manage")}
        title={t("_pages:tags.manage")}
        className="category-tabs-edit sito-ui-pressable"
      >
        <FontAwesomeIcon icon={faPen} />
        <span className="category-tabs-edit-label">
          {t("_pages:tags.manage")}
        </span>
      </Link>
    </div>
  );
}

export default CategoryTabs;
