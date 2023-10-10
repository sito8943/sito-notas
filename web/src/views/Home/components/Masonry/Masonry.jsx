import React, { useMemo } from "react";
import stringSimilarity from "string-similarity";
import loadable from "@loadable/component";

// components
import NewTag from "../Tag/NewTag";

// contexts
import { useSearch } from "../../../../contexts/SearchProvider";

// lazy load
const Tag = loadable(() => import("../Tag/Tag"));

function Masonry({
  elements,
  tags,
  onDelete,
  onDeleteTag,
  onAdd,
  onUploadTag,
  onAddTag,
  onBrushTag,
  onChangeTag,
}) {
  const { searchState } = useSearch();

  const cols = useMemo(() => {
    const lowerCased = searchState.toLowerCase();

    return tags
      .filter((tag) => {
        const tagLowered = tag.id.toLowerCase();
        return searchState.length
          ? stringSimilarity.compareTwoStrings(tagLowered, lowerCased) > 0.25 ||
              tagLowered.indexOf(lowerCased) >= 0
          : true;
      })
      .map((tag) => (
        <Tag
          tag={tag}
          key={tag.id}
          onAdd={onAdd}
          onDelete={onDelete}
          onBrushTag={onBrushTag}
          onChangeTag={onChangeTag}
          onDeleteTag={onDeleteTag}
          elements={elements.filter((element) => element.tag === tag.id)}
        />
      ));
  }, [
    searchState,
    elements,
    tags,
    onDelete,
    onDeleteTag,
    onAdd,
    onUploadTag,
    onAddTag,
    onBrushTag,
    onChangeTag,
  ]);

  return (
    <ul className="flex w-full gap-2">
      {cols}
      <NewTag onAddTag={onAddTag} onUploadTag={onUploadTag} />
    </ul>
  );
}

export default Masonry;
