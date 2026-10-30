import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import { Tabs } from "@/shared/components/molecules/Tabs";

// providers
import { useCache } from "@/features/notes/providers/CacheProvider";
import { useSearch } from "@/features/notes/providers/SearchProvider";

import { ALL_CATEGORIES_TAB } from "./constants";
import { getUsedCategories } from "./utils";

/** Filters the notes by tag: "All" plus every tag the notes use */
function CategoryTabs() {
  const { t } = useTranslation();
  const { cache } = useCache();
  const { categoryId, setCategoryId } = useSearch();

  const tabs = useMemo(
    () => [
      { value: ALL_CATEGORIES_TAB, label: t("_pages:home.tabs.all") },
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
      value={categoryId ?? ALL_CATEGORIES_TAB}
      onChange={(value) =>
        setCategoryId(value === ALL_CATEGORIES_TAB ? null : value)
      }
    />
  );
}

export default CategoryTabs;
