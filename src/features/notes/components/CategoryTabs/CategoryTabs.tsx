import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import { Tabs } from "@/shared/components/molecules/Tabs";

// providers
import { useCache } from "@/features/notes/providers/CacheProvider";
import { useSearch } from "@/features/notes/providers/SearchProvider";

import { ALL_CATEGORIES_TAB, FAVORITES_TAB } from "./constants";
import { getUsedCategories } from "./utils";

/** Filters the notes: "All", "Favorites" and every tag the notes use */
function CategoryTabs() {
  const { t } = useTranslation();
  const { cache } = useCache();
  const { categoryId, setCategoryId, favoritesOnly, setFavoritesOnly } =
    useSearch();

  const tabs = useMemo(
    () => [
      { value: ALL_CATEGORIES_TAB, label: t("_pages:home.tabs.all") },
      { value: FAVORITES_TAB, label: t("_pages:home.tabs.favorites") },
      ...getUsedCategories(cache ?? []).map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    ],
    [cache, t],
  );

  // The selected tag can vanish (its last note deleted): back to "All"
  useEffect(() => {
    if (categoryId !== null && !tabs.some((tab) => tab.value === categoryId))
      setCategoryId(null);
  }, [categoryId, setCategoryId, tabs]);

  return (
    <Tabs
      label={t("_pages:routes.tags")}
      tabs={tabs}
      value={favoritesOnly ? FAVORITES_TAB : (categoryId ?? ALL_CATEGORIES_TAB)}
      onChange={(value) => {
        setFavoritesOnly(value === FAVORITES_TAB);
        setCategoryId(value > ALL_CATEGORIES_TAB ? value : null);
      }}
    />
  );
}

export default CategoryTabs;
