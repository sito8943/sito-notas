import React, { useState } from "react";

import MDEditor from "@uiw/react-md-editor";

function Legacy() {
  const [value, setValue] = useState("");

  return (
    <div>
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
}

export default Legacy;
