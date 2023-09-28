import React, { useMemo } from "react";

// components
import NewTag from "../Tag/NewTag";
import Tag from "../Tag/Tag";

function Masonry({
  elements,
  tags,
  onDelete,
  onDeleteTag,
  onAdd,
  onAddTag,
  onChangeTag,
}) {
  const cols = useMemo(() => {
    return tags.map((tag) => (
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
  }, [tags, onAdd, onDelete, onChangeTag, onDeleteTag, elements]);

  return (
    <ul className="flex w-full gap-2">
      {cols}
      <NewTag onAddTag={onAddTag} />
    </ul>
  );
}

export default Masonry;
