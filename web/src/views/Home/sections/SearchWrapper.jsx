import { useState } from "react";
import { useDebounce } from "use-lodash-debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @sito/ui
import { InputControl } from "@sito/ui";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchWrapper() {
  const [searchValue, setSearchValue] = useState("");
  const debounced = useDebounce();

  return (
    <InputControl
      leftComponent={<FontAwesomeIcon className="opacity-70" icon={faSearch} />}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}

export default SearchWrapper;
