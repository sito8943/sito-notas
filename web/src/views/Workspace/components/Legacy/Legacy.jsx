import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { parseQueries } from "some-javascript-utils/browser";

import MDEditor from "@uiw/react-md-editor";
import { getNote } from "../Note/local";

function Legacy() {
  const location = useLocation();

  const [value, setValue] = useState("");

  useEffect(() => {
    const { search } = location;
    const query = parseQueries(search);
    if (query.note) setValue(getNote(query.note)?.content);
  }, [location]);

  return (
    <div className="w-full h-full pl-5">
      <MDEditor value={value} onChange={setValue} className="w-full !h-[90%]" />
    </div>
  );
}

export default Legacy;
