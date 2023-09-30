import React, { useMemo } from "react";
import stringSimilarity from "string-similarity";

// components
import NewTag from "../Tag/NewTag";
import Tag from "../Tag/Tag";

// contexts
import { useSearch } from "../../../../contexts/SearchProvider";

function Masonry({
  elements,
  tags,
  onDelete,
  onDeleteTag,
  onAdd,
  onAddTag,
  onChangeTag,
}) {
  const { searchState } = useSearch();

  const cols = useMemo(() => {
    const lowerCased = searchState.toLowerCase();
    return tags
      .filter((tag) => {
        const tagLowered = tag.toLowerCase();
        return searchState.length
          ? stringSimilarity.compareTwoStrings(tagLowered, lowerCased) > 0.25 ||
              tagLowered.indexOf(lowerCased) >= 0
          : true;
      })
      .map((tag) => (
        <Tag
          tag={tag}
          key={tag}
          onAdd={onAdd}
          onDelete={onDelete}
          onChangeTag={onChangeTag}
          onDeleteTag={onDeleteTag}
          elements={elements.filter((element) => element.tag === tag)}
        />
      ));
  }, [searchState, tags, onAdd, onDelete, onChangeTag, onDeleteTag, elements]);

  return (
    <ul className="flex w-full gap-2">
      {cols}
      <NewTag onAddTag={onAddTag} />
    </ul>
  );
}

export default Masonry;
