import { useState, useEffect } from "react";
import { useDebounce } from "use-lodash-debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { InputControl } from "@sito/ui";

// providers
import { useSearch } from "../../../providers/SearchProvider";

function SearchWrapper() {
  const { setSearchValue } = useSearch();

  const [toSearch, setToSearch] = useState("");
  const debounced = useDebounce(toSearch, 500);

  useEffect(() => {
    setSearchValue(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <section role="search">
      <InputControl
        leftComponent={
          <FontAwesomeIcon className="opacity-70" icon={faSearch} />
        }
        className="!pl-4"
        value={toSearch}
        onChange={(e) => setToSearch(e.target.value)}
      />
    </section>
  );
}

export default SearchWrapper;
