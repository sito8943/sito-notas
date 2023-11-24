import { useDebounce } from "use-lodash-debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { InputControl } from "@sito/ui";

// providers
import { useSearch } from "../../../providers/SearchProvider";

function SearchWrapper() {
  const { searchValue, setSearchValue } = useSearch();

  return (
    <InputControl
      leftComponent={<FontAwesomeIcon className="opacity-70" icon={faSearch} />}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}

export default SearchWrapper;
