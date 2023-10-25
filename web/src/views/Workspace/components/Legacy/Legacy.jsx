import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useScreenWidth } from "use-screen-width";

import { parseQueries } from "some-javascript-utils/browser";

import MDEditor from "@uiw/react-md-editor";

// managers
import { getNote } from "../Note/local";

function Legacy() {
  const location = useLocation();

  const { screenWidth } = useScreenWidth();

  const [value, setValue] = useState("");

  useEffect(() => {
    const { search } = location;
    const query = parseQueries(search);
    if (query.note) setValue(getNote(query.note)?.content);
  }, [location]);

  const mobileScreen = useMemo(() => screenWidth < 600, [screenWidth]);

  return (
    <div className="w-full h-full pl-5">
      <MDEditor
        value={value}
        onChange={setValue}
        className="w-full !h-[90%]"
        preview={mobileScreen ? "edit" : "live"}
      />
    </div>
  );
}

export default Legacy;
